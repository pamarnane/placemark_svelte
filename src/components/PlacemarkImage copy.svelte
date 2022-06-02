<script>
import { getContext, onMount } from "svelte";
  
  const placemarkService = getContext("PlacemarkService");

  let imagefile = null;
  let errorMessage = "";

  async function uploadImage() {
    const image = {
      imagefile: imagefile
     // placemarkid: params.id
    }
    let success = await placemarkService.uploadImage(image);
    if (success) {
     console.log("Image upload success")
    } else {
      errorMessage = "Error retrieving visits";
    }
  }



</script>

<div class="card">
  <div class="card-image">
    <figure class="image is-256x256">
      <!-- <img src={placemark.img}> -->
    </figure>
  </div>
  <div class="card-content">
    <!-- <form action="/placemark/zz/uploadimage" method="POST" enctype="multipart/form-data"> -->
    <form on:submit|preventDefault={uploadImage}>
      <div id="file-select" class="file has-name is-fullwidth">
        <label class="file-label"> <input class="file-input" bind:value={imagefile} type="file" accept="image/png, image/jpeg">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
           </span>
          <span class="file-name"></span>
        </label>
        <button type="submit" class="button is-info">Upload</button>
      </div>
    </form>
  </div>
</div>