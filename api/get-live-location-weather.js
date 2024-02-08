const apikey = "7eff7b05d3ba44e986a00d09393b9d2d";
import * as fetchdata from './fetchData.js'
import * as weather from './weatherforecast.js'
export async function livelocation(){
    window.addEventListener("load", async () => {
        if (navigator.geolocation) {
            try {
                const position = await getCurrentPosition();
                let lon = position.coords.longitude;
                let lat = position.coords.latitude;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
                const data = await fetchdata.fetchData(url);
                const dat = new Date(data.dt);
                weather.weatherReport(data);
            } catch (error) {
                alert("Error occurred while fetching weather data:", error)
                // console.error("Error occurred while fetching weather data:", error);
            }
        }
    });
    function getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
}