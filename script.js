/*
Project: Calculator
Author: Luoxi Pan
*/

const OPERATOR_CLASSLIST_IDX = 0;
const MAX_DISPLAY_LENGTH = 8;
const ALLOWED_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '-', '/', '*', 'Enter', 'Backspace'];
const DIGITS_BUTTON = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '±'];
const DISABLED_BUTTON = ['±', '(', ')', '%'];

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
    let buttonText = evt.target.textContent;
    // disable decimal button for first operand
    if(!firstOperand && displayValue.includes('.') && buttonText == '.') {
        return;
    } // disable decimal button for second operand
    else if(calculationValue.includes('.') && buttonText == '.') {
        return;
    }
    else if(DISABLED_BUTTON.includes(buttonText)) {
        return;
    }

    displayValue += buttonText;
    calculationValue += buttonText;
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
    else if(!calculationValue) {
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

    if(solution.toString().length > MAX_DISPLAY_LENGTH) {
        solutionTruncated = solution.toFixed(MAX_DISPLAY_LENGTH)
        updateDisplayArea(solutionTruncated);
        displayValue = solutionTruncated;
    } else {
        updateDisplayArea(solution);
    }
}

function triggerButtonUsingKeypress(e) {
    if(ALLOWED_KEYS.includes(e.key.toString())) {
        document.getElementById(e.key).click();
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

function createDigitButtons() {
    let digitContainer = document.querySelector('.digitContainer');

    for(let i = 0; i < DIGITS_BUTTON.length; i++) {
        let char = DIGITS_BUTTON[i]
        let button = document.createElement('button');
        button.textContent = char;
        button.setAttribute('id', char);
        digitContainer.appendChild(button);
    }
}

function applyDisabledButtonClass() {
    buttons = document.querySelectorAll('button')
    buttons.forEach(button => {
        if(DISABLED_BUTTON.includes(button.textContent)) {
            button.setAttribute('class', 'disabled');
        }
    })
}


let displayValue = '';
let calculationValue = '';
let firstOperand;
let secondOperand;
let operatorName;
let operatorFunc;

createDigitButtons();
applyDisabledButtonClass();
setupDigitListeners();
setupOperatorListeners();


let equalButton = document.querySelector('.equals');
equalButton.addEventListener('click', equals);

let clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);

document.addEventListener('keydown', triggerButtonUsingKeypress);
