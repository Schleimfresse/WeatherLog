"use client";
import { useEffect, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import styles from "../data.module.css";
import { parseToDDMMYYYY } from "@/app/utils/parseDateToDDMMYYYY";
import { ChartState, WeatherDataArray } from "@/app/types/WeatherData";
import {ChartOptions} from "chart.js/auto";
import WeatherDataHeading from "@/app/components/WeatherDataHeading";
import { parseToHHMM } from "@/app/utils/parseDateToHHMM";

export default function GraphPage() {
  const [chartData, setChartData] = useState<ChartState>({
    temperature: { labels: [], datasets: [] },
    pressure: { labels: [], datasets: [] },
    humidity: { labels: [], datasets: [] },
  });
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [hasError, setHasError] = useState(false);

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: {
            size: 16,
          },
        },
        onClick: null,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          color: "white",
          font: {
            size: 16,
          },
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
          color: "white",
          font: {
            size: 16,
          },
        },
        ticks: {
          color: "white",
        },
      },
    },
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/today");
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
        /*const labels: string[] = [
          "00:00",
          "00:30",
          "01:00",
          "01:30",
          "02:00",
          "02:30",
          "03:00",
          "03:30",
          "04:00",
          "04:30",
          "05:00",
          "05:30",
          "06:00",
          "06:30",
          "07:00",
          "07:30",
          "08:00",
          "08:30",
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
          "13:00",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
          "17:00",
          "17:30",
          "18:00",
          "18:30",
          "19:00",
          "19:30",
          "20:00",
          "20:30",
          "21:00",
          "21:30",
          "22:00",
          "22:30",
          "23:00",
          "23:30",
          "00:00",
        ];*/

        const labels = data.data.map((item: { timestamp: string; }) =>
            parseToHHMM(item.timestamp)
        );
        const temperatureData = data.data.map((item: { temperature: string }) =>
          parseFloat(item.temperature)
        );
        const pressureData = data.data.map((item: { pressure: string }) =>
          parseFloat(item.pressure)
        );
        const humidityData = data.data.map((item: { humidity: string }) =>
          parseFloat(item.humidity)
        );

        setDate(parseToDDMMYYYY(data.data[0].timestamp));
        console.log(labels)
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
      <WeatherDataHeading text={`Weather data from today (${date})`} />
      <div className={styles.chartWrapper}>
        <div
          style={{ maxWidth: "800px", maxHeight: "400px", margin: "0 auto" }}
        >
          <Line data={chartData.temperature} options={options} />
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
