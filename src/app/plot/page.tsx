"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PieChart from "../@components/AppPlotly/PieChart";
import PlotlyWrapper from "../@components/AppPlotly/PlotlyWrapper";
import {
  AreaChartProps,
  BarLineChartProps,
  LineAreaChartProps,
  LineChartProps,
  MultiAreaChartProps,
  MultiLineChartProps,
  PieChartProps,
  ScatterChartProps,
  WaterfallChartProps,
} from "../@components/AppPlotly/types/PlotlyTypes";
import {
  barLineMock,
  lineAreaMock,
  scatterTestData,
  testData,
} from "../@components/AppPlotly/data";
import { formatCurrency } from "../@components/utils/formatCurrency";
import LineArea from "../@components/AppPlotly/charts/LineArea";

// Dynamically import Plotly component to ensure client-side rendering
const DynamicPlot = dynamic(() => import("react-plotly.js"), { ssr: false });

const GroupedBarChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dates = testData.map((point: { date: any }) => point.date);
  const ratios = testData.map((point: { ratio: any }) => point.ratio);
  const plotData: LineChartProps["data"] = [
    {
      x: dates,
      y: ratios,
      type: "scatter",
      mode: "lines",
      hovertemplate: `
      <b>Date:</b> %{x}<br>
      <b>Net Income:</b>${formatCurrency(+"%{y}", "en-GB", "GBP")}
      <extra></extra>
    `,
    },
  ];

  const layout = {
    title: "Test Line Chart",

    height: 400,
    width: 400,
    shapes: [
      {
        type: "line",
        x0: dates[0],
        x1: dates[dates.length - 1],
        y0: 0,
        y1: 0,
        line: {
          color: "red",
          width: 2,
        },
      },
    ],
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
    yaxis: {
      tickformat: `.${formatCurrency(0, "en-GB", "GBP").replace(
        /[0-9.,]/g,
        ""
      )}`,
    },
  };

  const pieValues = [14380226.2067765, 3642456.33422353];
  const pieLabels = ["Consulting Sales", "Commercial Sales"];

  const piePlotData: PieChartProps["data"] = [
    {
      values: pieValues,
      labels: pieLabels,
      type: "pie",
      textinfo: "label+percent",
      hole: 0.7,
      marker: {
        colors: ["#636EFA", "#EF553B"],
      },
      pull: 0.06,
    },
  ];

  const pieLayout = {
    title: {
      text: "Pie Chart with Dynamic Center Text",
    },
    height: 400,
    width: 400,
    showlegend: false,
    annotations: [
      {
        font: {
          size: 20,
          color: "white",
        },
        showarrow: false,
        text: `xyz`,
        x: 0.5,
        y: 0.5,
        xanchor: "center",
        yanchor: "middle",
        bgcolor: "#636EFA",
        bordercolor: "#636EFA",
        borderwidth: 2,
        opacity: 0.8,
      },
    ],
  };

  const waterfallData: WaterfallChartProps["data"] = [
    {
      x: [
        "Jan 22 EBITDA",
        "Sales Increase",
        "CoS Increase",
        "SG&A Decrease",
        "Jan 23 EBITDA",
      ],
      y: [-9010.764, 1192847.79, -719037.171, 499958.973, 964758.828],
      type: "waterfall",
      measure: ["absolute", "relative", "relative", "relative", "total"],
      text: [
        "-9,010.76",
        "1,192,847.79",
        "-719,037.17",
        "499,958.97",
        "964,758.83",
      ],
      textposition: "outside",
      width: 0.3,
    },
  ];

  const waterfallLayout = {
    title: { text: "EBITDA Waterfall Chart" },
    hovermode: "x", // Use hovermode 'x' for vertical hover line
    hoverlabel: {
      bgcolor: "white",
      bordercolor: "lightgray",
      font: {
        family: "Arial, sans-serif",
        size: 12,
        color: "black",
      },
    },
    xaxis: {
      showspikes: true,
      // spikemode: 'toaxis',
      spikecolor: "lightgray",
      spikethickness: 1,
      spikedash: "solid", // Smooth solid line
      spikemode: "across", // Show spike across the plot area
    },
    yaxis: {
      showspikes: false, // Only show spike on x-axis
    },
    height: 400,
    width: 600,
  };

  const months = lineAreaMock.map((point: { date: any }) => point.date);
  const value = lineAreaMock.map((point: { value: any }) => point.value);
  const percentage = lineAreaMock.map(
    (point: { percentage: any }) => point.percentage
  );

  const areaData: AreaChartProps["data"] = [
    {
      x: months,
      y: value,
      type: "scatter",
      mode: "lines",
      fill: "tozeroy",
      name: "Test Area",
      hovertemplate: `%{x}<br>
      <b>Sales:</b> £%{y:,.0f}
      <extra></extra>`,
    },
  ];

  const areaLayout = {
    title: "Area test",
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

  // const lineAreaData: LineAreaChartProps["data"] = [
  //   {
  //     x: months,
  //     y: value,
  //     type: "scatter",
  //     mode: "lines",
  //     fill: "tonexty",
  //     name: "Net Income",
  //     yaxis: "y1",
  //     hovertemplate: `
  //     <b>Date:</b> %{x}<br>
  //     <b>Net Income:</b> £%{y:,.0f}
  //     <extra></extra>
  //   `,
  //   },
  //   {
  //     x: months,
  //     y: percentage,
  //     type: "scatter",
  //     mode: "lines",
  //     name: "Net Income % of sales",
  //     yaxis: "y2",
  //     hovertemplate: `
  //      <b>Date:</b> %{x}<br>
  //      <b>Net Income % of sales:</b> %{y:,.0f}%
  //      <extra></extra>`,
  //   },
  // ];

  const lineAreaData = {
    x: months,
    y1: value,
    y2: percentage,
  };

  const lineAreaLayout = {
    title: "Line Area Plot",
  };
  // yaxis: {
  // title: "Net Income",
  // side: "left",
  //   },
  //   showLegend: false,
  //   yaxis2: {
  //     title: "Percentage",
  //     side: "right",
  //     overlaying: "y",
  //     showgrid: false,
  //     zeroline: false,
  //   },
  //   hovermode: "x unified",
  //   hoverlabel: {
  //     bgcolor: "white",
  //     bordercolor: "lightgray",
  //     font: {
  //       family: "Arial, sans-serif",
  //       size: 12,
  //       color: "black",
  //     },
  //   },
  // };

  const multiAreaData: MultiAreaChartProps["data"] = [
    {
      x: months,
      y: value,
      type: "scatter",
      mode: "lines",
      fill: "tonexty",
      name: "Net Income",
      yaxis: "y1",
    },
    {
      x: months,
      y: percentage,
      type: "scatter",
      mode: "lines",
      name: "Net Income % of sales",
      yaxis: "y2",
      fill: "tozeroy",
    },
  ];

  const multiAreaLayout = {
    title: "Multi Area Test",
    yaxis: { title: "Net Income", side: "left" },
    yaxis2: {
      title: "Percentage",
      side: "right",
      overlaying: "y",
      showgrid: false,
      zeroline: false,
    },
  };
  const multiLineData: MultiLineChartProps["data"] = [
    {
      x: months,
      y: value,
      type: "scatter",
      mode: "lines",
      name: "Net Income",
      yaxis: "y1",
    },
    {
      x: months,
      y: percentage,
      type: "scatter",
      mode: "lines",
      name: "Net Income % of sales",
      yaxis: "y2",
    },
  ];

  const multiLineLayout = {
    title: "Multi Line Test",
    yaxis: { title: "Net Income", side: "left" },
    yaxis2: {
      title: "Percentage",
      side: "right",
      overlaying: "y",
      showgrid: false,
      zeroline: false,
    },
  };

  const xData = scatterTestData.data.map((point) => point.growth);
  const yData = scatterTestData.data.map((point) => point.impact);
  const textValues = scatterTestData.data.map((point) => point.name);

  const scatterData: ScatterChartProps["data"] = [
    {
      x: xData,
      y: yData,
      type: "scatter",
      mode: "markers",
      marker: { color: "blue", size: 10 },
      text: textValues,
    },
  ];

  const scatterLayout = {
    title: "Growth vs Impact Scatter Plot",
    xaxis: { title: "Growth (%)" },
    yaxis: { title: "Impact" },
  };

  const datesBarLine = barLineMock.map((point) => point.date);
  const valueBarLine = barLineMock.map((point) => point.value);
  const percenyageBarLine = barLineMock.map((point) => point.percentage);

  const barColors = valueBarLine.map((value) => (value < 0 ? "red" : "blue"));

  const barLineData: BarLineChartProps["data"] = [
    {
      x: datesBarLine,
      y: valueBarLine,
      type: "bar" as const,
      name: "Sales",
      yaxis: "y1",
      marker: {
        color: barColors,
      },
      hovertemplate: `
      <b>Date:</b> %{x}<br>
      <b>Sales:</b> £%{y:,.0f}
      <extra></extra>
    `,
    },
    {
      x: datesBarLine,
      y: percenyageBarLine,
      type: "scatter" as const,
      mode: "lines" as const,
      name: "Percentage",
      yaxis: "y2",
      marker: {
        color: "#563443",
      },
      hovertemplate: `
      <b>Date:</b> %{x}<br>
      <b>Sales %:</b> %{y:,.0f}%
      <extra></extra>
    `,
    },
  ];

  const barLineLayout = {
    title: "Sales and Percentage Over Time",
    xaxis: { title: "Date" },
    yaxis: { title: "Sales", side: "left" },
    yaxis2: {
      title: "Percentage",
      overlaying: "y",
      side: "right",
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
  return (
    <>
      {isClient && (
        <>
          {/* <DynamicPlot
            data={[
              {
                type: "pie",
                values: [79.8, 20.2],
                labels: ["Commercial Sales", "Others"],
                hole: 0.7,
                marker: {
                  colors: ["#7F7F7F", "#C8C8C8"],
                },
                textinfo: "label+percent",
                insidetextorientation: "radial",
              },
            ]}
            layout={{
              width: 820,
              height: 440,
              title: "YTD - Sales Breakdown",
              font: {
                size: 14,
              },
              legend: {
                orientation: "h",
                yanchor: "bottom",
                y: 1.02,
                xanchor: "right",
                x: 1,
              },
            }}
          />
          <PieChart
            title="YTD -Sales Breakdown"
            labels={["Commercial Sales", "Others"]}
            values={[79.8, 20.2]}
          /> */}

          {/* <PlotlyWrapper
            data={plotData}
            layout={layout}
            type={"line"}
            className="m-5"
          />
          <PlotlyWrapper
            data={piePlotData}
            layout={pieLayout}
            type={"pie"}
            className="m-5"
          />
          <PlotlyWrapper
            type="waterfall"
            data={waterfallData}
            layout={waterfallLayout}
            config={{ responsive: true }}
            className="m-5"
          />
          */}
          {/* <PlotlyWrapper
            className="m-5"
            data={areaData}
            layout={areaLayout}
            type="area"
            // config={{ responsive: true }}
          /> */}
          {/* <PlotlyWrapper
            className="m-5"
            data={lineAreaData}
            layout={lineAreaLayout}
            type="line-area"
            config={{ responsive: true }}
          /> */}
          <LineArea data={lineAreaData} layout={lineAreaLayout} />
          {/* <PlotlyWrapper
            className="m-5"
            data={multiAreaData}
            layout={multiAreaLayout}
            type="multi-area"
            // config={{ responsive: true }}
          />
          <PlotlyWrapper
            className="m-5"
            data={multiLineData}
            layout={multiLineLayout}
            type="multi-line"
            // config={{ responsive: true }}
          />
          <PlotlyWrapper
            className="m-5"
            data={scatterData}
            layout={scatterLayout}
            type="scatter"
          />
          <PlotlyWrapper
            className="m-5"
            data={barLineData}
            layout={barLineLayout}
            type="bar-line"
          /> */}
        </>
      )}
    </>
  );
};

export default GroupedBarChart;
