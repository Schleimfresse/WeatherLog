import { ReqWeatherData, WeatherDataArray } from "@/app/types/WeatherData";

export async function GET() {
  const res = await fetch("http://192.168.178.40:8080/week");
  const data: ReqWeatherData[] = await res.json();

  const weatherData: WeatherDataArray = {
    data,
    status: 200,
  };

  return Response.json(weatherData);
}
