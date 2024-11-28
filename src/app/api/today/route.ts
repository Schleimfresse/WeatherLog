import { ReqWeatherData, WeatherDataArray } from "@/app/types/WeatherData";

export async function GET() {
  const date = new Date();

  const dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
    date.getDate();

  const res = await fetch(
    `http://192.168.178.40:8080/history?date=${dateString}`,
  );
  const data: ReqWeatherData[] = await res.json();

  const weatherData: WeatherDataArray = {
    data,
    status: 200,
  };

  return Response.json(weatherData);
}
