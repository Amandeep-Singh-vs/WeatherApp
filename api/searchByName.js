import * as fetchdata from './fetchData.js'
import * as weather from './weatherforecast.js'
const apikey = "7eff7b05d3ba44e986a00d09393b9d2d";
export async function searchByCity()
{
    const place = document.getElementById('input').value;
    const urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`;
    console.log(urlsearch)
    try {
        const data = await fetchdata.fetchData(urlsearch);
        console.log(data);
        weather.weatherReport(data);
    } catch (error) {
        alert("Error occurred while fetching weather data:", error)
        // console.error("Error occurred while searching by city:", error);
    }

    document.getElementById('input').value = '';
}