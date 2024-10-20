function add(num1, num2) {
	return (parseInt(num1) + parseInt(num2)).toFixed(6);
}

function subtract(num1, num2) {
	return (num1 - num2).toFixed(6);
}

function multiply(num1, num2) {
	return (num1 * num2).toFixed(6);
}

function divide(num1, num2) {
	return (num1 / num2).toFixed(6);
}

function operate(operator, num1, num2) {
	switch (operator) {
		case "+":
			return add(num1, num2);
		case "-":
			return subtract(num1, num2);
		case "x":
			return multiply(num1, num2);
		case "÷":
			return divide(num1, num2);
	}
}

// get the references for display and digits
const digits = document.querySelector(".digits");
let display = document.querySelector(".display");

digits.addEventListener("click", (e) => {
	// create variables for each element on display
	let target = e.target;
	let firstNumOnDisplay = display.textContent.split(" ")[0];
	let secondNumOnDisplay = display.textContent.split(" ")[2];
	let operatorOnDisplay = display.textContent.split(" ")[1];

	// if a number digit is clicked
	if (target.id >= 0 && target.id <= 9) {
		// don't allow for repeatedly pressing the 0 button if not inside a number
		if (firstNumOnDisplay == "0") {
			display.textContent = display.textContent.replace(
				firstNumOnDisplay,
				target.id
			);
			return;
		} else if (secondNumOnDisplay == "0") {
			display.textContent = display.textContent.replace(
				secondNumOnDisplay,
				target.id
			);
			return;
		}
		display.textContent += target.id;
	}
	// if an operation digit is clicked
	else if (["x", "÷", "+", "-"].includes(target.id)) {
		// there is no operator on display
		if (!["x", "÷", "+", "-"].includes(operatorOnDisplay)) {
			display.textContent += " " + target.id + " ";
		}
		// if there is a full operation on display, finish this one and start the other
		else if (
			["x", "÷", "+", "-"].includes(operatorOnDisplay) &&
			secondNumOnDisplay != ""
		) {
			display.textContent = operate(
				operatorOnDisplay,
				firstNumOnDisplay,
				secondNumOnDisplay
			);
		}
		// if the user presses an operation before finishing one
		else {
			display.textContent = display.textContent.replace(
				operatorOnDisplay,
				target.id
			);
		}
	}
	// if the fraction digit is clicked
	else if (target.id == ".") {
		// if both the elements on display aren't fractional add the .
		if (
			(!firstNumOnDisplay.includes(".") && !secondNumOnDisplay.includes(".")) ||
			!(display.textContent.at(-1) == " ")
		) {
			display.textContent += ".";
		}
		// if the second element on display isn't fractional and the first is, add the .
		else if (
			!secondNumOnDisplay.includes(".") &&
			firstNumOnDisplay.includes(".")
		) {
			display.textContent += ".";
		}
	}
	// if the equal digit is clicked
	else if (target.id == "=") {
		// make the operation if there is one to be made
		if (["x", "÷", "+", "-"].includes(operatorOnDisplay)) {
			display.textContent = operate(
				operatorOnDisplay,
				firstNumOnDisplay,
				secondNumOnDisplay
			);
		}
	}
});
