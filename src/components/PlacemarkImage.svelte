<script>
  import {createEventDispatcher} from 'svelte'
  import { getContext, onMount } from "svelte";

  const placemarkService = getContext("PlacemarkService");
  const dispatch = createEventDispatcher()
  // const cloudName = "dis8g8hoc"
  const unsignedUploadPreset = 'xfzkiqtm';
   const cloudName = import.meta.env.VITE_cloudinary_name
 /* const unsignedUploadPreset = process.env.cloudinary_preset */

  export let multiple = false
  export let placemark_id;
  let url_render = ""

  function handleUpload(event){
      if(multiple ){
          for(let file = 0; file < event.target.files.length; file++){
              uploadFile(event.target.files[file] , event.target.files.length)
          }
      }else{
          uploadFile(event.target.files[0] , 1)
      }
  }

/*   onMount(async () => {
    placemark = await placemarkService.getPlacemarkVisits(params.id);
    activities = await placemarkService.getActivities();
  }); */

  async function uploadFile(file ,  length){
      var formdata = new FormData();
      formdata.append("file", file , file.name)
      formdata.append('upload_preset', unsignedUploadPreset);
      formdata.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
      var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      var response = await fetch(url, {
          method: 'POST', 
          body: formdata
      })
      response = await response.json()
      const image = {
        image_url: response.url,
        id: placemark_id,        
      }
      response = await placemarkService.storeImage(image)
      url_render = response.img;
  }
</script>

<div class="card">
  <div class="card-image">
    <figure class="image is-256x256">
      <img src={url_render}>
    </figure>
  </div>
  <div class="card-content">
    <section class="section">
      <div class="box">
        <div class="file is-normal">
          <label class="file-label">
            <input class="file-input" type="file" name="file" accept="image/x-png,image/jpeg,application/pdf" on:change={handleUpload} multiple={multiple}>
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Add/Update Image
              </span>
            </span>
          </label>
        </div>
      </div>
    </section>
  </div>
</div>