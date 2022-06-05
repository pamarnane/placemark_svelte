<script>
  import { getContext, onMount } from "svelte";

  const placemarkService = getContext("PlacemarkService");

  export let name;

  function logout(){
    placemarkService.logout();
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
          <a class="button" id="Dashboard" href="/#/dashboard">Dashboard</a>
          <a class="button" id="logout" href="/" on:click={logout}>Log Out</a>
        </div>
      </div>
    </div>
  </div>
</nav>

{#if name}
<h1 class="title" style="text-align:center">{name}</h1>
{/if}
