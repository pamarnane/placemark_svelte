<script>
  import WelcomeMenu from "../components/WelcomeMenu.svelte";
 // import TitleBar from "../components/TitleBar.svelte";
  import {getContext} from "svelte";

  const placemarkService = getContext("PlacemarkService");
  placemarkService.logout();
</script>

<div class="column">
  <WelcomeMenu/>
</div>

<section class="section">
  <p> Sign up or Log in... </p>
</section>



