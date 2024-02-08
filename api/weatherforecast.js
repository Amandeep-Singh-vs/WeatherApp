const apikey = "7eff7b05d3ba44e986a00d09393b9d2d";
import * as fetchdata from './fetchData.js'
export async function weatherReport(data) {
    const urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apikey}`;

    try {
        const forecast = await fetchdata.fetchData(urlcast);
        hourForecast(forecast);
        dayForecast(forecast);

        console.log(data);
        document.getElementById('city').innerText = data.name + ', ' + data.sys.country;
        console.log(data.name, data.sys.country);

        console.log(Math.floor(data.main.temp - 273));
        document.getElementById('temperature').innerText = Math.floor(data.main.temp - 273) + ' °C';

        document.getElementById('clouds').innerText = data.weather[0].description;
        console.log(data.weather[0].description);

        const icon1 = data.weather[0].icon;
        const iconurl = `https://api.openweathermap.org/img/w/${icon1}.png`;
        document.getElementById('img').src = iconurl;
    } catch (error) {
        console.error("Error occurred while fetching weather report:", error);
        alert("Sorry!!! The weather for the city you want to find does not exist.");
    }
}

function hourForecast(forecast) {
    document.querySelector('.templist').innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const date = new Date(forecast?.list[i]?.dt * 1000);
        console.log((date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', ''));

        const hourR = document.createElement('div');
        hourR.setAttribute('class', 'next');

        const div = document.createElement('div');
        const time = document.createElement('p');
        time.setAttribute('class', 'time');
        time.innerText = (date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', '');

        const temp = document.createElement('p');
        temp.innerText = Math.floor((forecast?.list[i]?.main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';

        div.appendChild(time);
        div.appendChild(temp);

        const desc = document.createElement('p');
        desc.setAttribute('class', 'desc');
        desc.innerText = forecast?.list[i]?.weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc);
        document.querySelector('.templist').appendChild(hourR);
    }
}

function dayForecast(forecast) {
    document.querySelector('.weekF').innerHTML = '';
    forecast.list = forecast?.list.slice(0,32);
    for (let i = 8; i < forecast.list.length; i += 8) {
        const div = document.createElement('div');
        div.setAttribute('class', 'dayF');

        const day = document.createElement('p');
        day.setAttribute('class', 'date');
        day.innerText = new Date(forecast?.list[i]?.dt * 1000).toDateString(undefined, 'Asia/Kolkata');
        div.appendChild(day);

        const temp = document.createElement('p');
        temp.innerText = Math.floor((forecast?.list[i]?.main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';
        div.appendChild(temp);

        const description = document.createElement('p');
        description.setAttribute('class', 'desc');
        description.innerText = forecast?.list[i]?.weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div);
    }
}