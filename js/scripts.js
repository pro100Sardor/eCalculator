// I bosqich: kalkulyatorni shunchaki son kiritganda ishlaydigan qilish
// 1. hisoblash amalini bajaruvchi obyektni hosil qilib olish (bajarildi)
// 1. Formni jonatilishni to'xtatish (bajarildi)
// 2. birinchi inputdagi qiymatni olish (bajarildi)
// 3. ikkinchi inputdagi qiymatni olish (bajarildi)
// 4. selectni qiymatini olish (bajarildi)
// 5. obyektdan foydalanib hisob kitob amalini bajarish (bajarildi)
// 6. natijani viewga chiqarish (bajarildi)

// II - bosqich
// 1. inputlarga kiritiladigan qiymatlarni natijaga qo'shib chiqarish (bajarildi)
// 2. inputlarni valuesini tozalab tashlash va focusni birinchi inputga qo'yilish (bajarildi)
// // 3. inputni qiymatini local storagega joylash va local storagedan olish
// 4. ikkita input bo'sh bo'lishiga tekshirish (bajarildi)
// 5. stilni yaxshilash (bajarildi)

// ikkinchi argument 0 bo'lganda xatolik qaytarilishi kerak. (bajarildi);

function Calculation (firstOperand, secondOperand) {
  this.firstOperand = firstOperand;
  this.secondOperand = secondOperand;
}

Calculation.prototype.division = function() {return this.firstOperand / this.secondOperand;}
Calculation.prototype.multiplication = function() {return this.firstOperand * this.secondOperand;}
Calculation.prototype.subtraction = function() {return this.firstOperand - this.secondOperand;}
Calculation.prototype.addition = function() {return this.firstOperand + this.secondOperand;}
Calculation.prototype.modulus = function() {return this.firstOperand % this.secondOperand;}
Calculation.prototype.exponentiation = function() {return this.firstOperand ** this.secondOperand;}

let elSiteMain = document.querySelector('#siteMain');
let elCalculatorForm = elSiteMain.querySelector('#calculatorForm');
let elFirstOperandInput = elCalculatorForm.querySelector('#firstOperandInput');
let elSecondOperandInput = elCalculatorForm.querySelector('#secondOperandInput');
let elOperatorSelector = elCalculatorForm.querySelector('#operatorSelector');

let elErrorBox = document.querySelector('#errorBox');

let elCalculationResult = elSiteMain.querySelector('#calculationResult');

function generatingError(errorType) {
  let elErrorMessage = document.createElement('p');
  elErrorMessage.classList.add('alert', 'alert-danger', 'my-3');

  switch(errorType) {
    case 'operandsAreNotIncluded':
      elErrorMessage.textContent = "enter a number in the fields to perform the calculation";
      break;

    case 'divideByZero':
      elErrorMessage.textContent = `The number ${elFirstOperandInput.value} cannot be divided by 0`;
      break;

    default:
      elErrorMessage.textContent = '';
  }

  elErrorBox.appendChild(elErrorMessage);
}

function calculationOfValues(evt) {
  evt.preventDefault();

  elErrorBox.innerHTML = '';

  const firstOperandInput = elFirstOperandInput.value.trim() || localStorage.getItem('firstOperandInput');
  console.log(firstOperandInput);
  const secondOperandInput = elSecondOperandInput.value.trim() || localStorage.getItem('secondOperandInput');
  console.log(secondOperandInput);


  // ikkala inputga qiymat kiritilmay qolish holati tekshirildi
  if (firstOperandInput.value === '' || secondOperandInput.value === '') {
    generatingError('operandsAreNotIncluded');
    return;
  }

  // mahraj 0 bo'lib qolish holat bo'lmasligi uchun tekshiruv qo'yildi
  if (secondOperandInput.value === '0' && elOperatorSelector.value === 'division') {
    generatingError('divideByZero');
    return;
  }

  localStorage.setItem('firstOperandInput', firstOperandInput);
  localStorage.setItem('secondOperandInput', secondOperandInput);

  const operatorSelector = elOperatorSelector.value;
  let calculationResult = 0;
  let operatorType = '';

  const calculator = new Calculation(Number(firstOperandInput), Number(secondOperandInput));

  switch(operatorSelector) {
    case "division":
      calculationResult = calculator.division();
      operatorType = '/';
      break;
    case 'multiplication':
      calculationResult = calculator.multiplication();
      operatorType = '*';
      break;
    case 'subtraction':
      calculationResult = calculator.subtraction();
      operatorType = '-';
      break;
    case 'addition':
      calculationResult = calculator.addition();
      operatorType = '+';
      break;
    case 'modulus':
      calculationResult = calculator.modulus();
      operatorType = '%';
      break;
    case 'exponentiation':
      calculationResult = calculator.exponentiation();
      operatorType = '**';
      break;
    default:
      elErrorMessage.textContent = "non-existent operator selected, please select an existing operator in the list";
      return;
  }

  elCalculationResult.innerHTML = `<span>${firstOperandInput} ${operatorType} ${secondOperandInput} =</span> <span class="display-4 pr-3">${calculationResult.toFixed(2)}</span>`;
  elFirstOperandInput.value = localStorage.getItem('firstOperandInput');
  elSecondOperandInput.value = localStorage.getItem('secondOperandInput');
  elFirstOperandInput.focus();
}

elCalculatorForm.addEventListener('submit', calculationOfValues);