import {useState} from 'react'
import {
  Chart as ChartJS,
  ChartType,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  SubTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import type { Mnemonic } from "@astrouxds/mock-data";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  SubTitle,
  Tooltip,
  Legend,
  annotationPlugin
);

const labels = [
  "0800",
  "0900",
  "1000",
  "1100",
  "1200",
  "1300",
  "1400",
  "1500",
  "1600",
];

const tooltipTitle = () => {
  return "";
};

type PropTypes = {
  data: Mnemonic;
  chartData: number[];
};



const LineChart = ({ data, chartData }: PropTypes) => {
  const [parentRendered, setParentRendered] = useState(false);

  useEffect(() => {
    setParentRendered(true);
  }, []);

  if (!parentRendered) return null
  const appContainer = document.getElementById("app-container");

  const isLightTheme = appContainer?.classList.contains("light-theme")
  const textColor = isLightTheme ? "black" : "white"
    //--color-data-visualization-6 : --color-data-visualization-8
  const dataLine = isLightTheme ? "#2b659b" : "#3a87cf"
  //--color-border-interactive-default : --color-border-interactive-muted 
  const gridLinesColor = isLightTheme ? "#005a8f" : "#2f7aa7"
    //--color-border-interactive-default : --color-border-interactive-muted 
  const annotationLinesColor = isLightTheme ? "#005a8f": "#2f7aa7" 
  //--color-background-base-default : --color-background-interactive-default
  const annotationBackgroundColor = isLightTheme ? "#eaeef4": "#005a8f" 


  const dataObj = {
    labels,
    datasets: [
      {
        label: "Value",
        data: chartData,
        borderColor: dataLine,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 16,
        left: 24,
        right: 24,
        bottom: 16,
      },
    },
    scales: {
      x: {
        fill: true,
        border: {
          display: true,
          color: textColor,
        },
        ticks: {
          color: textColor
        },
        scaleLabel: {
          display: true,
        },
      },
      y: {
        fill: true,
        border: {
          display: true,
          color: textColor,
        },
        grid: {
          color: gridLinesColor,
          drawTicks: false,
        },
        ticks: {
          color: textColor,
          padding: 7,
          stepSize: 10,
        },
        scaleLabel: {
          display: true,
        },
        min: 0,
        max: 110,
        autoSkip: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "            IRON 4090",
        color: textColor,
        align: "start",
        font: {
          size: 16,
        },
      },
      subtitle: {
        display: true,
        text: `               ${data.mnemonicId}`,
        color: textColor,
        align: "start",
        font: {
          size: 13,
          weight: "normal",
        },
        padding: {
          bottom: 25,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        yAlign: "bottom",
        displayColors: false,
        titleMarginBottom: 0,
        callbacks: {
          title: tooltipTitle,
        },
      },
      annotation: {
        annotations: {
          upperThreshold: {
            type: "line" as ChartType,
            yMin: 100,
            yMax: 100,
            borderColor: annotationLinesColor,
            borderWidth: 2.5,
            borderDash: [1, 2],
            label: {
              color: textColor,
              content: "Upper Limit",
              display: true,
              backgroundColor: annotationBackgroundColor,
              opacity: 0.5,
              font: {
                size: 10.5,
                weight: "normal",
              },
            },
          },
          lowerThreshold: {
            type: "line" as ChartType,
            yMin: 20,
            yMax: 20,
            borderColor: annotationLinesColor,
            borderWidth: 2.5,
            borderDash: [1, 2],
            label: {
              color: textColor,
              content: "Lower Limit",
              display: true,
              backgroundColor: annotationBackgroundColor,
              font: {
                size: 10.5,
                weight: "normal",
              },
            },
          },
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: false, //this is the point on the graph for tooltip
    },
  };

  return (
    <Line
      // @ts-expect-error
      options={options}
      data={dataObj}
    ></Line>
  );
};

export default LineChart;
