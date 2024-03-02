import React from 'react';
import Plot from 'react-plotly.js';
// import axios from 'axios'
function SplineLine(props) {
  // Define your data and layout
  // data will be provided by props
  
  const data = [
    {
      x: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      y: props.tweet_data,
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        // shape: 'spline',
        width: props.width, // Set the line width here
        color: props.color, // You can also set the line color
      },
    },
  ];

  const layout = {
    title: 'Spline Line Chart',
    xaxis: { title: 'Months', range: [0, props.max_len]},
    yaxis: { title: props.title},
  };

  return (
    <div>
      <Plot data={data} layout={layout} />
    </div>
  );
}

export default SplineLine;
