// list of tickers is 
//var banks = ['jpm', 'bac', 'wfc', 'c', 'gs']
var banks = ['tsla', 'jpm']


async function getData(ticker) {
    api_url = 'https://cloud.iexapis.com/stable/stock/' + ticker + '/batch?types=quote&token=pk_6591e91f712e4ab7b7e1eac1af451489';
    

    const response = await fetch (api_url);
    const data = await response.json();
    //console.log(data);
    var price = (data.quote.latestPrice).toString();


    let myPromise = new Promise(function(myResolve, myReject) {
        
        if (price != '') {
          myResolve("OK");
        } else {
          myReject("Error");
        }
    });
      
    myPromise.then(
        function(value) {return price;},
        function(error) {alert('It didnt work');}
    );


    
}

refresh();

//var myVar = setInterval(refresh, 5000);

function refresh(){
    var text1 = updateList(banks);
    document.getElementById('price').innerHTML = text1;
    //getData('tsla');
}


function updateList(tickers) {

    var outputString = ""

    for (i = 0; i < tickers.length; i++) {
        outputString = outputString + getData(tickers[i]) + '\n';
    }
    console.log(outputString);
    return outputString;
}

