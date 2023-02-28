/**
 * Get your own mapbox access token by signing up at https://account.mapbox.com/auth/signup/
 * Replace YOUR_ACCESS_TOKEN with your actual token below. 
 */
mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';

/**
 * Create a new map centered in the area between MIT and Harvard. 
 * You can change the latitude and longitude coordinates below to map a different area. 
 */
var map = new mapboxgl.Map({
		container: 'map', 
		style: 'mapbox://styles/mapbox/streets-v11', 
		center: [-71.104081,42.365554], 
		zoom: 14 
});

/**
 * Create an empty array to hold the bus map markers 
 */
var markers = [];

/**
 * The function below gets the current bus locations and displays them on the map. 
 */
async function run(){
	const locations = await getBusLocations();

	// remove old markers from the map so we can update them 
	if (markers.length) {
		markers.forEach((marker) => marker.remove());
	}

	// clear markers from markers storage array
	markers = [];

	// loop through new bus locations  
	locations.forEach((bus) => {

		// add a marker for each bus 
		let marker = new FontawesomeMarker({
        icon: 'fa-solid fa-bus',
        iconColor: 'white',
        color: 'black'
    })
			.setLngLat([bus.attributes.longitude, bus.attributes.latitude])
			.addTo(map);

		// add to markers storage array
		markers.push(marker);		

	});

  // If you need to check your markers, uncomment below: 
	// console.log(markers);

	// Initialize a timer to run this function every 15 seconds 
	setTimeout(run, 15000);
}


/**
 * Fetch realtime bus locations from the MBTA website. 
 */
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json 		 = await response.json();
	return json.data;
}

run();