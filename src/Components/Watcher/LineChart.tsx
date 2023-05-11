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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

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

const labels = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600];


const randomNumber = () => Math.floor(Math.random() * 100);

type PropTypes = {
  subtitle: string
}

const LineChart = ({subtitle}: PropTypes) => {
  const dataObj = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: Array(9).fill(1).map(()=> randomNumber()),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
  };

const options = {
  responsive: true,
  scales: {
    y: {
      max: 110,
      min: 0,
      ticks: {
          stepSize: 10
      }
    }
  },
  plugins: {
    legend: {
        display: false
    },
    title: {
      display: true,
      text: 'IRON 4090',
    },
    subtitle: {
      display: true,
      text: subtitle
    },
    annotation: {
      annotations: {
        upperThreshold: {
          type: 'line' as ChartType,
          yMin: 100,
          yMax: 100,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          label: {
            color: "#fff",
            content: "Upper Limit",
            display: true
          },
        },
        lowerThreshold: {
          type: 'line' as ChartType,
          yMin: 20,
          yMax: 20,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          label: {
            color: "#fff",
            content: "Lower Limit",
            display: true
          },
        }
      }
    }
  },
};


  return (
    <Line
      // @ts-expect-error
      options={options}
      data={dataObj} 
    >
    </Line>
  )
};

export default LineChart;
