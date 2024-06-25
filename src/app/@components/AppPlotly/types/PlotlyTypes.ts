import { Data, Layout, Config } from "plotly.js";

interface BasePlotProps {
  layout?: Partial<Layout>;
  config?: Partial<Config>;
  style?: React.CSSProperties;
  className?: string;
}

export interface LineChartProps extends BasePlotProps {
  type: "line";
  data: {
    x: number[];
    y: number[];
    type: "scatter";
    mode: "lines";
    hovertemplate: string;
  }[];
}

export interface PieChartProps extends BasePlotProps {
  type: "pie";
  data: {
    values: number[];
    labels: string[];
    type: "pie";
    hole?: number;
    insidetextorientation?: string;
    marker?: {
      colors: string[];
    };
    text?: string[];
    textinfo?: string;
    textposition?: string;
    pull?: number;
  }[];
}

export interface WaterfallChartProps extends BasePlotProps {
  type: "waterfall";
  data: {
    x: string[];
    y: number[];
    type: "waterfall";
    measure?: ("relative" | "total" | "absolute")[];
    text?: string[];
    textposition?: string;
    width?: number;
  }[];
}

export interface ScatterChartProps extends BasePlotProps {
  type: "scatter";
  data: {
    x: number[];
    y: number[];
    type: "scatter";
    mode: "markers" | "lines+markers" | "lines";
    marker?: {
      color?: string;
      size?: number;
      symbol?: string;
    };
    text: string[];
  }[];
}

export interface RadarChartProps extends BasePlotProps {
  type: "radar";
  data: {
    r: number[];
    theta: string[];
    type: "scatterpolar";
    fill?: "toself" | "none";
    marker?: {
      color?: string;
      size?: number;
    };
  }[];
}

export interface LineAreaChartProps extends BasePlotProps {
  // type: "line-area";
  data: {
    x: any[];
    y: any[];
    type: "scatter";
    mode: "lines";
    fill?: "tonexty" | "none" | "tozeroy" | undefined;
    name: string;
    yaxis?: string | undefined;
    hovertemplate: string;
  }[];
}
export interface MultiLineChartProps extends BasePlotProps {
  type: "multi-line";
  data: {
    x: any[];
    y: any[];
    type: "scatter";
    mode: "lines";
    name: string;
    yaxis?: string;
  }[];
}

export interface MultiAreaChartProps extends BasePlotProps {
  type: "multi-area";
  data: {
    x: any[];
    y: any[];
    type: "scatter";
    mode: "lines";
    fill: "none" | "tozeroy" | "tonexty";
    name: string;
    yaxis?: string;
  }[];
}

export interface AreaChartProps extends BasePlotProps {
  type: "area";
  data: {
    x: any[];
    y: any[];
    type: "scatter";
    mode: "lines";
    fill: "tozeroy";
    name: string;
    hovertemplate: string;
  }[];
}

export interface BarLineChartProps extends BasePlotProps {
  type: "bar-line";
  data: {
    x: any[];
    y: any[];
    type: "bar" | "scatter";
    mode?: "lines";
    name: string;
    yaxis?: string;
    marker?: {
      color?: string[] | string;
    };
    hovertemplate: string;
  }[];
}

export type PlotlyWrapperProps =
  | RadarChartProps
  | LineChartProps
  | PieChartProps
  | WaterfallChartProps
  | ScatterChartProps
  | LineAreaChartProps
  | AreaChartProps
  | MultiAreaChartProps
  | MultiLineChartProps
  | BarLineChartProps;
