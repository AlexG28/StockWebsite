// list of tickers is 
//var banks = ['jpm', 'bac', 'wfc', 'c', 'gs']
var banks = {'name': 'Banks', 'symbols': ['jpm', 'bac', 'wfc', 'c', 'gs']}


async function getData(ticker) {
    api_url = 'https://cloud.iexapis.com/stable/stock/' + ticker + '/batch?types=quote&token=pk_6591e91f712e4ab7b7e1eac1af451489';
    
    const response = await fetch (api_url);
    const data = await response.json();
    console.log(data);
    var price = (data.quote.latestPrice).toFixed(2).toString();
    return price;
}

refresh();

//var myVar = setInterval(refresh, 5000); refresh every 5 seconds 

async function refresh(){
    var output = await updateList(banks['symbols']);
    //document.getElementById('price').innerHTML = output;
    
    // add the data into the table
    const tableBody = document.getElementById('tableData');
    let dataHtml = '';

    for (i = 0; i < output.length; i++) {
        dataHtml += `<tr> <td>${output[i].ticker}</td>  <td>${output[i].price}</td> </tr>`;
    }
    tableBody.innerHTML = dataHtml;
}


async function updateList(tickers) {

    var outputArray = [];

    for (i = 0; i < tickers.length; i++) {
        price = await getData(tickers[i]);
            
        temparray = {'ticker' : tickers[i] , 'price' : price};
        outputArray.push(temparray);
    }
    
    return outputArray;
}

