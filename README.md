# cmc-api-workshop

A simple example app for pulling data from CoinMarketCap free Pro API's.

![alt text](https://i.imgur.com/hMgZAi4.png)

# To install / run

1. Signup for a free CMC Pro API at https://coinmarketcap.com/api/
2. Git checkout this repo.
3. `npm install` dependencies.
4. Open `cron.js` and replace the string `PUT_YOUR_API_KEY_HERE` with your CMC API key.
5. In one terminal winodw: `node cron.js` to run the data poller.
6. In one terminal window: `node webserver.js`to run the web server and API.
7. In your web browser visit http://localhost:3000
