"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "../data.module.css";
import { parseToDDMMYYYY } from "@/app/utils/parseDateToDDMMYYYY";
import {
  ChartState,
  ReqWeatherData,
  WeatherDataArray,
} from "@/app/types/WeatherData";
import ChartJS  from "chart.js/auto";
import {optionsWithHighlight, options, HighlightLinePlugin} from "@/app/data/ChartOptions"
ChartJS.register(HighlightLinePlugin);
import WeatherDataHeading from "@/app/components/WeatherDataHeading";

function findFirstAndLastDates(
  data: ReqWeatherData[],
): { first: string; last: string } {
  if (data.length === 0) {
    return { first: "", last: "" };
  }

  const sortedData = data.sort((a, b) =>
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return {
    first: parseToDDMMYYYY(sortedData[0].timestamp),
    last: parseToDDMMYYYY(sortedData[sortedData.length - 1].timestamp),
  };
}

export default function GraphPage() {
  const [chartData, setChartData] = useState<ChartState>({
    temperature: { labels: [], datasets: [] },
    pressure: { labels: [], datasets: [] },
    humidity: { labels: [], datasets: [] },
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ first: "", last: "" });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/week");
        if (!response.ok) {
          setHasError(true);
          throw new Error("Failed to fetch data");
        }

        const data: WeatherDataArray = await response.json();
        if (!data || !data.data || data.data.length === 0) {
          setHasError(true);
          throw new Error("No data available");
        }
        console.log(data);
        const labels: string[] = data.data.map((item: {
          timestamp: string;
        }) => parseToDDMMYYYY(item.timestamp));
        const temperatureData = data.data.map((item: { temperature: string }) =>
          parseFloat(item.temperature)
        );
        const pressureData = data.data.map((item: { pressure: string }) =>
          parseFloat(item.pressure)
        );
        const humidityData = data.data.map((item: { humidity: string }) =>
          parseFloat(item.humidity)
        );

        setDateRange(findFirstAndLastDates(data.data));

        setChartData({
          temperature: {
            labels,
            datasets: [
              {
                label: "Temperature (°C)",
                data: temperatureData,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: false,
              },
            ],
          },
          pressure: {
            labels,
            datasets: [
              {
                label: "Pressure (hPa)",
                data: pressureData,
                borderColor: "rgb(235,178,54)",
                backgroundColor: "rgba(235, 178, 54, 0.2)",
                fill: false,
              },
            ],
          },
          humidity: {
            labels,
            datasets: [
              {
                label: "Humidity (%)",
                data: humidityData,
                borderColor: "rgb(75,192,130)",
                backgroundColor: "rgba(75,192,130,0.2)",
                fill: false,
              },
            ],
          },
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className={styles.pre}>Loading...</div>;
  if (hasError) return <div className={styles.pre}>No data available</div>;

  return (
    <main className={styles.main}>
      <WeatherDataHeading
        text={`Weather data series from ${dateRange.first} to ${dateRange.last}`}
      />
      <div className={styles.chartWrapper}>
        <div
          style={{ maxWidth: "800px", maxHeight: "400px", margin: "0 auto" }}
        >
          <Line data={chartData.temperature} options={optionsWithHighlight} />
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <div
          style={{ maxWidth: "800px", maxHeight: "400px", margin: "0 auto" }}
        >
          <Line data={chartData.pressure} options={options} />
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <div
          style={{ maxWidth: "800px", maxHeight: "400px", margin: "0 auto" }}
        >
          <Line data={chartData.humidity} options={options} />
        </div>
      </div>
    </main>
  );
}
