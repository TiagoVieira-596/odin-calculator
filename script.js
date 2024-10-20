function add(num1, num2) {
	return +(+num1 + +num2).toFixed(6);
}

function subtract(num1, num2) {
	return +(num1 - num2).toFixed(6);
}

function multiply(num1, num2) {
	return +(num1 * num2).toFixed(6);
}

function divide(num1, num2) {
	return +(num1 / num2).toFixed(6);
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
const calculator = document.querySelector(".calculator");
let display = document.querySelector(".display");

calculator.addEventListener("click", (e) => {
	// create variables for each element on display
	let target = e.target;
	let firstNumOnDisplay = display.textContent.split(" ")[0];
	let secondNumOnDisplay = display.textContent.split(" ")[2];
	let operatorOnDisplay = display.textContent.split(" ")[1];

	// pressed somewhere else
	if (target.id == "") {
		return;
	}

	// if a number digit is clicked
	if (target.id >= 0 && target.id <= 9) {
		// don't allow for repeatedly pressing the 0 button if not inside a number
		if (firstNumOnDisplay == "0" && operatorOnDisplay == undefined) {
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
		else if (["x", "÷", "+", "-"].includes(operatorOnDisplay)) {
			if (secondNumOnDisplay == "") {
				display.textContent = display.textContent.replace(
					operatorOnDisplay,
					target.id
				);
				return;
			}
			display.textContent = operate(
				operatorOnDisplay,
				firstNumOnDisplay,
				secondNumOnDisplay
			);
			display.textContent += " " + target.id + " ";
		}
	}
	// if the fraction digit is clicked
	else if (target.id == ".") {
		// if both the elements on display aren't fractional add the .
		if (
			!firstNumOnDisplay.includes(".") &&
			display.textContent.at(-1) != " " &&
			firstNumOnDisplay != ""
		) {
			if (
				secondNumOnDisplay != undefined &&
				!secondNumOnDisplay.includes(".")
			) {
				display.textContent += ".";
			} else if (secondNumOnDisplay == undefined) {
				display.textContent += ".";
			}
		}
		// if the second element on display isn't fractional and the first is, add the .
		else if (
			!secondNumOnDisplay.includes(".") &&
			secondNumOnDisplay != "" &&
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
	// pressed the C button
	else if (target.id == "C") {
		display.textContent = "0";
		firstNumOnDisplay = "0";
		operatorOnDisplay = undefined;
		secondNumOnDisplay = undefined;
	}
	// pressed the CE button
	else if (target.id == "CE") {
		if (secondNumOnDisplay == undefined || secondNumOnDisplay == "") {
			display.textContent = "0";
			firstNumOnDisplay = "0";
			operatorOnDisplay = "";
			secondNumOnDisplay = "";
		} else {
			display.textContent =
				firstNumOnDisplay + " " + operatorOnDisplay + " " + "";
			secondNumOnDisplay = undefined;
		}
	}
});

calculator.addEventListener("mouseover", (e) => {
	let target = e.target;

	if (
		((target.id >= 0 && target.id <= 9) ||
			["+", "-", "x", "÷", "=", ".", "CE", "C"].includes(target.id)) &&
		target.id != ""
	) {
		target.style.opacity = "0.6";
	}
});

calculator.addEventListener("mouseout", (e) => {
	let target = e.target;

	if (
		((target.id >= 0 && target.id <= 9) ||
			["+", "-", "x", "÷", "=", ".", "CE", "C"].includes(target.id)) &&
		target.id != ""
	) {
		target.style.opacity = "1";
	}
});
