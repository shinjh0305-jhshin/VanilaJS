const currencyFrom = document.getElementById('from');
const amountFrom = document.getElementById('amountFrom');
const currencyTo = document.getElementById('to');
const amountTo = document.getElementById('amountTo');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
    const $currencyFrom = currencyFrom.value;
    const $currencyTo = currencyTo.value;

    fetch(`https://open.exchangerate-api.com/v6/latest/${$currencyFrom}`)
        .then(response => response.json())
        .then(data => {
            const calculatedRate = data.rates[$currencyTo];
            rate.innerText = `1 ${$currencyFrom} = ${calculatedRate} ${$currencyTo}`;
            amountTo.value = (amountFrom.value * calculatedRate).toFixed(2);
        })
}

currencyFrom.addEventListener('change', calculate);
currencyTo.addEventListener('change', calculate);   
amountFrom.addEventListener('input', calculate);
amountTo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyFrom.value;
    currencyFrom.value = currencyTo.value;
    currencyTo.value = temp;
    calculate();
})

calculate();