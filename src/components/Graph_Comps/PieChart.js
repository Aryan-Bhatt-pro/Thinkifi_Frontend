import React from 'react';
import Plot from 'react-plotly.js';

const PieChart = () => {
  // Sample data for the pie chart
  const data = [
    {
      labels: ['Category A', 'Category B', 'Category C'],
      values: [30, 40, 30],
      type: 'pie',
    },
  ];

  // Layout configuration for the pie chart
  const layout = {
    title: 'Sample Pie Chart',
  };

  return (
    <div>
      <Plot
        data={data}
        layout={layout}
      />
    </div>
  );
};

export default PieChart;
