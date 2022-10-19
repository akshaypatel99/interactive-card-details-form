let imageCardNumber = document.querySelector('.card-number');
let imageExpiryMonth = document.querySelector('.expiry-month');
let imageExpiryYear = document.querySelector('.expiry-year');
let imageCardholderName = document.querySelector('.cardholder-name');
let imageCVC = document.querySelector('.cvc');

let confirmBtn = document.getElementById('confirm');

function updateCardName(value) {
	imageCardholderName.innerHTML = value;
}
function updateCardNumber(value) {
	let parts = [];
	for (let i = 0; i < value.length; i += 4) {
		parts.push(value.substring(i, i + 4));
	}
	let str = parts.join(' ');
	if (str.length > 19) return;
	imageCardNumber.innerHTML = str;
}

function updateMonth(value) {
	imageExpiryMonth.innerHTML = value;
}
function updateYear(value) {
	imageExpiryYear.innerHTML = value;
}
function updateCVC(value) {
	imageCVC.innerHTML = value;
}

function validateName(value) {
	return value.length > 2;
}

function validateCardNumber(value) {
	let result = value.match(/^[1-9]\d*$/); // returns null if contains characters other than 0-9
	if (result === null) return 'Card must only contain numbers';
	if (value.length < 15 || value.length > 16) return 'Incorrect card length';
	return true;
}

function validateExpiryDate(monthValue, yearValue) {
	const d = new Date();
	const month = d.getMonth();
	const year = d.getFullYear().toString().slice(2, 4);

	if (yearValue > year) return true;
	if (yearValue === year) {
		console.log('here');
		if (monthValue > month) return true;
	}
	return false;
}

function validateCVC(cardNumberValue, cvcValue) {
	// First validate for AMEX
	if (cardNumberValue.length === 15) {
		return cvcValue.length === 4;
	}
	return cvcValue.length === 3;
}

confirmBtn.addEventListener('click', (e) => {
	e.preventDefault();

	const formGroups = document.querySelectorAll('.form-group');
	formGroups.forEach((group) => {
		group.classList.remove('show-error');
	});

	const nameInput = document.getElementById('cardholder-name');
	const cardNumberInput = document.getElementById('card-number');
	const monthInput = document.querySelector('.month');
	const yearInput = document.querySelector('.year');
	const cvcInput = document.getElementById('cvc');

	const isValidName = validateName(nameInput.value);
	const isValidCardNumberResult = validateCardNumber(cardNumberInput.value);
	const isValidExpiry = validateExpiryDate(monthInput.value, yearInput.value);
	const isValidCVC = validateCVC(cardNumberInput.value, cvcInput.value);

	if (!isValidName) {
		let nameGroup = document.querySelector('.cardholder-name-input');
		document.getElementById(
			'cardholder-name-error'
		).innerText = `Name is too short`;
		nameGroup.classList.add('show-error');
	}

	if (typeof isValidCardNumberResult === 'string') {
		let cardNumberGroup = document.querySelector('.card-number-input');
		document.getElementById(
			'card-number-error'
		).innerText = `${isValidCardNumberResult}`;
		cardNumberGroup.classList.add('show-error');
	}

	if (!isValidExpiry) {
		let expiryGroup = document.querySelector('.expiry-input');
		document.getElementById('expiry-error').innerText = `Invalid date`;
		expiryGroup.classList.add('show-error');
	}

	if (!isValidCVC) {
		let cvcGroup = document.querySelector('.cvc-input');
		document.getElementById('cvc-error').innerText = `CVC length is incorrect`;
		cvcGroup.classList.add('show-error');
	}

	let containsErrors = false;

	formGroups.forEach((group) => {
		if (group.classList.contains('show-error')) {
			containsErrors = true;
		}
	});

	if (!containsErrors) {
		const formContainer = document.getElementById('form-container');
		formContainer.style.display = 'none';
		const thankYou = document.getElementById('thank-you');
		thankYou.style.display = 'flex';
	}
});
