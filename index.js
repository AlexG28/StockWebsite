homePageTickers = [
    {name : 'banks', symbols: ['jpm', 'bac', 'wfc', 'c', 'gs']},
    {name: 'IT', symbols : ['aapl', 'goog', 'amzn', 'msft', 'fb']}
]


var banks = {name : 'banks', symbols: ['jpm', 'bac', 'wfc', 'c', 'gs']}
var IT = {name: 'IT', symbols : ['aapl', 'goog', 'amzn', 'msft', 'fb']}


async function getData(ticker) {
    api_url = 'https://cloud.iexapis.com/stable/stock/' + ticker + '/batch?types=quote&token=pk_6591e91f712e4ab7b7e1eac1af451489';
    
    const response = await fetch (api_url);
    const data = await response.json();
    console.log(data);
    var price = (data.quote.latestPrice).toFixed(2).toString();
    var companyName = data.quote.companyName.toString();
    return [price,companyName];
}

refresh(homePageTickers);

//var myVar = setInterval(refresh(banks), 5000); refresh every 5 seconds 

async function refresh(tickers){

    const tableBody = document.getElementById('tableData');
    let dataHtml = ``;
    for (j = 0; j < tickers.length; j++)
    {
        var output = await updateList(tickers[j].symbols);
        
        dataHtml += `
            <thread>
                <tr>
                    <th>${tickers[j].name}</th>
                    <th>Ticker</th>
                    <th>Price</th>
                </tr>
            </thread>
        
        `;
        for (i = 0; i < output.length; i++) {
            dataHtml += `<tr><td>${output[i].name}</td> <td>${output[i].ticker.toUpperCase()}</td>  <td>${output[i].price}</td> </tr>`;
        }
    }

    tableBody.innerHTML = dataHtml;
}


async function updateList(tickers) {

    var outputArray = [];

    for (i = 0; i < tickers.length; i++) {
        data = await getData(tickers[i]);
            
        temparray = {'ticker' : tickers[i] , 'price' : data[0], 'name' : data[1]};
        outputArray.push(temparray);
    }
    
    return outputArray;
}

