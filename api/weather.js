import * as location from './get-live-location-weather.js'
import * as search from './searchByName.js'
location.livelocation();
const apikey = "7eff7b05d3ba44e986a00d09393b9d2d";
const searchButton  = document.getElementById("search");

searchButton.addEventListener("click",async ()=>
{
    search.searchByCity()
})