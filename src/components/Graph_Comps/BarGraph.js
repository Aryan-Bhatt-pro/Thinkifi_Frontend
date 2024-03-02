import React from "react";
import Plot from 'react-plotly.js';
const BarGraph = (props) => {
    // api call hogi
    // for color slider
    const data = [
        {
          x: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
          y: [10, 15, 13, 17],
          type: 'bar',
          marker: { color: props.color },
        },
      ];
      const layout = {
        title: 'Bar Graph Example',
        xaxis: { title: 'Categories' },
        yaxis: { title: 'Values' },
      };
    
      return (
        <div>
          <Plot data={data} layout={layout} />
        </div>
      );
}

export default BarGraph;