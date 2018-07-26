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
      return { pass: false, message: 'Three characters of more for this one, k?' };
    }
    return { pass: true };
  }

  inputIsEmpty = (val) => {
    if (val.length === 0) {
      return { pass: false, message: 'This input cannot be empty.' };
    }
    return { pass: true };
  }

  inputIsEmail = (val) => {
    if (val.length === 0) {
      return { pass: false, message: 'Please enter a valid email address.' };
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
            label="email address"
            onChange={this.inputChangeHandler}
            value={input1}
            validation={this.inputIsEmpty}
            placeholder="yourname@email.com"
          />
        </div>
        <div className="input_grid__middle--left">
          <Input 
            id="input2"
            label="middle left input"
            onChange={this.inputChangeHandler}
            value={input2}
            validation={this.inputIsLongEnough}
            required={true}
          />
        </div>
        <div className="input_grid__middle--right">
          <Input   
            id="input3"
            label="middle right"
            onChange={this.inputChangeHandler}
            value={input3}
            
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
