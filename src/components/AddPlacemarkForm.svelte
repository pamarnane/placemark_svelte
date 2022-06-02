<script>
    import {getContext, onMount} from "svelte";
    import { user } from "../stores.js"

    const placemarkService = getContext("PlacemarkService");

    export let value = {};

    let name = "";
    let description = "";
    
    let categories = [];
    let selectedCategory = "";

    let latitude = 0.0;
    let longitude = 0.0;

    let obj = JSON.parse(localStorage.placemark);
    let userID = obj.userID;

    onMount(async () => {
        categories = await placemarkService.getCategories();
    });

    async function addPlacemark() {
        const placemark = {
            name: name,
            category: selectedCategory,
            description: description,
            latitude: latitude,
            longitude: longitude,
            userID: userID,
        };
    
        const success = await placemarkService.addPlacemark(placemark);
        value = await placemarkService.getUserPlacemarks(userID);
        if (!success) {  
            return;
        }
    }   
</script>

<form on:submit|preventDefault={addPlacemark}>
    <div class="columns">
        <div class="column">
            <label class="label" for="name">Name</label> <input bind:value={name} class="input" id="name" type="text" placeholder="Enter placemark name" name="name">
        </div>
        <div class="column">
            <label class="label" for="category">Category</label>
                <div class="select">
                    <select bind:value={selectedCategory}>
                        {#each categories as category}
                            <option>{category.category}</option>
                        {/each}
                    </select>
                </div>
        </div>
        <div class="column">
            <label class="label"  for="latitude">Latitude</label> <input bind:value={latitude} class="input" type="number" step="0.001" placeholder="Enter latitude" name="latitude">
        </div>
        <div class="column">
            <label class="label" for="longitude">Longitude</label> <input bind:value={longitude} class="input" type="number" step="0.001" placeholder="Enter longitude" name="longitude">
        </div>
        <div class="column">
            <label class="label" for="description">Description</label> <input bind:value={description} class="input" type="text" placeholder="Enter placemark description" name="description">
        </div>
        <div class="column">
            <label class="label" for="category">---</label>
                <div class="control">
                    <button class="button is-link is-light">Add</button>
                </div>
        </div>
    </div>
</form>