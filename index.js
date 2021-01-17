const api_url = 'https://cloud.iexapis.com/stable/stock/amzn/batch?types=quote,news,chart&range=1m&last=10&token=pk_6591e91f712e4ab7b7e1eac1af451489'
             
async function getData() {
    const response = await fetch (api_url);
    const data = await response.json();
    console.log(data);
    console.log(data.quote.latestTime);
    console.log(data.quote.peRatio);

    let currentPrice = data.quote.close;

}

getData();


