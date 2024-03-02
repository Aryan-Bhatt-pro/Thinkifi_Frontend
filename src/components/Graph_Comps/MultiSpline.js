import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const MultiSpline = () => {
  const [traceVisibility, setTraceVisibility] = useState({
    trace1: true,
    trace2: true,
    trace3: true,
  });

  const toggleTraceVisibility = (traceKey) => {
    setTraceVisibility((prevVisibility) => ({
      ...prevVisibility,
      [traceKey]: !prevVisibility[traceKey],
    }));
  };

  const traces = [
    {
      key: 'trace1',
      data: {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
      },
      name: 'Line 1',
      
    },
    {
      key: 'trace2',
      data: {
        x: [1, 2, 3, 4],
        y: [16, 5, 11, 9],
      },
      name: 'Line 2',
    },
    {
      key: 'trace3',
      data: {
        x: [1, 2, 3, 4],
        y: [5, 12, 9, 14],
      },
      name: 'Line 3',
    },
  ];

  const visibleTraces = traces
    .filter((trace) => traceVisibility[trace.key])
    .map((trace) => ({
      ...trace.data,
      type: 'scatter',
      mode: 'lines',
      name: trace.name,
      line: {
        shape: 'spline'
      }

    }));

  // Layout configuration
  const layout = {
    title: 'Multi Spline Line Graph',
    xaxis: {
      title: 'X-axis Title',
    },
    yaxis: {
      title: 'Y-axis Title',
    },
  };

  return (
    <div>
      {traces.map((trace) => (
        <label key={trace.key}>
          <input
            type="checkbox"
            checked={traceVisibility[trace.key]}
            onChange={() => toggleTraceVisibility(trace.key)}
          />
          {trace.name}
        </label>
      ))}
      <Plot data={visibleTraces} layout={layout} />
    </div>
  );
};

export default MultiSpline;
