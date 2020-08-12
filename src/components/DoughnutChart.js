import Chart from 'chart.js';
import React, {useEffect, useState} from 'react';

class DoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [10, 20, 30]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
      },
    });
  }

  render() {
    return (
      <canvas ref={this.chartRef} />
    );
  }
}

export default DoughnutChart;