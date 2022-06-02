<script>
    import Chart from "svelte-frappe-charts";
    import { getContext, onMount } from "svelte";
  
    const placemarkService = getContext("PlacemarkService");

    export let id;
    let data = {
        labels: ["Run", "Hike", "Swim", "Surf", "Walk"],
        datasets: [
        {
          values: [0, 0, 0, 0, 0]
        }
      ]
    };

    export async function refreshChart(visit) {
     // let visits = await placemarkService.getPlacemarkVisits(id);
      populateVisit(visit);
  }

  function populateVisit(visit) {
   //data.datasets[0].values == [0, 0, 0, 0, 0];
    //visitList.forEach((visit) => {  
            if (visit.activity == "Run")      
                data.datasets[0].values[0] ++
            else if (visit.activity == "Hike")
                data.datasets[0].values[1] ++
            else if (visit.activity == "Swim")
                data.datasets[0].values[2] ++
            else if (visit.activity == "Surf")
                data.datasets[0].values[3] ++
                else if (visit.activity == "Walk")
                data.datasets[0].values[4] ++
            //})          
  }
    
    onMount(async () => {
    let visits = await placemarkService.getPlacemarkVisits(id);
            // populateVisit(visits);
            visits.forEach((visit) => {  
            if (visit.activity == "Run")      
                data.datasets[0].values[0] ++
            else if (visit.activity == "Hike")
                data.datasets[0].values[1] ++
            else if (visit.activity == "Swim")
                data.datasets[0].values[2] ++
            else if (visit.activity == "Surf")
                data.datasets[0].values[3] ++
                else if (visit.activity == "Walk")
                data.datasets[0].values[4] ++ 
            })     
        });
</script>
  <div class="columns">
    <div class="column box has-text-centered">
      <h1 class="title is-4">Title</h1>
      <Chart data={data} type="bar" />
    </div>
  </div>
