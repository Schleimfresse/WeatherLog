"use client";
import styles from "./page.module.css";
import { useWeather } from "@/app/context/WeatherContext";
import WeatherItem from "@/app/components/WeatherItem"; // Adjust path as necessary

export default function Home() {
  const weatherData = useWeather();

  return (
    <>
      <main className={styles.main}>
        <section className={styles.headerSection}>
          <div className={styles.currentWeather}>
            <WeatherItem
              label="Current temperature"
              value={weatherData?.temperature}
              className={styles.homeHeading}
            />
            <WeatherItem
              label="Current humidity"
              value={weatherData?.humidity}
              className={styles.subHeading}
            />
            <WeatherItem
              label="Current pressure"
              value={weatherData?.pressure}
              className={styles.subHeading}
            />
          </div>
          <div className={styles.weatherImg}>

          </div>
        </section>
      </main>
    </>
  );
}


/*

{weatherData?.img && (
              <object
                data={`/assets/${weatherData.img}.svg`}
                width="300"
                height="300"
              >
              </object>
            )}

 */