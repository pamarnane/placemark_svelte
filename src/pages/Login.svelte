<script>
  import LoginForm from "../components/LoginForm.svelte";
  import {getContext} from "svelte";

  const placemarkService = getContext("PlacemarkService");
  placemarkService.logout();
</script>

<section class="section">
  <h1 class="title">Log in</h1>
  <LoginForm/>
</section>

