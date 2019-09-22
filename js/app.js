const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator-screen");
const operator = document.querySelector(".operator");
const equals = document.getElementById("#equal");
const numbers = document.querySelector(".number");
const keys = document.querySelector(".calculator-keys");

//Calculate function, takes numbers and math function, returns sum.
const calculate = (n1, operator, n2) => {
    let result = "";
    
    if (operator === "add") {
      result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === "subtract") {
      result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === "multiply") {
      result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === "divide") {
      result = parseFloat(n1) / parseFloat(n2);
    }
    
    return result;
  }

  //Calculate planet weight
  const calculatePlanet = (n1, planet) => {
    let result = "";
    
    if (planet === "moon") {
        result = parseFloat(n1) * 0.166;
    } else if (planet === "mercury") {
        result = parseFloat(n1) * 0.38;
    } else if (planet === "venus") {
        result = parseFloat(n1) * 0.91;
    } else if (planet === "mars") {
        result = parseFloat(n1) * 0.38;
    } else if (planet === "jupiter") {
        result = parseFloat(n1) * 2.34;
    } else if (planet === "saturn") {
        result = parseFloat(n1) * 1.06;
    } else if (planet === "uranus") {
        result = parseFloat(n1) * 0.92;
    } else if (planet === "neptune") {
        result = parseFloat(n1) * 1.19;
    }
    
    
    return result;
  }

/* 
    decimalButton, appends decimal to text field, unless there is already a decimal present.
*/
const decimalButton = (currentDisplay) => {
    if(calculator.dataset.previousKeyType === "operator"){
        display.textContent = "0.";
    } else
    if (!currentDisplay.includes(".")) {
        if(currentDisplay === "0"){
            display.textContent = currentDisplay + ".";
        }
    }
}

/* 
    numberButton, if no button has been pressed, replaces the default 0 with number
    or appends number to text field
*/
const numberButton = (currentDisplay, keyValue) => {
    if(currentDisplay === "0"){
        display.textContent = keyValue;
    } else {
        display.textContent = currentDisplay + keyValue;
    }
}

/* 
    equalsButton, stores necessary data and determines whether a numerical operation is being preformed
    or if a planet weight conversion is being preformed, and hands off data to the appropriate function
*/
const equalsButton = (currentDisplay) => {
    //if no operator has been used, currentDisplay is unchanged
    if(calculator.dataset.operator === "none"){
        equals.class = "disabled";
    }
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = currentDisplay;
    
    if(calculator.dataset.previousKeyType === "planet"){
        display.textContent = calculatePlanet(firstValue, operator);
    } else {
        display.textContent = calculate(firstValue, operator, secondValue);
    }
}

/* 
    allClear, resets everything for a clean slate
*/
const allClear = () => {
    calculator.dataset.previousKeyType = "none";
    calculator.dataset.firstValue = "0";
    calculator.dataset.operator = "none";
    display.textContent = "0";
}

/* 
    actionClear, after math operator is pressed, prepares calculator to take second value
*/
const actionClear = (currentDisplay, previousKeyType, keyValue) =>{
    if (currentDisplay === "0" || previousKeyType === "operator") {
        if(keyValue !== "." && !currentDisplay.startsWith("0.")){
            display.textContent = keyValue;
            calculator.dataset.previousKeyType = "number";
        }
    } else {
            display.textContent = currentDisplay + keyValue;
    }
}

/* 
    key click event, everything happens here. determined key pressed and which action to take upon press.
*/
keys.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
        const keyPressed = e.target;
        const keyValue = keyPressed.textContent;
        const currentDisplay = display.textContent;
        const action = keyPressed.dataset.action;

        //Math functions, 
        if( action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide"){
                // collect data for calculation when pressing equals
                calculator.dataset.previousKeyType = "operator";
                calculator.dataset.firstValue = currentDisplay;
                calculator.dataset.operator = action;
        }

        //planet functions
        if( action === "moon" ||
            action === "mercury" ||
            action === "venus" ||
            action === "mars" ||
            action === "jupiter" ||
            action === "saturn" ||
            action === "uranus" ||
            action === "neptune"){
                // collect data for calculation when pressing equals
                calculator.dataset.previousKeyType = "planet";
                calculator.dataset.firstValue = currentDisplay;
                calculator.dataset.operator = action;
        }

        //number buttons
        if(keyPressed.classList.contains("number")){
            numberButton(currentDisplay, keyValue);
        }

        //decimal button
        if(keyPressed.value === "."){ 
            decimalButton(currentDisplay);
        }

        //equals button, preforms calculation
        if (action === "calculate") {
            equalsButton(currentDisplay);
        }

        //all clear button, clears everything and resets calculator
        if (action === "all-clear") {
            allClear();

        }

        const previousKeyType = calculator.dataset.previousKeyType;
        //if an operator was the last key pressed, replace display text with next number pressed
        if (!action) {
            actionClear(currentDisplay, previousKeyType, keyValue);
        }
    }
    
});

