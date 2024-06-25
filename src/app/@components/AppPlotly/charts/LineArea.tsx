import React from "react";
import Plot from "react-plotly.js";
import { LineAreaChartProps } from "../types/PlotlyTypes";
import PlotlyWrapper from "../PlotlyWrapper";

interface PlotWrapperProps {
  data: any;
  layout: any;
  style?: React.CSSProperties;
  config?: any;
}

const lineAreaDataFn = (
  x: any[],
  y1: any[],
  y2: any[]
): LineAreaChartProps["data"] => [
  {
    x: x || [],
    y: y1 || [],
    type: "scatter",
    mode: "lines",
    fill: "tonexty",
    name: "Net Income",
    yaxis: "y1",
    hovertemplate: `
        <b>Date:</b> %{x}<br>
        <b>Net Income:</b> £%{y:,.0f}
        <extra></extra>
      `,
  },
  {
    x: x || [],
    y: y2 || [],
    type: "scatter",
    mode: "lines",
    name: "Net Income % of sales",
    yaxis: "y2",
    hovertemplate: `
        <b>Date:</b> %{x}<br>
        <b>Net Income % of sales:</b> %{y:,.0f}%
        <extra></extra>`,
  },
];

const lineAreaLayout = {
  title: "No Title",
  yaxis: {
    title: "Net Income",
    side: "left",
  },
  showLegend: false,
  yaxis2: {
    title: "Percentage",
    side: "right",
    overlaying: "y",
    showgrid: false,
    zeroline: false,
  },
  hovermode: "x unified",
  hoverlabel: {
    bgcolor: "white",
    bordercolor: "lightgray",
    font: {
      family: "Arial, sans-serif",
      size: 12,
      color: "black",
    },
  },
};

const LineArea: React.FC<PlotWrapperProps> = (props: PlotWrapperProps) => {
  const { data, layout, config, style } = props;
  const { x, y1, y2 } = data;
  const mergedLayout = { ...lineAreaLayout, ...layout };
  const lineAreaData = lineAreaDataFn(x, y1, y2);

  return (
    <PlotlyWrapper
      data={lineAreaData}
      layout={mergedLayout}
      config={config}
      style={style}
    />
  );
};

export default LineArea;
