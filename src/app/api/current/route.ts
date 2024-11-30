import { ReqWeatherData, WeatherData } from "@/app/types/WeatherData";

export async function GET() {
  const res = await fetch(process.env.URL + "/current");
  const data: ReqWeatherData = await res.json();

  const weatherData: WeatherData = {
    temperature: data.temperature + " °C",
    pressure: data.pressure + " hPa",
    humidity: data.humidity + "%",
    timestamp: data.timestamp,
    status: 200,
  };

  return Response.json(weatherData);
}
