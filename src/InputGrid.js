import * as React from 'react';
import Input from './Input';
import './InputGrid.css';

class InputGrid extends React.Component {
  state = {
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  }

  inputChangeHandler = (event) => {
    const { id, value } = event.target;
    this.setState({ 
      [id]: value,
    });
  }

  inputIsLongEnough = (val) => {
    if (val.length < 3) {
      return { pass: false, message: 'If I\'m hearing this my demo is going okay, I guess.' };
    }
    return { pass: true };
  }

  render() {
    const { input1, input2, input3, input4 } = this.state;
    return (
      <div className="input_grid">
        <div className="input_grid__top">
          <Input 
            id="input1"
            label="first input"
            onChange={this.inputChangeHandler}
            value={input1}
            validation={this.inputIsLongEnough}
          />
        </div>
        <div className="input_grid__middle--left">
          <Input 
            id="input2"
            label="middle left input"
            onChange={this.inputChangeHandler}
            value={input2}
            validation={this.inputIsLongEnough}
          />
        </div>
        <div className="input_grid__middle--right">
          <Input 
            id="input3"
            label="middle right input"
            onChange={this.inputChangeHandler}
            value={input3}
            validation={this.inputIsLongEnough}
          />
        </div>
        <div className="input_grid__bottom">
          <Input 
            id="input4"
            label="bottom input"
            onChange={this.inputChangeHandler}
            value={input4}
            validation={this.inputIsLongEnough}
          />
        </div>
      </div>
    );
  }
}

export default InputGrid;
