// MAKE MAP
let myMap;
myMap = L.map("map");


// CREATE TILE LAYER
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

myMap.setView([40.7080962, -73.9717345], 13);

// console.log(parkData)


// MAKE ICONS
let basketBallIcon = new L.icon({
	iconUrl: 'imgs/basketball_icon.png',
	iconSize:     [35, 35], // size of the icon
  });


// ADD ICONS TO MAP AND WRITE POPUPS
const parkLayer = L.geoJSON(parkData, {
	onEachFeature: function (feature, layer) {
	  layer.bindPopup('<h3>'+feature.properties.name+'</h3><p class="popup-text">'+feature.properties.sts+'</p>' + "<img src='" + feature.properties.img_path + "'/>" + "<a class='popup-link' target='blank' href='" + feature.properties.link + "'>More info</a>");
	},
	pointToLayer: function(point, latlng) {
		return L.marker(latlng, { icon: basketBallIcon })
	  }
  }).addTo(myMap);


// PAN TO PARK BUTTONS
function panToPark(val){
	console.log('Panning to ' + val)
	// find the coordinates of the park and pan to it
    let coordinates = parkData.features.find(function(feature) {
        return feature.properties.name === val;
    }).geometry.coordinates;
    console.log(coordinates);
    myMap.panTo(new L.LatLng(coordinates[1], coordinates[0]));
  }
