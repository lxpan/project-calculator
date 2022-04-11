/*
Project: Calculator
Author: Luoxi Pan
*/

const OPERATOR_CLASSLIST_IDX = 0;

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
    operatorName = evt.target.classList[OPERATOR_CLASSLIST_IDX];
    console.log(operatorName);
    let operatorSymbol = evt.target.textContent;

    firstOperand = calculationValue;
    
    displayValue += operatorSymbol;
    updateDisplayArea(displayValue);

    // the operator function that will be called in operate()
    operatorFunc = window[operatorName];
    calculationValue = '';
}

function equals() {
    // ensure nothing is called if no operands are inputted
    if(!firstOperand) {
        return;
    }

    secondOperand = calculationValue;
    console.log(secondOperand);
    console.log(operatorName);

    let solution = operate(operatorFunc, +firstOperand, +secondOperand);
    
    // remember solution to allow for further calculations
    firstOperand = solution;
    displayValue = solution;
    calculationValue = solution;

    if(solution.toString().length > 10) {
        solutionTruncated = solution.toFixed(8)
        updateDisplayArea(solutionTruncated);
        displayValue = solutionTruncated;
    } else {
        updateDisplayArea(solution);
    }
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
let operatorName;
let operatorFunc;

setupDigitListeners();
setupOperatorListeners();

let equalButton = document.querySelector('.equals');
equalButton.addEventListener('click', equals);

let clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);
