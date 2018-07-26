import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import InputGrid from './InputGrid';


class App extends Component {
  

  render() {
    return (
      <div className="App">
        <Header />
        <InputGrid />
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
