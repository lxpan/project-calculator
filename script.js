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

function setupDigitListeners() {
    const digits = document.querySelectorAll('.digitContainer button');
    console.log(digits);
}

function updateDisplayArea(string) {
    display = document.querySelector('.display')
    display.textContent += string;
}

function digitButton(evt) {
    displayValue = updateDisplayArea(evt.target.textContent);
    console.log(displayValue);
}

function setupDigitListeners() {
    let digits = document.querySelectorAll('.digitContainer button');
    digits.forEach(digit => {
        digit.addEventListener('click', digitButton);
    });
}

let displayValue = '';
setupDigitListeners();
