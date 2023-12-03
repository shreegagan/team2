const worker = new Worker('worker.js');

document.getElementById('conversion-form').addEventListener('submit', (event) => {

    event.preventDefault();

    const fromCurrency = document.getElementById('from-currency').value;

    const toCurrency = document.getElementById('to-currency').value;

    const units = parseFloat(document.getElementById('units').value);

    worker.postMessage({ fromCurrency, toCurrency, units });

});

worker.addEventListener('message', (event) => {

    const result = event.data;

    const previousConversionsList = document.getElementById('previous-conversions');

    previousConversionsList.innerHTML += `<li>${result.fromCurrency} to ${result.toCurrency}: ${result.result}</li>`;

    storeConversionResult(result);

});

function storeConversionResult(result) {

    const conversions = JSON.parse(localStorage.getItem('conversions')) || [];

    conversions.push(result);

    if (conversions.length > 3) {

        conversions.shift();

    }

    localStorage.setItem('conversions', JSON.stringify(conversions));

}