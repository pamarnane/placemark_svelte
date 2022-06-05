<script>
  import AddPlacemarkForm from "../components/AddPlacemarkForm.svelte";
  import UserMenu from "../components/UserMenu.svelte";
  import {getContext, onMount} from 'svelte';
  import PlacemarkMap from "../components/PlacemarkMap.svelte"
import { push } from "svelte-spa-router";

  const placemarkService = getContext("PlacemarkService");
  let placemarks = [];

  let obj = JSON.parse(localStorage.placemark);
  let userID = obj.userID;

  let placemarkMap = null;

  function placemarkAdded(event) {
    placemarkMap.addPlacemarkMarker(event.detail.placemark);
  }

  async function openVisits(placemark) {
    push("/visit/" + placemark._id + "/" + placemark.name);
  }

  async function deletePlacemark(id) {
    await placemarkService.deletePlacemark(id);
    placemarks = await placemarkService.getUserPlacemarks(userID);
  }

  onMount(async () => {
   placemarks = await placemarkService.getUserPlacemarks(userID);
  });
</script>


<UserMenu name=""/>
<PlacemarkMap bind:this={placemarkMap}  id={userID}/>
<AddPlacemarkForm bind:value={placemarks} on:message={placemarkAdded}/>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th><abbr title="Name">Name</abbr></th>
      <th><abbr title="Category">Category</abbr></th>
      <th><abbr title="Description">Description</abbr></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each placemarks as placemark}
      <tr>
        <td>{placemark.name}</td>
        <td>{placemark.category}</td>
        <td>{placemark.description}</td>
        <td>
        <div class="field is-grouped" >
          <p class="control">
            <!-- <a class="button" id="visit" href="/#/visit/{placemark._id}"> Open Logs </a> -->
            <button on:click|once={openVisits(placemark)} class="button"><span>Open Visits</span>

          </p>
          <p>
              <button on:click|once={deletePlacemark(placemark._id)} class="button is-danger is-outlined"><span>Delete</span><span class="icon is-small"><i class="fas fa-times"></i></span></button>
          </p>
        </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>