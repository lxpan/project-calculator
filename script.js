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

function updateDisplayArea(string) {
    display = document.querySelector('.display')
    display.textContent = string;
}

function digitButton(evt) {
    displayValue += evt.target.textContent;
    calculationValue += evt.target.textContent;
    updateDisplayArea(displayValue);
}

function setupDigitListeners() {
    let digits = document.querySelectorAll('.digitContainer button');
    digits.forEach(digit => {
        digit.addEventListener('click', digitButton);
    });
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

function equals(evt) {
    secondOperand = calculationValue;
    console.log(`1st operand: ${firstOperand}`);
    // console.log(operatorFunc);
    console.log(`2nd operand: ${secondOperand}`);

    let solution = operate(operatorFunc, +firstOperand, +secondOperand);
    console.log(`Solution: ${solution}`)

    updateDisplayArea(solution);

    
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
