<script>
import { getContext, onMount } from "svelte";
  
const placemarkService = getContext("PlacemarkService");

export let id;
/* let lat = "";
let lng = ""; */
let result = [];
let currentTemp = 0.0;
let currentWeather = 0.0;

async function getWeatherData(id) {
    let data = await placemarkService.getPlacemarkWeather(id);
    return data;
}

onMount(async () => {
    let placemark = await placemarkService.getPlacemarkById(id);
/*     lat = placemark.latitude;
    lng = placemark.longitude; */
    result = await getWeatherData(id);
    currentTemp = result.current.temp;
    currentWeather = result.current.weather[0].main;
  });
</script>

<div class="section">
    <div class="box">
        <h3>Current temperature is: {currentTemp}</h3>
        <h3>Current weather forecast is: {currentWeather}</h3>
    </div>
</div>


