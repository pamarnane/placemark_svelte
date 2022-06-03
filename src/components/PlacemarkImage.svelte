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
  export let id;
  let url_render = "";
  let publicid = "";

  function handleUpload(event){
      if(multiple ){
          for(let file = 0; file < event.target.files.length; file++){
              uploadFile(event.target.files[file] , event.target.files.length)
          }
      }else{
          uploadFile(event.target.files[0] , 1)
      }
  }
 
  onMount(async () => {
    let placemark = await placemarkService.getPlacemarkById(id);
    url_render = placemark.img;
    publicid = placemark.publicid;    
  });

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
      publicid = response.url;
      url_render = response.url;
      const image = {
        url: response.url,
        publicid: response.public_id,
        id: id,        
      }
      response = await placemarkService.storeImage(image)

  }
  
  async function deleteImage(url_publicid){
    //let placemark = await placemarkService.getPlacemarkById(placemark_id);
    let response = await placemarkService.deleteImage(id)
    url_render = ""

  }

  //$: url_render
</script>

<div class="card">
  {#if url_render.length > 3}
    <div class="card-image">
      <figure class="image is-256x256">
        <img src={url_render}>
      </figure>
    </div>
  {/if}
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
        <p>
          {#if url_render.length > 3}
            <button on:click|once={deleteImage(url_render)} class="button is-danger is-outlined"><span>Delete</span><span class="icon is-small"><i class="fas fa-times"></i></span></button>
          {/if}
      </p>
      </div>
    </section>
  </div>
</div>