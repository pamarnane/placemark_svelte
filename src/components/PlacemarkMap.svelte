<script>
    import {LeafletMap} from '../services/leaflet-map';
    import { getContext, onMount} from "svelte";

    const placemarkService = getContext("PlacemarkService");  
    const mapConfig = {
      location: {lat: 53.4495, lng: -7.5030},
      zoom: 7,
      minZoom: 1,
    };

    export let id;
    let map =null;
    
    
  
    onMount(async () => {
        const categories = await placemarkService.getCategories();

        map = new LeafletMap("placemark-map", mapConfig);
        map.showZoomControl();
        categories.forEach((category) => {        
            map.addLayerGroup(category.category);
            }
        );
        map.showLayerControl();

        const placemarks = await placemarkService.getUserPlacemarks(id);
        placemarks.forEach(placemark => {
        addPlacemarkMarker(placemark);
        });
    })

    export function addPlacemarkMarker(placemark) {
        map.addMarker({lat: placemark.latitude, lng: placemark.longitude}, placemark.name, placemark.category);
    }
</script>
  
<div class="box" id="placemark-map" style="height:800px">
</div>