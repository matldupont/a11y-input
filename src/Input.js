import * as React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

export default class Input extends React.Component {
  constructor() {
    super();

    this.state = {
      error: false,
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.triggerValidation = this.triggerValidation.bind(this);
    this.timer = {};
  }

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

  getClasses() {
    if (this.state.error) {
      return 'a11y_input--warning';
    }
    return '';
  }

  getValue() {
    return this.props.value;
  }

  setSuccessState(bool, message = '') {
    this.setState({
      error: !bool,
      // success: bool,
      message,
    });
  }

  focus() {
    this.input.focus();
  }

  handleChange(event) {
    const val = event.target.value;

    this.props.onChange(event);

    this.throttle(() => {
      this.triggerValidation(val);
    });
  }

  triggerValidation(val) {
    if (val === undefined) {
      val = this.getValue();
    }
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

  isValid(value) {
    return this.props.validation.call(this, value);
  }

  render() {
    const { error } = this.state;
    const {
      label,
      bordered,
      type,
      id,
      disabled,
      required,
    } = this.props;

    const borderedCSS = bordered ? '' : 'a11y_input--borderless';

    return (
      <div className={`a11y_input ${this.getClasses()}`}>
        {
          this.state.message.length > 0 &&
          <div
            id={`${id}-error`}
            className="a11y_input__warning"
            aria-live="assertive"
            role="alert"
          >{this.state.message}
          </div>
        }

        <div>
          <input
            id={id}
            type={type}
            aria-required={required}
            aria-invalid={error}
            required={required}
            disabled={disabled}
            className={`${borderedCSS}`}
            value={this.getValue()}
            onChange={this.handleChange}
            ref={(i) => { this.input = i; }}
            aria-describedby={`${id}-error`}
          />
        </div>
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }
}

Input.defaultProps = {
  label: '',
  value: '',
  type: 'text',
  bordered: true,
  disabled: false,
  onChange: () => {},
  validation: () => {},
  required: false,
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.string,
  bordered: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  validation: PropTypes.func,
  required: PropTypes.bool,
};
