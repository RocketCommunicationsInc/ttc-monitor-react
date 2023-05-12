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

const randomNumber = () => Math.floor(Math.random() * 100);

const labels = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600];

const dataObj = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: Array(8)
        .fill(1)
        .map(() => randomNumber()),
      borderColor: "rgb(77, 172, 255)",
      pointRadius: 0,
      gridLines: {
        color: "white",
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
    layout: {
      padding: {
        top: 10,
        left: 10,
      },
    },
    //  scales: {
    //  xAxes: [{
    //       gridLines: {
    //          display: false,
    //          color: "white"
    //       }
    //    }],
    //    yAxes: [{
    //       gridLines: {
    //          display: true
    //       }
    //    }]
    //   }
    scales: {
      y: {
        max: 110,
        min: 0,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "IRON 4090",
        color: "white",
        align: "start",
        font: {
          size: 16,
        },
      },
      subtitle: {
        display: true,
        text: subtitle,
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
      annotation: {
        annotations: {
          upperThreshold: {
            type: "line" as ChartType,
            yMin: 100,
            yMax: 100,
            borderColor: "rgb(77, 172, 255)",
            borderWidth: 2,
            borderDash: [1, 2],
            label: {
              color: "#fff",
              content: "Upper Limit",
              display: true,
              backgroundColor: "#172635",
              font: "8px",
            },
          },
          lowerThreshold: {
            type: "line" as ChartType,
            yMin: 20,
            yMax: 20,
            borderColor: "rgb(77, 172, 255)",
            borderWidth: 2,
            borderDash: [1, 2],
            label: {
              color: "#fff",
              content: "Lower Limit",
              display: true,
              backgroundColor: "#172635",
              font: "8px",
            },
          },
        },
      },
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
