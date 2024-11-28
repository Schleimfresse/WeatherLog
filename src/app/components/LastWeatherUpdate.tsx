"use client";
import {useWeather} from "@/app/context/WeatherContext";
import styles from "./styles.module.css";

const formatDate = (dateString: string) => {
  const date = new Date(dateString); // Parse the date string
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export default function LastWeatherUpdate() {
  const weatherData = useWeather();

  return (
    <div className={styles.lastUpdate}>
      {weatherData?.timestamp
        ? `Last update: ${formatDate(weatherData?.timestamp)}`
        : "Loading..."}
    </div>
  );
}
