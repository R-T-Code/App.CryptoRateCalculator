class UI{
    constructor() {
        this.init();
    }
    init(){
        this.printCryptoCurrencies();
    }

    // Prints the <options> for the form
    printCryptoCurrencies(){
        cryptoAPI.getCryptoCurrenciesList()
            .then(data => {
                const cryptoCurrencies = data.cryptoCurrencies;
                // Build the <select> from the REST API
                const select = document.getElementById('cryptocurrency');
                
                cryptoCurrencies.forEach(currency => {
                    // Add the <option>
                    const option = document.createElement('option');
                    option.value = currency.id;
                    option.appendChild(document.createTextNode(currency.name));
                    select.appendChild(option);
                });
            })
    }

    // Prints a message, 2 parameters, message and css classes
    printMessage(message, className){
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));

        const messagesDiv = document.querySelector('.messages');
        messagesDiv.appendChild(div);

        // Remove the message
        setTimeout(() => {
            document.querySelector('.messages div').remove();
        }, 3000);
    }

    // Prints the result of the valuation / rate
    displayResult(result, currency){
        
        // Read the currency
        let currencyName;

        currencyName = 'price_' + currency.toLowerCase();
        
        // Read the result form the object
        const value = result[currencyName];

        // Remove the previous result
        const prevResult = document.querySelector('#result > div');
        if(prevResult){
            prevResult.remove();
        }

        let HTMLTemplate = '';
        HTMLTemplate += `
            <div class="card cyan darken-3">
                <div class="card-content white-text">
                    <span class="card-title">Result</span>
                    <p>The price of ${result.name} in ${currency} is ${value}$</p>
                    <p>Last Hour: ${result.percent_change_1h} %</p>
                    <p>Last Day: ${result.percent_change_24h} %</p>
                    <p>Last 7 Days: ${result.percent_change_7d} %</p>
                </div>
            </div>
        `;

        // Print the spinner 
        this.showSpinner();

        // After 3s print the result and remove the spinner
        setTimeout(() => {
            // Print the result
            const divResult = document.querySelector('#result');
            divResult.innerHTML = HTMLTemplate;
            
            // Hide the spinner
            document.querySelector('.spinner img').remove();
        }, 3000);


        
    }

    // Prints the Spinner
    showSpinner(){
        const spinnertGIF = document.createElement('img');
        spinnertGIF.src = 'img/spinner.gif';
        document.querySelector('.spinner').appendChild(spinnertGIF);
    }
}