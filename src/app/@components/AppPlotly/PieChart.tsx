import React from "react";
import Plot from "react-plotly.js";

interface PieChartProps {
  title: string;
  labels: string[];
  values: number[];
}

const PieChart: React.FC<PieChartProps> = ({ title, labels, values }) => {
  const data = [
    {
      type: "pie",
      values,
      labels,
      hole: 0.7,
      marker: {
        colors: ["##a5aaff", "##9f6dfc", "##ffb249"],
        line: {
          color: "#a5aaff",
          width: 2,
        },
      },
      textinfo: "label+percent",
      insidetextorientation: "radial",
      textfont: {
        color: "#FFFFFF",
      },
    },
  ];

  const layout = {
    title: {
      text: title,
      font: {
        size: 14,
        color: "#FFFFFF",
      },
      x: 0.5,
    },
    paper_bgcolor: "#4D4D4D",
    plot_bgcolor: "#4D4D4D",
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: 1.02,
      xanchor: "right",
      x: 1,
      font: {
        color: "#FFFFFF",
      },
    },
  };

  return (
    <Plot
      data={data}
      layout={layout}
      useResizeHandler
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default PieChart;
