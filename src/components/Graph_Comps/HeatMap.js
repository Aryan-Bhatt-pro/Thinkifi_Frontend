import React from "react";
import Plot from 'react-plotly.js';
const HeatMap = (props) => {
  const data = [
    {
      z: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ],
      type: "heatmap",
    },
  ];

  const layout = {
    width: 500,
    height: 400,
    title: "Heatmap Chart",
  }

  return (
    <div>
      <h2>Heatmap Example</h2>
      <Plot
        data={data}
        layout={layout}
      />
    </div>
  );
};

export default HeatMap;
