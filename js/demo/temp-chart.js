var tempChart = document.getElementById('tempChart').getContext('2d');

var tempWeekChart = new Chart(tempChart, {
  type: 'bar',
  data: {
    labels:dates,
    datasets:[{
      label:'Temperature',
      data:temps,
      backgroundColor:'#1cc88a',
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
                labelString: 'Temperature in ˚F'

            }
          }]
      },
      tooltips: {
        callbacks: {
          label: (item) => `${item.yLabel} ˚F`,
        },
      },
  }
});

