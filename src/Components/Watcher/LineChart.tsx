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
      offsetY: 10,
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
      offsetY: 45,
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
      labels: {
        style: {
          colors: "white",
        },
      },
      tooltip: {
        enabled: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        tickAmount: 10,
        max: 110,
        axisTicks: {
          show: false,
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
    ],
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
      fillSeriesColor: true,
      style: {
        fontSize: "12px",
        color: "black",
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },

      // theme: true,
      // shared: true,
      // followCursor: false,
      // intersect: false,
      // style: {
      //   fontSize: "12px",
      //   backgroundColor: "black",
      // },
      // onDatasetHover: {
      //   highlightDataSeries: false,
      // },
      marker: {
        show: false,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 100,
          borderColor: "#00E396",
          strokeDashArray: 2,
          // stroke: {
          //   show: true,
          //   curve: "smooth",
          //   lineCap: "butt",
          //   width: 2,
          //   dashArray: 0,
          // },
          label: {
            borderColor: "#00E396",
            position: "center",
            offsetY: 5,
            style: {
              color: "#fff",
              background: "#00E396",
            },
            text: "Upper Limit",
          },
        },
        {
          y: 20,
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            position: "center",
            offsetY: 5,
            style: {
              color: "#fff",
              background: "#00E396",
            },
            text: "Lower Limit",
          },
        },
      ],
    },
    // theme: {
    //   mode: "light" as "light",
    //   palette: "palette1" as "pallette1",
    //   monochrome: {
    //     enabled: false,
    //     color: "#255aee",
    //     shadeTo: "light" as "light",
    //     shadeIntensity: 0.65,
    //   },
    // },
  };

  const series = [
    {
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
