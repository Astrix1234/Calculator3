const clearBtn = document.querySelector('.clear');
const operatorBtn = document.querySelectorAll('.operator');
const numberBtn = document.querySelectorAll('.number');
const equalsBtn = document.querySelector('.equals');
const previousNumber = document.querySelector('.previous-number');
const mathSymbol = document.querySelector('.math-symbol');
const currentNumber = document.querySelector('.current-number');
const calculatorHistory = document.querySelector('.list-history');
const historyBtn = document.querySelector('.history__reset');

clearBtn.addEventListener('click', clearWindow);
operatorBtn.forEach(li => li.addEventListener('click', operate));
numberBtn.forEach(li => li.addEventListener('click', showNumber));
equalsBtn.addEventListener('click', showResult);
historyBtn.addEventListener('click', clearHistory);

let result = '';

function showNumber() {
  if (this.textContent === '.' && currentNumber.innerHTML.includes('.')) return;
  if (this.textContent === '.' && currentNumber.innerHTML === '')
    return (currentNumber.innerHTML += '0.');
  currentNumber.innerHTML += this.textContent;
}

function operate() {
  if (this.textContent === '-' && currentNumber.innerHTML === '') {
    return (currentNumber.innerHTML = '-');
  } else if (currentNumber.innerHTML === '') {
    return;
  }
  if (mathSymbol.innerHTML !== '') {
    showResult();
  }
  previousNumber.innerHTML = currentNumber.innerHTML;
  mathSymbol.innerHTML = this.textContent;
  currentNumber.innerHTML = '';
}

function showResult() {
  if (previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return;
  let action = mathSymbol.innerHTML;
  let i = Number(currentNumber.innerHTML);
  let j = Number(previousNumber.innerHTML);
  switch (action) {
    case '+':
      result = i + j;
      break;
    case '-':
      result = j - i;
      break;
    case '*':
      result = j * i;
      break;
    case '/':
      result = j / i;
      break;
    case '%':
      result = (j * i) / 100;
      break;
    case 'x^':
      result = j ** i;
      break;
  }
  addHistory();
  currentNumber.innerHTML = result;
  previousNumber.innerHTML = '';
  mathSymbol.innerHTML = '';
  historyBtn.classList.add('active');
}

function addHistory() {
  const newHistoryElement = document.createElement('li');
  newHistoryElement.innerHTML = `${previousNumber.innerHTML} ${mathSymbol.innerHTML} ${currentNumber.innerHTML} = ${result}`;
  calculatorHistory.appendChild(newHistoryElement);
}
function clearWindow() {
  previousNumber.innerHTML = '';
  mathSymbol.innerHTML = '';
  currentNumber.innerHTML = '';
  result = '';
}

function clearHistory() {
  calculatorHistory.textContent = '';
  if (calculatorHistory.textContent === '') {
    historyBtn.classList.remove('active');
  }
}
