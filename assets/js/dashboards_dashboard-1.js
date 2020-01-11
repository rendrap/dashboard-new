$(function() {

  // https://stackoverflow.com/questions/47924780/like-icon-colour-on-click
  /* when a user clicks, toggle the 'is-animating' class */
  $(".heart").on('click touchstart', function() {
      $(this).toggleClass('is_animating');
      $(this).toggleClass('liked');
  });

  /*when the animation is over, remove the class*/
  $(".heart").on('animationend', function() {
      $(this).toggleClass('is_animating');
  });

  // Adjust MyTodos header border visibility on icon-add click
  $('#collapseTodos').on('show.bs.collapse', function () {
    $('#todosHeader').addClass('border-0');
  })

  $('#collapseTodos').on('hide.bs.collapse', function () {
    $('#todosHeader').removeClass('border-0');
  })


// Drag&Drop

  dragula(Array.prototype.slice.call(document.querySelectorAll('.task-list')), {
    moves: function (el, container, handle) {
      return handle.classList.contains('task-list-handle');
    }
  });

// Wrap charts
  $('.chartjs-wrap').each(function() {
    $(this).wrap($('<div style="height:' + this.getAttribute('height') + 'px"></div>'));
  });

  var ctx = document.getElementById('chart-graph').getContext("2d");

  var data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label:           'Missing assets value',
      data:            [226043, 220000, 250000, 160000, 210000, 219000, 280000],
      lineTension: 0.4,
      borderWidth: 2,
      backgroundColor: 'rgba(233, 30, 99, 0.3)',
      borderColor:     '#E91E63',
      pointBackgroundColor: 'rgba(255, 255, 255, 0.99)',
      pointBorderWidth: 2,
      pointHoverRadius: 4,
      pointHoverBackgroundColor: 'rgba(233, 30, 99, 1)',
      pointHoverBorderColor: 'rgba(233, 30, 99, .4)',
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      spanGaps: false
    }],
  };

  var options = {
    animation: false,
    legend: {display: false},
    maintainAspectRatio: false,
    responsive: true,
    responsiveAnimationDuration: 0,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          padding: 5,
          callback: function(value, index, values) {
            if(parseInt(value) >= 1000){
              return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
              return '$' + value;
            }
          }
        }
      }]
    }
  };

  var graphChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });

  function resizeCharts() {
    graphChart.resize();
  }

  // Initial resize
  resizeCharts();

  // For performance reasons resize charts on delayed resize event
  window.layoutHelpers.on('resize.charts-demo', resizeCharts);


  // Local API endpoint
  // const api_url = 'http://localhost:3000/monthly';
  const api_url = 'https://monthly-data-server.glitch.me/monthly';
  async function getData() {
    const response = await fetch(api_url);
    const api_data = await response.json();
    graphChart.data.datasets[0].data = api_data.datasets[0].data;
    graphChart.data.labels = api_data.labels;

    console.table([data.labels, data.datasets[0].data]);

    // Outputing pretty JSON-style :
    console.log(JSON.stringify(api_data, undefined, 2));

    // Outputing compact JSON-style :
    // console.log(JSON.stringify(api_data));
    return api_data;
  }

  setInterval(function() {
    getData().catch(err => {
        console.log("Unable to get chart data from server", err);
      });

    graphChart.update();
  }, 3500);

});