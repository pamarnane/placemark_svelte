<script>
  import WelcomeMenu from "../components/WelcomeMenu.svelte";
  import VisitTable from "../components/VisitTable.svelte";
  import VisitChart from "../components/VisitCharts.svelte";
  import VisitTrend from "../components/VisitTrend.svelte";
  import VisitWeather from "../components/VisitWeather.svelte";
  import PlacemarkImage from "../components/PlacemarkImage.svelte";
  import { getContext, onMount } from "svelte";
  
  const placemarkService = getContext("PlacemarkService");

  let selectedActivity = "";
  let date = "";
  let description = "";

  let errorMessage = "";

  let placemark = null;
  let activities = [];
  let visits = [];
  let visitChart = null;

  export let params = {}

  function visitAdded(event) {
    visitChart.refreshChart();
  }

  async function logVisit() {
    const visit = {
      activity:  selectedActivity,
      date: date,
      description: description,
      placemarkid: params.id
    }
    let success = await placemarkService.logVisit(visit);
    if (success) {
      visits = await placemarkService.getPlacemarkVisits(params.id);
      let selectedActivity = "";
      let date = "";
      let description = "";
      visitChart.refreshChart(visit);
    } else {
      errorMessage = "Error retrieving visits";
    }
  }

  onMount(async () => {
    placemark = await placemarkService.getPlacemarkById(params.id);
    visits = await placemarkService.getPlacemarkVisits(params.id);
    activities = await placemarkService.getActivities();
  });
</script>

<WelcomeMenu/>
<div class="container">
  <h1 class="title">{params.name}</h1>
</div>
<VisitChart bind:this={visitChart} id={params.id}/>
<VisitTrend id={params.id}/>
<VisitWeather id={params.id}/>


<section class="section columns is-vcentered">
  <div class="column has-text-centered">
    <section class="section">
      <VisitTable visits="{visits}"/>
    </section>
    <section class="section">
      <div class="box">
        <form on:submit|preventDefault={logVisit}>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <label for="activity" class="label">Activity</label>
                <div class="select is-fullwidth">
                  <select bind:value={selectedActivity}>
                    {#each activities as activity}
                      <option>{activity.activity}</option>
                    {/each}
                </div>
              </div>
              <div class="field">
                <label for="date" class="label">Date</label>
                <input bind:value={date}  id="date" class="input" type="date" name="date">
              </div>
            </div>
          </div>
          <div class="field">
            <label for="description" class="label">Description</label>
            <input bind:value={description} id="description" class="input" type="text" placeholder="Enter description" name="description">
          </div>
          <div class="field is-grouped">
            <button class="button is-link">Log Visit</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</section>

<PlacemarkImage id={params.id}/>

