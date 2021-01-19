const api_url = 'https://cloud.iexapis.com/stable/stock/tsla/batch?types=quote,news,chart&range=1m&last=10&token=pk_6591e91f712e4ab7b7e1eac1af451489'
             
async function getData() {
    const response = await fetch (api_url);
    const data = await response.json();
    console.log(data);
    console.log(data.quote.latestTime);
    console.log(data.quote.peRatio);

    let currentPrice = data.quote.latestPrice;


    //change will occur here too 
    document.getElementById("price").innerHTML = currentPrice.toString();

}

getData();

var myVar = setInterval(refresh, 1000);

function refresh(){
    getData();
}

