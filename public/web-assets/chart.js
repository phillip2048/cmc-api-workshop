google.charts.load('current', {'packages':['corechart']});
// When google charts is loaded we can load the data in.
google.charts.setOnLoadCallback(drawChart);

async function fetchDataFromCSV(){
  console.log('fetch');
  const myBitcoins = parseFloat(document.getElementById('btc-amnt').value);
  let formattedData = [];
  const fetchedData = await jQuery.ajax({
    dataType: "json",
    url: '/api/chart.json'
  });
  fetchedData.forEach( (row) =>{
    formattedData.push([new Date(row.Date), parseFloat(row.Price) * myBitcoins]);
  });
  return formattedData;
}

// Fetch the data and draws the chart to the page.
async function drawChart() {
  const fetchedAndFormattedData = await fetchDataFromCSV();
  fetchedAndFormattedData.unshift(['Time', 'Value']);
  var data = google.visualization.arrayToDataTable(fetchedAndFormattedData);

  var options = {
    title: 'My Crypto Portfolio',
    curveType: 'function',
    legend: { position: 'bottom' },
    explorer: {
      actions: ['dragToZoom', 'rightClickToReset'],
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 4.0
    },
    interpolateNulls: true,
    vAxis: {
      format: 'currency',
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart'));

  chart.draw(data, options);
}

// Refresh graph every 60 seconds.
setTimeout(drawChart, 60 * 1000);

// Recalculate graph if my holdings change.
jQuery('#btc-amnt').on('keypress', function (e) {
  if(e.which === 13){
    drawChart();
  }
});
