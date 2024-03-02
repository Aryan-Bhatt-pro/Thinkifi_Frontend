import React from 'react';
import Plot from 'react-plotly.js';

const SunburstChart = () => {
  const data = [
    {
      type: 'sunburst',
      labels: ['Parent', 'Child 1', 'Child 2', 'Grandchild 1', 'Grandchild 2', 'Grandchild 3'],
      parents: ['', 'Parent', 'Parent', 'Child 1', 'Child 2', 'Child 2'],
      values: [10, 20, 30, 40, 50, 60],
    },
  ];

  const layout = {
    margin: { l: 0, r: 0, b: 0, t: 0 },
  };

  return (
    <div>
      <Plot data={data} layout={layout} />
    </div>
  );
};

export default SunburstChart;
