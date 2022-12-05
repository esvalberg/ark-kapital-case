import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { formatDate, formatDecimal } from "../helpers/formatHelper";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type DataSet = {
  backgroundColor: string;
  borderColor: string;
  hoverBackgroundColor: string;
  borderWidth: number;
  data: number[];
  label: string;
};

const BAR_COLORS = ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"];
const BAR_FILL_COLORS = ["rgba(54, 162, 235, 1)", "rgba(255,99,132,1)"];
const TEXT_COLOR = "#ffff";
const TOOLTIP_COLOR = "rgb(255,255,255, 0.2)";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const,
      labels: {
        font: {
          size: 18,
          family: "andale mono, monospace",
          weight: "bold",
        },
        color: TEXT_COLOR,
      },
    },
    tooltip: {
      enabled: true,
      position: "average" as const,
      caretPadding: 15,
      caretSize: 12,
      cornerRadius: 10,
      yAlign: "bottom" as const,
      backgroundColor: TOOLTIP_COLOR,
      footerFontStyle: "normal",
      padding: 8,
      titleFontSize: 25,
      bodyFontSize: 16,
      callbacks: {
        title: function (context: any) {
          return context[0].parsed.y
            ? `USD $: ${formatDecimal(context[0].parsed.y)}`
            : "No data";
        },
        label: function () {
          return "";
        },
        footer: function (context: any) {
          return `${formatDate(context[0].label)} - ${
            context[0].dataset.label
          }`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      beginAtZero: false,
      ticks: {
        color: TEXT_COLOR,
        font: {
          size: 16,
        },
      },
    },
    y: {
      grid: {
        display: true,
      },
      beginAtZero: true,
      ticks: {
        color: TEXT_COLOR,
        font: {
          size: 16,
        },
      },
    },
  },
};

const BarChart = (props: any) => {
  const { chartData } = props ?? null;

  if (!chartData || chartData === "loading") {
    const text = !chartData
      ? "Oh no! :( We couldn't find any data to display at the moment."
      : "Loading data...";
    return (
      <div className="bar-chart">
        <p className="bar-chart__disclaimer-no-data">{text}</p>
      </div>
    );
  }

  const { labels, dataSets } = props.chartData;
  const datasets = dataSets.map((set: DataSet, i: number) => {
    set.backgroundColor = BAR_COLORS[i];
    set.borderColor = BAR_FILL_COLORS[i];
    set.borderWidth = 2;
    set.hoverBackgroundColor = BAR_FILL_COLORS[i];

    return set;
  });

  return (
    <div className="bar-chart">
      <div className="bar-chart__header">
        <h2 className="bar-chart__heading">Cost of ads</h2>
      </div>
      <div className="bar-chart__data">
        <Bar options={options} data={{ labels, datasets }} />
      </div>
      <p>
        This graph visualizes Facebook's and Adword's monthly cost on ads in
        USD.
      </p>
    </div>
  );
};

export default BarChart;
