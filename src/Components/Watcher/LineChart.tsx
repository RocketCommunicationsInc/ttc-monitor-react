import type { Mnemonic } from "@astrouxds/mock-data";
import Chart from "react-apexcharts";

type PropTypes = {
  data: Mnemonic;
  chartData: number[];
};

const LineChart = ({ data, chartData }: PropTypes) => {
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

  var options = {
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "IRON 4090",
      align: "left" as "left",
      margin: 20,
      offsetX: 50,
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "white",
      },
    },
    subtitle: {
      text: `${data.mnemonicId}`,
      align: "left" as "left",
      offsetX: 50,
      style: {
        fontSize: "12px",
        color: "white",
      },
    },
    stroke: {
      width: [3, 3],
    },
    xaxis: {
      categories: labels,
      title: {
        text: undefined,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "white",
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 600,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "white",
        },
        labels: {
          style: {
            colors: "white",
          },
        },
        title: {
          style: {
            color: "white",
          },
        },
      },
      {
        opposite: true,
        axisBorder: {
          show: true,
          color: "white",
        },
      },
    ],
    tooltip: {
      enabled: true,
      // shared: true,
      // followCursor: false,
      // intersect: false,
      // inverseOrder: false,
      // fillSeriesColor: false,
      // theme: false,
      // style: {
      //   fontSize: "12px",
      //   backgroundColor: "black",
      // },
      // onDatasetHover: {
      //   highlightDataSeries: false,
      // },
      // marker: {
      //   show: true,
      // },
      // fixed: {
      //   enabled: false,
      //   position: "topRight",
      //   offsetX: 0,
      //   offsetY: 0,
      // },
    },
    // legend: {
    //   // horizontalAlign: "left" as "left",
    //   offsetX: 40,
    // },
  };

  const series = [
    {
      name: "Line Chart",
      data: chartData,
    },
  ];

  return (
    <div>
      <Chart type="line" options={options} series={series} height="230%" />
    </div>
  );
};

export default LineChart;
