// functions for each operation
function add(num1, num2) {
	return +(+num1 + +num2).toFixed(16);
}

function subtract(num1, num2) {
	return +(num1 - num2).toFixed(16);
}

function multiply(num1, num2) {
	return +(num1 * num2).toFixed(16);
}

function divide(num1, num2) {
	if (num2 == 0) {
		return "ERROR";
	}
	return +(num1 / num2).toFixed(16);
}

function percentage(number) {
	return +(number / 100).toFixed(16);
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

let firstNumOnDisplay = display.textContent.split(" ")[0];
let secondNumOnDisplay = display.textContent.split(" ")[2];
let operatorOnDisplay = display.textContent.split(" ")[1];

calculator.addEventListener("click", (e) => {
	// create variables for each element on display
	let target = e.target;
	firstNumOnDisplay = display.textContent.split(" ")[0];
	secondNumOnDisplay = display.textContent.split(" ")[2];
	operatorOnDisplay = display.textContent.split(" ")[1];

	// clicked somewhere else
	if (target.id == "") {
		return;
	}

	// if a number digit is clicked
	if (target.id >= 0 && target.id <= 9 && firstNumOnDisplay != "ERROR") {
		// don't allow for repeatedly pressing the 0 button if not inside a number
		if (firstNumOnDisplay == "0" && operatorOnDisplay == undefined) {
			display.textContent = target.id;
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
	else if (
		["x", "÷", "+", "-"].includes(target.id) &&
		firstNumOnDisplay != "ERROR"
	) {
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
	else if (target.id == "." && firstNumOnDisplay != "ERROR") {
		// if both the elements on display aren't fractional add the .
		if (!firstNumOnDisplay.includes(".") && firstNumOnDisplay != "") {
			if (display.textContent.at(-1) == " ") {
				secondNumOnDisplay = "0.";
				display.textContent =
					firstNumOnDisplay +
					" " +
					operatorOnDisplay +
					" " +
					secondNumOnDisplay;
			} else if (
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
			firstNumOnDisplay.includes(".")
		) {
			if (display.textContent.at(-1) == " ") {
				secondNumOnDisplay = "0.";
				display.textContent =
					firstNumOnDisplay +
					" " +
					operatorOnDisplay +
					" " +
					secondNumOnDisplay;
			} else {
				display.textContent += ".";
			}
		}
	}
	// if the equal digit is clicked
	else if (target.id == "=" && firstNumOnDisplay != "ERROR") {
		// make the operation if there is one to be made
		if (
			["x", "÷", "+", "-"].includes(operatorOnDisplay) &&
			secondNumOnDisplay != ""
		) {
			display.textContent = operate(
				operatorOnDisplay,
				firstNumOnDisplay,
				secondNumOnDisplay
			);
		}
	}
	// pressed the % button
	else if (target.id == "%" && firstNumOnDisplay != "ERROR") {
		if (
			(secondNumOnDisplay == undefined || secondNumOnDisplay == "") &&
			operatorOnDisplay == undefined
		) {
			display.textContent = percentage(firstNumOnDisplay);
		} else if (secondNumOnDisplay != undefined && secondNumOnDisplay != "") {
			display.textContent =
				firstNumOnDisplay +
				" " +
				operatorOnDisplay +
				" " +
				percentage(secondNumOnDisplay);
		}
	}
	// pressed the +/- button
	else if (target.id == "invert" && firstNumOnDisplay != "ERROR") {
		if (secondNumOnDisplay == undefined || secondNumOnDisplay == "") {
			if (firstNumOnDisplay[0] != "-") {
				display.textContent = "-" + firstNumOnDisplay;
			} else {
				display.textContent = firstNumOnDisplay.replace("-", "");
			}
		} else if (secondNumOnDisplay != undefined && secondNumOnDisplay != "") {
			if (
				secondNumOnDisplay[0] != "-" &&
				operatorOnDisplay != "+" &&
				operatorOnDisplay != "-"
			) {
				display.textContent =
					firstNumOnDisplay +
					" " +
					operatorOnDisplay +
					" " +
					"-" +
					secondNumOnDisplay;
			} else if (secondNumOnDisplay[0] != "-" && operatorOnDisplay == "+") {
				display.textContent =
					firstNumOnDisplay + " " + "-" + " " + secondNumOnDisplay;
			} else if (secondNumOnDisplay[0] != "-" && operatorOnDisplay == "-") {
				display.textContent =
					firstNumOnDisplay + " " + "+" + " " + secondNumOnDisplay;
			} else {
				display.textContent =
					firstNumOnDisplay +
					" " +
					operatorOnDisplay +
					" " +
					secondNumOnDisplay.replace("-", "");
			}
		}
	}
	// pressed the C button to delete everything
	else if (target.id == "C") {
		display.textContent = "0";
		firstNumOnDisplay = "0";
		operatorOnDisplay = undefined;
		secondNumOnDisplay = undefined;
	}
	// pressed the CE button to delete the last typed operand
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

// change the opacity of buttons when you hover over them
calculator.addEventListener("mouseover", (e) => {
	let target = e.target;

	if (
		((target.id >= 0 && target.id <= 9) ||
			["+", "-", "x", "÷", "=", ".", "CE", "C", "%", "invert"].includes(
				target.id
			)) &&
		target.id != ""
	) {
		target.style.opacity = "0.6";
	}
});

calculator.addEventListener("mouseout", (e) => {
	let target = e.target;

	if (
		((target.id >= 0 && target.id <= 9) ||
			["+", "-", "x", "÷", "=", ".", "CE", "C", "%", "invert"].includes(
				target.id
			)) &&
		target.id != ""
	) {
		target.style.opacity = "1";
	}
});

document.addEventListener("keyup", (e) => {
	let key = e.key;
	firstNumOnDisplay = display.textContent.split(" ")[0];
	secondNumOnDisplay = display.textContent.split(" ")[2];
	operatorOnDisplay = display.textContent.split(" ")[1];

	if (key >= 0 && key <= 9 && firstNumOnDisplay != "ERROR") {
		if (operatorOnDisplay == undefined) {
			if (firstNumOnDisplay == "0") {
				display.textContent = key;
				return;
			}
			firstNumOnDisplay += parseInt(key);
			display.textContent = firstNumOnDisplay;
		} else {
			if (firstNumOnDisplay == "0") {
				secondNumOnDisplay = key;
				display.textContent += secondNumOnDisplay;
				return;
			}
			secondNumOnDisplay += key;
			display.textContent =
				firstNumOnDisplay + " " + operatorOnDisplay + " " + secondNumOnDisplay;
		}
	} else if (
		["+", "-", "/", "x", "*"].includes(key) &&
		firstNumOnDisplay != "ERROR"
	) {
		if (operatorOnDisplay == undefined || operatorOnDisplay == "") {
			if (key == "/") {
				operatorOnDisplay = "÷";
				display.textContent = firstNumOnDisplay + " " + operatorOnDisplay + " ";
			} else if (key == "*") {
				operatorOnDisplay = "x";
				display.textContent = firstNumOnDisplay + " " + operatorOnDisplay + " ";
			} else {
				operatorOnDisplay = key;
				display.textContent = firstNumOnDisplay + " " + operatorOnDisplay + " ";
			}
		} else if (operatorOnDisplay != "") {
			if (secondNumOnDisplay == "") {
				if (key == "/") {
					display.textContent = display.textContent.replace(
						operatorOnDisplay,
						"÷"
					);
					return;
				} else if (key == "*") {
					display.textContent = display.textContent.replace(
						operatorOnDisplay,
						"x"
					);
					return;
				} else {
					display.textContent = display.textContent.replace(
						operatorOnDisplay,
						key
					);
				}
			} else {
				display.textContent = operate(
					operatorOnDisplay,
					firstNumOnDisplay,
					secondNumOnDisplay
				);
				if (key == "*") {
					display.textContent += " " + "x" + " ";
					return;
				} else if (key == "/") {
					display.textContent += " " + "÷" + " ";
					return;
				}
				display.textContent += " " + key + " ";
			}
		}
	} else if (key == "%" && firstNumOnDisplay != "ERROR") {
		if (
			(secondNumOnDisplay == undefined || secondNumOnDisplay == "") &&
			operatorOnDisplay == undefined
		) {
			display.textContent = percentage(firstNumOnDisplay);
		} else if (secondNumOnDisplay != undefined && secondNumOnDisplay != "") {
			display.textContent =
				firstNumOnDisplay +
				" " +
				operatorOnDisplay +
				" " +
				percentage(secondNumOnDisplay);
		}
	} else if ((key == "Enter" || key == "=") && firstNumOnDisplay != "ERROR") {
		if (
			["x", "÷", "+", "-"].includes(operatorOnDisplay) &&
			secondNumOnDisplay != ""
		) {
			display.textContent = operate(
				operatorOnDisplay,
				firstNumOnDisplay,
				secondNumOnDisplay
			);
		}
	} else if ((key == "." || key == ",") && firstNumOnDisplay != "ERROR") {
		if (!firstNumOnDisplay.includes(".") && firstNumOnDisplay != "") {
			if (display.textContent.at(-1) == " ") {
				secondNumOnDisplay = "0.";
				display.textContent =
					firstNumOnDisplay +
					" " +
					operatorOnDisplay +
					" " +
					secondNumOnDisplay;
			} else if (
				secondNumOnDisplay != undefined &&
				!secondNumOnDisplay.includes(".")
			) {
				display.textContent += ".";
			} else if (secondNumOnDisplay == undefined) {
				display.textContent += ".";
			}
		} else if (
			!secondNumOnDisplay.includes(".") &&
			firstNumOnDisplay.includes(".")
		) {
			if (display.textContent.at(-1) == " ") {
				secondNumOnDisplay = "0.";
				display.textContent =
					firstNumOnDisplay +
					" " +
					operatorOnDisplay +
					" " +
					secondNumOnDisplay;
			} else {
				display.textContent += ".";
			}
		}
	}
});
