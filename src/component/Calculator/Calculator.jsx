import React, { Component } from 'react'
import './Calculator.css';
import clickSound from './sound/Click.mp3'; 
import logo from './images/logo.jpeg';

export class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
          displayValue: '0',
          operator: null,
          firstValue: null,
          waitingForSecondValue: false
        };
      }
      playSound = (sound) => {
        const audio = new Audio(clickSound);
        audio.play();
      };
      handleNumberClick = (number) => {
        this.playSound('click');
        const { displayValue, waitingForSecondValue } = this.state;
      
        if (waitingForSecondValue) {
          this.setState({
            displayValue: String(number),
            waitingForSecondValue: false
          });
        } else {
          this.setState({
            displayValue: displayValue === '0' ? String(number) : displayValue + number
          });
        }
      };
      handleOperatorClick = (nextOperator) => {
        this.playSound('click');
        const { displayValue, operator, firstValue } = this.state;
        const inputValue = parseFloat(displayValue);
      
        if (firstValue == null) {
          this.setState({
            firstValue: inputValue
          });
        } else if (operator) {
          const currentValue = firstValue || 0;
          const newValue = this.performCalculation[operator](currentValue, inputValue);
      
          this.setState({
            firstValue: newValue,
            displayValue: String(newValue)
          });
        }
      
        this.setState({
          waitingForSecondValue: true,
          operator: nextOperator
        });
      };
      performCalculation = {
        '+': (firstValue, secondValue) => firstValue + secondValue,
        '-': (firstValue, secondValue) => firstValue - secondValue,
        '*': (firstValue, secondValue) => firstValue * secondValue,
        '/': (firstValue, secondValue) => firstValue / secondValue,
      };
      handleClearClick = () => {
        this.playSound('click'); 
        this.setState({
          displayValue: '0',
          firstValue: null,
          operator: null,
          waitingForSecondValue: false
        });
      };
      handleEqualClick = () => {
        this.playSound('click'); 
        const { displayValue, operator, firstValue } = this.state;
        const inputValue = parseFloat(displayValue);
      
        if (operator && firstValue != null) {
          const newValue = this.performCalculation[operator](firstValue, inputValue);
      
          this.setState({
            displayValue: String(newValue),
            firstValue: null,
            operator: null,
            waitingForSecondValue: false
          });
        }
      };
      
      
      render() {
        const { displayValue } = this.state;
      
        return (
          <div className="calculator">
            <div className="header">
         
          <h2 className="calculator-title">Ысык-Көл</h2>
          <img src={logo} alt="Логотип" className="logo" />
        </div>
            <div className="display">{displayValue}</div>
            <div className="buttons">
              <button onClick={this.handleClearClick}>C</button>
              <button onClick={() => this.handleOperatorClick('/')}>/</button>
              <button onClick={() => this.handleOperatorClick('*')}>*</button>
              <button onClick={() => this.handleOperatorClick('-')}>-</button>
              <button onClick={() => this.handleNumberClick(7)}>7</button>
              <button onClick={() => this.handleNumberClick(8)}>8</button>
              <button onClick={() => this.handleNumberClick(9)}>9</button>
              <button onClick={() => this.handleOperatorClick('+')}>+</button>
              <button onClick={() => this.handleNumberClick(4)}>4</button>
              <button onClick={() => this.handleNumberClick(5)}>5</button>
              <button onClick={() => this.handleNumberClick(6)}>6</button>
              <button onClick={this.handleEqualClick}>=</button>
              <button onClick={() => this.handleNumberClick(1)}>1</button>
              <button onClick={() => this.handleNumberClick(2)}>2</button>
              <button onClick={() => this.handleNumberClick(3)}>3</button>
              <button onClick={() => this.handleNumberClick(0)}>0</button>
            </div>
          </div>
        );
      }
      
    }