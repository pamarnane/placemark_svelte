<script>
  import {setContext} from "svelte";
  import {PlacemarkService} from "./services/placemark-service.js";
  import Main from "./pages/Main.svelte"
  import Login from "./pages/Login.svelte"
  import Signup from "./pages/Signup.svelte"
  import Dashboard from "./pages/Dashboard.svelte";
  import Visit from "./pages/Visit.svelte";
  import Router from "svelte-spa-router";

  setContext("PlacemarkService", new PlacemarkService("http://localhost:4000"));

  let routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/dashboard": Dashboard,
    "/visit/:id/:name?": Visit,
    "/logout": Main,
  }
</script>

<div class="container">
  <Router {routes}/>
</div>
