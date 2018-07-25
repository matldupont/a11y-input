import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './Input';

class App extends Component {
  state = {
    input1: '',
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
    const { input1 } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Input 
          id="input1"
          label="input #1"
          onChange={this.inputChangeHandler}
          value={input1}
          validation={this.inputIsLongEnough}
        />
      </div>
    );
  }
}

export default App;

// id: { type: 'string', default: 'input-id' },
//   label: { type: 'label', default: 'input label' },
//   value: { type: 'string | number' },
//   type: { type: 'string' },
//   bordered: { type: 'boolean', demo: true },
//   disabled: { type: 'boolean', demo: true },
//   onChange: { type: 'function' },
//   validation: { type: 'function' },
//   placeholder: { type: 'string' },
//   required: { type: 'boolean', demo: true },
