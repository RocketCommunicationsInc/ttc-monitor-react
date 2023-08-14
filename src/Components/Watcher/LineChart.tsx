import type { Mnemonic } from "@astrouxds/mock-data";
import Chart from "react-apexcharts";
import "./LineChart.css";

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
      background: "var(--color-background-base-default)",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    grid: {
      borderColor: "var(--color-border-interactive-default)",
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
        color: "var(--color-text-primary)",
      },
    },
    subtitle: {
      text: `${data.mnemonicId}`,
      align: "left" as "left",
      offsetX: 50,
      offsetY: 45,
      style: {
        fontSize: "12px",
        color: "var(--color-text-primary)",
      },
    },
    stroke: {
      width: [3, 3],
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: "var(--color-text-primary)",
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
        show: true,
        tickAmount: 11,
        decimalsInFloat: 0,
        min: 0,
        max: 110,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: true,
          color: "var(--color-text-primary)",
        },
        labels: {
          enabled: true,
          show: true,
          style: {
            colors: "var(--color-text-primary)",
          },
          // //@ts-expect-error
          // formatter: function (yLabels) {
          //   return yLabels.toFixed(0);
          // },
        },
        title: {
          style: {
            color: "var(--color-text-primary)",
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
      theme: "",
      //@ts-expect-error
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        return (
          '<span class="tooltip-box">' +
          series[seriesIndex][dataPointIndex] +
          "</span>"
        );
      },
      style: {
        fontSize: "12px",
        color: "var(--color-text-primary)",
      },
      shared: false,
      intersect: false,
      onDatasetHover: {
        highlightDataSeries: false,
      },
      marker: {
        show: false,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 100,
          borderColor: "var(--color-background-base-default)",
          strokeDashArray: 7,
          label: {
            borderColor: "var(--color-background-base-default)",
            position: "center",
            offsetY: 5,
            style: {
              color: "var(--color-text-primary)",
              background: "var(--color-background-surface-hover)",
            },
            text: "Upper Limit",
          },
        },
        {
          y: 20,
          borderColor: "var(--color-background-base-default)",
          strokeDashArray: 7,
          label: {
            borderColor: "var(--color-background-base-default)",
            position: "center",
            offsetY: 5,
            style: {
              color: "var(--color-text-primary)",
              background: "var(--color-background-surface-hover)",
            },
            text: "Lower Limit",
          },
        },
      ],
    },
  };

  const series = [
    {
      data: chartData,
    },
  ];

  return (
    <div className="line-chart">
      <Chart type="line" options={options} series={series} height="100%" />
    </div>
  );
};

export default LineChart;
