const Hapi = require('hapi');
const Path = require('path');
const csv = require('csv-parser');
const fs = require('fs');

const start = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 3000,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  });

  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return h.file('index.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/web-assets/index.css',
    handler: function (request, h) {
      return h.file('web-assets/index.css');
    }
  });

  server.route({
    method: 'GET',
    path: '/web-assets/chart.js',
    handler: function (request, h) {
      return h.file('web-assets/chart.js');
    }
  });

  server.route({
    method: 'GET',
    path: '/api/chart.json',
    handler: function (request, h) {
      return new Promise(function(resolve, reject) {
        let arrayData = [];
        fs.createReadStream('btc-prices.csv')
          .pipe(csv())
          .on('data', (row) => {
            arrayData.push(row)
          })
          .on('end', () => {
            console.log('CSV file successfully processed');
            resolve(JSON.stringify(arrayData));
          });
      });
    }
  });

  await server.start();

  console.log('Server running at:', server.info.uri);
};

start();
