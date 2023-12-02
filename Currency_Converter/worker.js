

    // Use XMLHttpRequest to fetch exchange rates from the API

    // your-key: 36899bc783ee7e638eb2e844
    // const xhr = new XMLHttpRequest();
    // const url = `https://v6.exchangerate-api.com/v6/36899bc783ee7e638eb2e844/pair/${fromCurrency}/${toCurrency}/${amount}`;
    // xhr.open('GET', url, true);
    self.addEventListener('message', (event) => {

        const { fromCurrency, toCurrency, units } = event.data;
    
        const apiURL = ` https://v6.exchangerate-api.com/v6/36899bc783ee7e638eb2e844/pair/${fromCurrency}/${toCurrency}/${units}`;
    
     
    
        const xhr = new XMLHttpRequest();
    
        xhr.open('GET', apiURL);
    
        xhr.onload = () => {
    
            if (xhr.status === 200) {
    
                const response = JSON.parse(xhr.responseText);
    
                const result = response.conversion_result;
    
                self.postMessage({ fromCurrency, toCurrency, result });
    
            }
    
        };
    
        xhr.send();
    
    });