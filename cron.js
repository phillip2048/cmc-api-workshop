const axios = require('axios');
const cronJob = require('cron').CronJob;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'btc-prices.csv',
  header: [
    {id: 'date', title: 'Date'},
    {id: 'price', title: 'Price'}
  ]
});
const apiKey = 'PUT_YOUR_API_KEY_HERE';

const cryptoFetcher = axios.create({
  headers: {'X-CMC_PRO_API_KEY': apiKey}
});

async function fetchCrypto() {
  console.log('Date', new Date());
  const response = await cryptoFetcher.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC').catch(function(err){
    console.log('err.response.data', err.response.data);
  });

  if (!response){
    return;
  }

  if (response && response.data){
    const btcPrice = response.data.data.BTC.quote.USD.price;
    const btcUpdated = response.data.data.BTC.quote.USD.last_updated;

    csvWriter
      .writeRecords([{
        date: btcUpdated,
        price: btcPrice
      }])
      .then(()=> console.log('The CSV file was written successfully'));

    console.log('btcPrice', btcPrice);
    console.log('btcUpdated', btcUpdated);
  }
}

// Fetch BTC price from CMC API every 1-minute then save to CSV.
new cronJob('*/1 * * * *', fetchCrypto , null, true, 'Asia/Singapore');
