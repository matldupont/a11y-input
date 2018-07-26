import * as React from 'react';
import PropTypes from 'prop-types';
import './Input.css';
import warning from './warning.svg';

export default class Input extends React.Component {
  state = {
    error: false,
    message: '',
  };

  timer = {};

  componentDidMount() {
    if (this.props.value) {
      this.triggerValidation(this.props.value);
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.triggerValidation(nextProps.value);
    }
  }

  setSuccessState(bool, message = '') {
    this.setState({
      error: !bool,
      message,
    });
  }

  triggerValidation = (val) => {
    if (val === undefined)  val = this.props.value;

    const check = this.isValid(val);
    let pass = true;
    let message = '';
    if (check) ({ pass, message } = check);
    if (typeof check !== 'undefined') {
      this.setSuccessState(pass, message);
    }
  }

  throttle(cb) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      cb();
    }, 300);
  }

  handleChange = (event) => {
    const val = event.target.value;
    this.props.onChange(event);

    this.throttle(() => {
      this.triggerValidation(val);
    });
  }

  isValid(value) {
    return this.props.validation.call(this, value);
  }

  render() {
    const { error, message } = this.state;
    const {
      label,
      type,
      id,
      disabled,
      required,
      placeholder,
      value,
    } = this.props;

    const requiredAsterisk = required && <strong aria-hidden="true"> *</strong>;

    const warningCSS = error ? 'a11y_input--warning' : '';

    return (
      <div className={`a11y_input ${warningCSS}`}>
        {
          message.length > 0 &&
          [
            <div
              id={`${id}-error`}
              className="a11y_input__warning"
              aria-live="assertive"
              role="alert"
            >{message}
            </div>,
            <img className="a11y_input__warning_icon" alt="warning" src={warning} />,
            ]
        }
        <input
          id={id}
          type={type}
          aria-required={required}
          aria-invalid={error}
          required={required}
          disabled={disabled}
          value={value}
          onChange={this.handleChange}
          ref={(i) => { this.input = i; }}
          aria-describedby={`${id}-error`}
          placeholder={placeholder}
        ></input>
        <label htmlFor={id}>{label}{requiredAsterisk}</label>
        
      </div>
    );
  }
}

Input.defaultProps = {
  label: '',
  value: '',
  type: 'text',
  disabled: false,
  onChange: () => {},
  validation: () => {},
  required: false,
  placeholder: '',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  validation: PropTypes.func,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};
