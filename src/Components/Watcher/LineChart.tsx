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

const randomNumber = () => Math.floor(Math.random() * 110);

const labels = ["0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600"];

const tooltipTitle = () => {
  return "";
};

const dataObj = {
  labels,
  datasets: [
    {
      label: "Value",
      data: Array(9)
        .fill(1)
        .map(() => randomNumber()),
      borderColor: "rgb(77, 172, 255)",
      pointRadius: 0,
      gridLines: {
        color: "#455D6E",
        display: true,
      },
    },
  ],
};

type PropTypes = {
  subtitle: string;
};

const LineChart = ({ subtitle }: PropTypes) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 5,
        left: 3,
      },
    },
    scales: {
      x: {
        fill: true,
        border: {
          display: true,
          color: "white",
        },
        ticks: {
          color: "white",
        },
        scaleLabel: {
          display: true,
        },
      },
      y: {
        fill: true,
        border: {
          display: true,
          color: "white",
        },
        grid: {
          color: "grey",
          drawTicks: false,
        },
        // title: {
        //   display: true,
        //   color: "white",
        //   text: "Volts",
        // },
        ticks: {
          color: "white",
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
        color: "white",
        align: "start",
        font: {
          size: 16,
        },
      },
      subtitle: {
        display: true,
        text: `               ${subtitle}`,
        color: "white",
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
            borderColor: "white",
            borderWidth: 2.5,
            borderDash: [1, 2],
            label: {
              color: "#fff",
              content: "Upper Limit",
              display: true,
              backgroundColor: "#172635",
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
            borderColor: "white",
            borderWidth: 2.5,
            borderDash: [1, 2],
            label: {
              color: "#fff",
              content: "Lower Limit",
              display: true,
              backgroundColor: "#172635",
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
