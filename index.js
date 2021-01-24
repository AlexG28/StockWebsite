// list of tickers is 
//var banks = ['jpm', 'bac', 'wfc', 'c', 'gs']
var banks = {'symbols': ['jpm', 'bac', 'wfc', 'c', 'gs']}
var IT = {'symbols' : ['aapl', 'goog', 'amzn', 'msft', 'fb']}


var button1 = document.getElementById("ITrefresh");
button1.onclick = function (IT) {
    refresh(IT);
}




async function getData(ticker) {
    api_url = 'https://cloud.iexapis.com/stable/stock/' + ticker + '/batch?types=quote&token=pk_6591e91f712e4ab7b7e1eac1af451489';
    
    const response = await fetch (api_url);
    const data = await response.json();
    console.log(data);
    var price = (data.quote.latestPrice).toFixed(2).toString();
    var companyName = data.quote.companyName.toString();
    return [price,companyName];
}

refresh(banks);

//var myVar = setInterval(refresh, 5000); refresh every 5 seconds 

async function refresh(tickers){
    var output = await updateList(tickers['symbols']);
    //document.getElementById('price').innerHTML = output;
    
    // add the data into the table
    const tableBody = document.getElementById('tableData');
    let dataHtml = '';

    for (i = 0; i < output.length; i++) {
        dataHtml += `<tr><td>${output[i].name}</td> <td>${output[i].ticker.toUpperCase()}</td>  <td>${output[i].price}</td> </tr>`;
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

