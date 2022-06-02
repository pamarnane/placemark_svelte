<script>
    import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from '../services/leaflet-map';
    import { getContext, onMount} from "svelte";

    const placemarkService = getContext("PlacemarkService");  
    const mapConfig = {
      location: {lat: 53.4495, lng: -7.5030},
      zoom: 7,
      minZoom: 1,
    };
  
    onMount(async () => {
        const categories = await placemarkService.getCategories();

        const map = new LeafletMap("placemark-map", mapConfig);
        map.showZoomControl();
        categories.forEach((category) => {        
            map.addLayerGroup(category.category);
            }
        );
        map.showLayerControl();

        const placemarks = await placemarkService.getPlacemarks();
        placemarks.forEach(placemarks => {
        map.addMarker({lat: placemarks.latitude, lng: placemarks.longitude}, placemarks.name, placemarks.category);
        });
    })
</script>
  
<div class="box" id="placemark-map" style="height:800px">
</div>