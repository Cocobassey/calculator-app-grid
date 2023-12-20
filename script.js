const links = document.querySelectorAll('link')
const togglebtn = document.querySelectorAll('input')

const prevInputText = document.getElementById('prev-input')
const resultInput = document.getElementById('result-input')
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const deleteBtn = document.querySelector(".del-btn");
const resetBtn = document.querySelector(".reset-btn");
const resultBtn = document.querySelector(".equal-btn");

let prevInput = prevInputText.innerText;
let resultView = resultInput.innerText;
let operation;


function changeTheme(i) {
    if(i === "0") {
        links[2].setAttribute("href", "")
    } else {
        links[2].setAttribute("href", `css/theme${i}.css`)
    }
}

togglebtn.forEach(btn => {
    btn.addEventListener('click', () => {
        changeTheme(btn.value);
    })
})

function reset() {
    prevInput = ""
    resultView = "";    // resultView = ""
    operation = undefined
}

function deleteDigits() {
    resultView = resultView.toString().slice(0, -1)
}

function addNumber(number) {
    if(number === "." && resultView.includes(".")) return;
    resultView = resultView.toString() + number.toString()
}

function operationProcess(operate) {
    if(resultInput === "") return;   // if(resultInput === 0) return;
    if(prevInputText !== "") {      // if(prevInputText !== 0)
       calcOp()
    }
    operation = operate;
    prevInput = resultView;
    resultView = "";     //resultView = "";
}

function calcOp() {
    let result;
    let prev = parseFloat(prevInput)
    let current = parseFloat(resultView)
    if(isNaN(prev) || isNaN(current)) return;

    switch(operation) {
        case "+":
            result = prev + current;
            break;

        case "-":
            result = prev - current;
            break;
        
        case "*":
            result = prev * current;
            break;
            
        case "/":
            result = prev / current;
            break;

        default:
            return;
    }

    resultView = result
    operation = undefined
    prevInput = ""
    prevInputText.innerText = ""
}

function displayNum() {
    resultInput.innerText = resultView.toLocaleString("en")
    if(operation !== undefined) {
        // prevInputText.innerText = `${prevInput} ${operation.toString("en")}`
        prevInputText.innerText = `${prevInput} ${operation.toString()}`
    } else {
        prevInputText.innerText = prevInput
    }
}

resetBtn.addEventListener("click", () => {
    reset()
    displayNum()
})

deleteBtn.addEventListener("click", () => {
    deleteDigits()
    displayNum()
})

resultBtn.addEventListener("click", () => {
    calcOp()
    displayNum()
})

operators.forEach(btn => {
    btn.addEventListener("click", () => {
        operationProcess(btn.innerText)
        displayNum()
    })
})

digits.forEach(digit => {
    digit.addEventListener("click", () => {
        addNumber(digit.innerText)
        displayNum()
    })
})

