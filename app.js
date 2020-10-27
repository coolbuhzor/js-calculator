
// ******* STEP 2********
// this is how we are going to store all the information. i.e currently typed number and operators.
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement

        // step 6 this sets to defaul value as soon as we create a new calculator
        this.clear()
    }

    //stepp 3 think about all operator a simple calculator can perform.
    clear() {
        //clear out our different variables
        // remove all the values entered
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        // removing a single number


        //++++++++++++++++++++++ step 20 ++++++++++++++++++++++++++
        // get the very last vaaluefrom the string and chop it off
        // this is going to take all the different character in the string from the first to the second to the last

        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }


    appendNumber(number) {
        // this is what happens everytime a user clicks a number to add to the screen

        //******* step 10 ****/
        //we want '.' to get added just once.
        if (number === '.' && this.currentOperand.includes('.')) return

        //*****************************step 9****************************
        // update the currentOperand value and append the number that gets clicked to the end of it.

        //convert to a string just  incase it is a number so that we can easily append to it by using '+'
        //also because javaScript will try to add them as actual numbers e.g 1+1 =2 instead of 1+1=11 cuz we want the number appended not added
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        // this is what happens when a user clicks on any one of the operations

        //*********** step 14*********\*/
        // you must have seen that if u click an operation, it acttually goes through with the computation. stop that with a check
        if (this.currentOperand === '') return

        //*************************step 15*******************************/
        // another thing to note about the current operand is that, if we have 2 values we click an operation, it will do the computation and it also puts all our operand values where they need to be. we need to have another check for that.
        //in essence that is to check if the previous operand already exists b4 our operand choosing
        if (this.previousOperand !== '') {
            this.compute()
        }



        //***************** step 12 ****************** */
        //clear out currentOperand, put it into previousOperand and allow us to type a new value
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        // takes our value inside of the calc and compute a single value for what is needed to be displayeed on the calc

        //+++++++++++++++++++++++++++++++ STEP 17 ++++++++++++++++++++++++++++++++++
        let computation // result of our compute fn

        // number version of our prev, current operands
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        //check if for example, the user dont enter anything and they click "=", we dont want   our code to run.
        if (isNaN(prev) || isNaN(current)) return

        // +++++++++++++++++++++++++STEP 18 +++++++++++++++++++++++++++
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

        //++++++++++++++++ STEP 19+++++++++++++++
        //without computation done,
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand =''

    }


    updateDisplay() {
        // updates the value inside our output
        this.currentOperandTextElement.innerText = this.currentOperand

        //******************** STEP 13************************* */
        //UPDATE DISPLAY FOR 12

        this.previousOperandTextElement.innerText = this.previousOperand
    }
}


//******************************* Step 4**************************************/
//with our operators all defined, lets think about the different properties our calc needs to store.

//we need to know the previousOperandElement, currentOperandElement and the operation a user selects.

// step 1 get element from dom

const numberButtons = document.querySelectorAll('[data-number]')
// the line above is used to get all data-number attribute in the html

const operationButtons = document.querySelectorAll('[data-operation]')
// the line above is used to get all data-operation attribute in the html

const equalsButton = document.querySelector('[data-equals]')
// the line above is used to get all data-equals attribute in the html

const deleteButton = document.querySelector('[data-delete]')
//the line above is used to get all data-delete attribute in the html

const allClearButton = document.querySelector('[data-all-clear]')
//the line above is used to get all data-all-clear attribute in the html

const previousOperandTextElement = document.querySelector('[data-previous-operand]')
// the line above is used to get all data-previous-operand attribute in the html

const currentOperandTextElement = document.querySelector('[data-current-operand]')
// the line above is used to get all data-current-operand attribute in the html


//7 Hooking up all of our different and making them operate on our calculator object... this allows us instantiate/use the object calculator object

let calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//8 add an event listener to each button and append the innerText(number) on the button.
//8i our display values will be constantly updated anytime we click on a button

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


//******************** STEP 11 **********************/

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


//***************************** step 16 *********************************/
equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})


//++++++++++++++++++++++++++++ step 21 +++++++++++++++++++++++++++
//add the delete
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})


