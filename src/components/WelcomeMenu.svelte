<script>
import {getContext} from "svelte";

const placemarkService = getContext("PlacemarkService");
async function auth(){
  let url = "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/authorize?client_id=d82462eb8ae41a46a9a2";

  // async function fetchAsync (url) {
  let response = await fetch(url);
 // let data = await response.json();
  return response;
}
</script>

<nav class="navbar" aria-label="main navigation">
  <div class="navbar-brand">
    <div class="title p-3 is-flex">
      <i style="font-size: 48px; color: Green;" class="fas fa-map-marked-alt"></i>
      <div class="ml-4">PlaceMark</div>
    </div>
  </div>
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button" id="login" href="/#/login"> Log in </a>
          <!-- <a class="button" id="login" on:click={auth}> GitHub Log in </a> -->
          <a class="button" id="signup" href="/#/signup"> Sign up </a>
        </div>
      </div>
    </div>
  </div>
</nav>
