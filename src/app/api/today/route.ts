import {ReqWeatherData, WeatherDataArray} from "@/app/types/WeatherData";

export async function GET() {
    const date = new Date();

    const dateString = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" +
        date.getDate().toString().padStart(2, '0');

    const res = await fetch(
        process.env.URL + `/history?date=${dateString}`,
    );
    console.log(process.env.URL + `/history?date=${dateString}`)
    const data: ReqWeatherData[] = await res.json();
    if (data[0].error) {

        return Response.json({status: 400});
    }
    const weatherData: WeatherDataArray = {
        data,
        status: 200,
    };

    return Response.json(weatherData);
}
