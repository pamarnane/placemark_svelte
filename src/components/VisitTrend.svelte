<script>
import Chart from "svelte-frappe-charts";
import { getContext, onMount } from "svelte";
  
  const placemarkService = getContext("PlacemarkService");
  
  export let id;
  let result = [];
  let dailyWeather = [];
  let currentTemp = 0.0;
  let currentWeather = 0.0;

  let data = {
        labels: [],
        datasets: [
        {
            name: "Humidity", chartType: "line",
            values: []
        },
        {
            name: "Temperature", chartType: "line",
            values: []
        },
        {
            name: "Dew Point", chartType: "line",
            values: []
        }
      ],

      
    };
    
async function getWeatherData(id) {
    let data = await placemarkService.getPlacemarkWeather(id);
    return data;
}

onMount(async () => {
    result = await placemarkService.getPlacemarkWeather(id);
    currentTemp = result.current.temp;
    currentWeather = result.current.weather[0].main;
    dailyWeather = result.daily;

    dailyWeather.forEach(function(daily){
      let dateLabel = new Date(daily.dt * 1000)
      data.labels.push(`${dateLabel.getDate()}/${dateLabel.getMonth() + 1}/${dateLabel.getFullYear()}`)
      data.datasets[0].values.push(daily.humidity);
      data.datasets[1].values.push(daily.temp.day);
      data.datasets[2].values.push(daily.dew_point);
        
    });
    data = data;
  });
</script>


<Chart data={data} type="axis-mixed" title="Last 7 Day Trends"/>
