var rainChart = document.getElementById('rainChart').getContext('2d');

var rainWeekChart = new Chart(rainChart, {
  type: 'line',
  data: {
    labels:dates,
    datasets:[{
      label:'Clouds in the Sky',
      data:cloudy,
      backgroundColor:'#858796',
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
                labelString: 'cloudy in ˚%'

            }
          }]
      },
      tooltips: {
        callbacks: {
          label: (item) => `${item.yLabel} % Cloudy`,
        },
      },
  }
});

