import { ChartData } from "chart.js/auto";

export type WeatherData = {
  temperature: string | null;
  pressure: string | null;
  humidity: string | null;
  timestamp: string | null;
  status: number;
};

export type ReqWeatherData = {
  temperature: string;
  pressure: string;
  humidity: string;
  timestamp: string;
  error?: string;
};

export type WeatherDataArray = {
  data: ReqWeatherData[];
  status: number;
};

export type ChartState = {
  temperature: ChartData<"line", number[], string>;
  pressure: ChartData<"line", number[], string>;
  humidity: ChartData<"line", number[], string>;
};
