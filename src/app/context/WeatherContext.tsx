"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { WeatherData } from "@/app/types/WeatherData";

type WeatherContextType = WeatherData | null;

const WeatherContext = createContext<WeatherContextType>(null);

interface WeatherProviderProps {
  children: ReactNode;
}

export function WeatherProvider({ children }: WeatherProviderProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeatherData() {
      const res = await fetch("/api/current");
      return await res.json();
    }
    fetchWeatherData().then((data) => setWeatherData(data));
  }, []);

  return (
    <WeatherContext.Provider value={weatherData}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
