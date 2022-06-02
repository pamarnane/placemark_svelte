<script>
  import VisitTable from "../components/VisitTable.svelte";
  import WelcomeMenu from "../components/WelcomeMenu.svelte";
  import { getContext, onMount } from "svelte";
  
  const placemarkService = getContext("PlacemarkService");

  let selectedActivity = "";
  let date = "";
  let description = "";

  let errorMessage = "";

  let activities = [];
  let visits = [];

  let id = "";
  export let params = {}


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
    } else {
      errorMessage = "Error retrieving visits";
    }
  }

  onMount(async () => {
    // visits = await placemarkService.getAllVisits();
    visits = await placemarkService.getPlacemarkVisits(params.id);
    activities = await placemarkService.getActivities();
    console.log(activities);
  });

</script>

<WelcomeMenu/>

<section class="section columns is-vcentered">
  <div class="column has-text-centered">
    <div class="content">
     <!-- <h1>{placemark.name}</h1> -->
    </div>
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
<!--   <div class="column">
    {{> placemark-image }} 
  </div> -->
</section>