
var humidityChart = document.getElementById('humidityChart').getContext('2d');

var humidWeekChart = new Chart(humidityChart, {
  type: 'line',
  data: {
    labels:dates,
    datasets:[{
      label:'Humidity',
      data:humid,

      backgroundColor:'pink',
    }],
  },
  options:{
      legend:{
          display:false,
      },
      layout:{
          padding:{
              bottom:100,
          }   
      },
      scales:{
          yAxes:[{
              ticks:{
                  beginAtZero:true,
              },
              scaleLabel:{
                display: true,
                labelString: 'Humidity in %'

            }
          }]
      },
      tooltips: {
        callbacks: {
          label: (item) => `${item.yLabel} %`,
        },
      },
  }
});

