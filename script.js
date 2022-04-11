/*
Project: Calculator
Author: Luoxi Pan
*/

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function clear() {
    firstOperand = '';
    secondOperand = '';
    displayValue = '';
    calculationValue = '';
    operatorFunc = undefined;
    updateDisplayArea('');
}

function updateDisplayArea(string) {
    display = document.querySelector('.display')
    display.textContent = string;
}

function digitButton(evt) {
    displayValue += evt.target.textContent;
    calculationValue += evt.target.textContent;
    updateDisplayArea(displayValue);
}

function operatorButton(evt) {
    let operator = evt.target.classList[0];
    console.log(operator);
    let operatorSymbol = evt.target.textContent;

    firstOperand = calculationValue;
    
    displayValue += operatorSymbol;
    updateDisplayArea(displayValue);

    // the operator function that will be called in operate()
    operatorFunc = window[operator];
    calculationValue = '';
}

function equals() {
    // ensure nothing is called if no operands are inputted
    if(!firstOperand) {
        return;
    }

    secondOperand = calculationValue;
    console.log(`1st operand: ${firstOperand}`);
    // console.log(operatorFunc);
    console.log(`2nd operand: ${secondOperand}`);

    let solution = operate(operatorFunc, +firstOperand, +secondOperand);
    console.log(`Solution: ${solution}`)

    // remember solution to allow for further calculations
    firstOperand = solution;
    displayValue = solution;
    calculationValue = solution;
}

function setupDigitListeners() {
    let digits = document.querySelectorAll('.digitContainer button');
    digits.forEach(digit => {
        digit.addEventListener('click', digitButton);
    });
}

function setupOperatorListeners() {
    let operators = document.querySelectorAll('.operatorContainer .operator');
    operators.forEach(operator => {
        operator.addEventListener('click', operatorButton);
    });
}


let displayValue = '';
let calculationValue = '';
let firstOperand;
let secondOperand;
let operatorFunc;

setupDigitListeners();
setupOperatorListeners();

let equalButton = document.querySelector('.equals');
equalButton.addEventListener('click', equals);

let clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);
