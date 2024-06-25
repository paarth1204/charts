import dynamic from "next/dynamic";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { PlotlyWrapperProps } from "./types/PlotlyTypes";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const defaultLayout = {
  title: {
    text: "Title not available",
    x: 0.02,
    y: 0.96,
    xanchor: "left",
    yanchor: "top",
    font: {
      size: 16,
      color: "#000",
      weight: "bold",
    },
  },
  xaxis: {
    tickangle: -45,
    automargin: true,
  },
  yaxis: {},
  margin: {
    l: 50,
    r: 20,
    b: 100,
    t: 50,
    pad: 4,
  },
  hoverlabel: {
    bgcolor: "white",
    font_size: 12,
    padding: 10,
  },
  modebar: {
    orientation: "v",
    bgcolor: "#f0f0f0",
  },
};

const defaultConfig = {
  displaylogo: false,
  modeBarButtonsToRemove: ["pan2d", "pan3d", "select2d", "lasso2d", "zoom3d"],
};

const PlotlyWrapper: React.FC<PlotlyWrapperProps> = (props) => {
  const { data, layout, config, style, className } = props;
  const [loading, setLoading] = useState(true);
  const mergedLayout = { ...defaultLayout, ...layout };
  const mergedConfig = { ...defaultConfig, ...config };

  return (
    <div className={className}>
      {/* {loading && <LoadingCentered />} */}
      <Plot
        data={data}
        layout={mergedLayout}
        config={mergedConfig}
        useResizeHandler
        style={{ width: "100%", height: "100%", ...style }}
        onInitialized={() => setLoading(false)}
        onPurge={() => setLoading(true)}
      />
    </div>
  );
};

export default PlotlyWrapper;
