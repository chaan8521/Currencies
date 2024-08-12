document.addEventListener('DOMContentLoaded', async () => {
   const form = document.getElementById('conversion-form');
   const resultDiv = document.getElementById('result');
   const fromCurrencySelect = document.getElementById('from-currency');
   const toCurrencySelect = document.getElementById('to-currency');
   const apiKey = '69044ae2693e409eb5eb10f2548f6fd0'; 
   const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
 
   try {
     const response = await fetch(apiUrl);
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     const data = await response.json();
     const currencies = data.rates;
     populateCurrencySelect(fromCurrencySelect, currencies);
     populateCurrencySelect(toCurrencySelect, currencies);
    //  console.log(fromCurrencySelect);
 
     form.addEventListener('submit', async (event) => {
       event.preventDefault();
 
       const amount = document.getElementById('amount').value;
       const fromCurrency = fromCurrencySelect.value;
       const toCurrency = toCurrencySelect.value;
 
       try {
         const response = await fetch(apiUrl);
         if (!response.ok) {
           throw new Error('Network response was not ok');
         }
         const data = await response.json();
         const fromRate = data.rates[fromCurrency];
         const toRate = data.rates[toCurrency];
 
         if (fromRate && toRate) {
           const rate = toRate / fromRate;
           const convertedAmount = (amount * rate).toFixed(2);
 
           resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
         } else {
           resultDiv.textContent = 'Currency not available.';
         }
       } catch (error) {
         console.error('Error fetching data:', error);
         resultDiv.textContent = 'Error fetching conversion rate.';
       }
     });
     console.log(data.rates);
     
 
   } catch (error) {
     console.error('Error fetching currencies:', error);
     resultDiv.textContent = 'Error fetching currency data.';
   }
 });
 function populateCurrencySelect(selectElement, currencies) {
   Object.keys(currencies).forEach(currency => {
     const option = document.createElement('option');
     option.value = currency;
     option.textContent = currency;
     selectElement.appendChild(option);
   });
 }
 