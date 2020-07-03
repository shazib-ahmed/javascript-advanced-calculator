document.addEventListener('keyup',keyUp);

function keyUp(e){
	e.preventDefault();
	const key1 = document.getElementById("key1");
	const key2 = document.getElementById("key2");
	const key3 = document.getElementById("key3");
	const key4 = document.getElementById("key4");
	const key5 = document.getElementById("key5");
	const key6 = document.getElementById("key6");
	const key7 = document.getElementById("key7");
	const key8 = document.getElementById("key8");
	const key9 = document.getElementById("key9");
	const key10 = document.getElementById("key10");
	const key11 = document.getElementById("key11");
	const key12 = document.getElementById("key12");
	const key13 = document.getElementById("key13");
	const key14 = document.getElementById("key14");
	const key15 = document.getElementById("key15");
	const key16 = document.getElementById("key16");
	const key17 = document.getElementById("key17");

	if(e.keyCode === 97){
		key1.click();
	}
	if(e.keyCode === 98){
		key2.click();
	}
	if(e.keyCode === 99){
		key3.click();
	}
	if(e.keyCode === 100){
		key4.click();
	}
	if(e.keyCode === 101){
		key5.click();
	}
	if(e.keyCode === 102){
		key6.click();
	}
	if(e.keyCode === 103){
		key7.click();
	}
	if(e.keyCode === 104){
		key8.click();
	}
	if(e.keyCode === 105){
		key9.click();
	}
	if(e.keyCode === 96){
		key10.click();
	}
	if(e.keyCode === 110){
		key11.click();
	}
	if(e.keyCode === 107){
		key12.click();
	}
	if(e.keyCode === 109){
		key13.click();
	}
	if(e.keyCode === 106){
		key14.click();
	}
	if(e.keyCode === 111){
		key15.click();
	}
	if(e.keyCode === 13){
		key16.click();
	}
	if(e.keyCode === 8){
		key17.click();
	}
}

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = '0'
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = '0'
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})