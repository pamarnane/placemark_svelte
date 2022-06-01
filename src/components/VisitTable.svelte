<script>
  import { getContext, onMount } from "svelte";
  
  const placemarkService = getContext("PlacemarkService");
  export let visits;

   onMount(async () => {
    visits
    console.log(visits);
  });

</script>


<table class="table is-fullwidth">
  <thead>
    <tr>
      <th><abbr title="Activity">Activity</abbr></th>
      <th><abbr title="Date">Date</abbr></th>
      <th><abbr title="Description">Description</abbr></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each visits as visit}
      <tr>
        <td>{visit.activity}</td>
        <td>{visit.date}</td>
        <td>{visit.description}</td>
      </tr>
    {/each}
  </tbody>
</table>