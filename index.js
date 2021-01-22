// list of tickers is 
var banks = ['jpm', 'bac', 'wfc', 'c', 'gs']



async function getData(ticker) {
    api_url = 'https://cloud.iexapis.com/stable/stock/' + ticker + '/batch?types=quote&token=pk_6591e91f712e4ab7b7e1eac1af451489';
    
    const response = await fetch (api_url);
    const data = await response.json();
    var price = (data.quote.latestPrice).toFixed(2).toString();
    return price;
}

refresh();

//var myVar = setInterval(refresh, 5000); refresh every 5 seconds 

async function refresh(){
    var output = await updateList(banks);
    document.getElementById('price').innerHTML = output;
}


async function updateList(tickers) {

    var outputString = ""

    for (i = 0; i < tickers.length; i++) {
        price = await getData(tickers[i]);
        // promise <state> = 'pending'
        
        if (price != 'error'){
            outputString = outputString + price + '\n';
        }
    }
    
    return outputString;
}

