// make map
let myMap;
myMap = L.map("map");

// create tile layer
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap);

myMap.setView([40.7080962, -73.9717345], 13);

//
// L.geoJSON(nyc).addTo(myMap);



//park data
console.log(parkData)
// const parkLayer = L.geoJSON().addTo(myMap);
// parkLayer.addData(parkData);

let basketBallIcon = new L.icon({
	iconUrl: 'imgs/basketball_icon.png',
	iconSize:     [35, 35], // size of the icon
  });

const parkLayer = L.geoJSON(parkData, {
	onEachFeature: function (feature, layer) {
	  layer.bindPopup('<h3>'+feature.properties.name+'</h3><p class="popup-text">'+feature.properties.sts+'</p>' + "<img src='" + feature.properties.img_path + "'/>" + "<a class='popup-link' target='blank' href='" + feature.properties.link + "'>More info</a>");
	  console.log("<img src='" + feature.properties.img_path + "'/>");
	},
	pointToLayer: function(point, latlng) {
		return L.marker(latlng, { icon: basketBallIcon })
	  }
  }).addTo(myMap);

// const iconOptions = {
//     iconSize:     [38, 95], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// };

// // L.geoJSON(parkData, {
// //     pointToLayer: function (feature, latlng) {
// //         return L.circleMarker(latlng, geojsonMarkerOptions);
// //     }
// // }).addTo(myMap);

// L.geoJSON(parkData, {
//     pointToLayer: function (feature, latlng) {
//         return L.Icon(latlng, iconOptions);
//     }
// }).addTo(myMap);

// const timesSquare = L.marker([40.7580, -73.9855]).addTo(myMap);
// timesSquare.bindPopup("<b>Times Square</b>");

// const circle = L.circle([40.7580, -73.9855], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(myMap);

// add some fill color to the map
// L.geoJSON(nyc, {
//     style: function(feature) {
//         return {
//             color: "blue",
//             fillColor: "yellow",
//             fillOpacity: 0.5
//         };
//     }
// }).addTo(myMap);

// show each borough on the map
// L.geoJSON(nyc, {
//     onEachFeature: function(feature, layer) {
//         layer.bindPopup("<h3>" + feature.properties.borough + "</h3> <hr> <h3>" + feature.properties.neighborhood + "</h3>");
//     }
// }).addTo(myMap);


$("#pan-to-dean").click(function() {
    // find flatbush neighborhood property in the dataset
    let dean = parkData.features.find(function(feature) {
        return feature.properties.name === "Dean Playground";
    });
    console.log(dean);
	// find the coordinates of flatbush property
    let coordinates = parkData.features.find(function(feature) {
        return feature.properties.name === "Dean Playground";
    }).geometry.coordinates;
    console.log(coordinates);
    myMap.panTo(new L.LatLng(coordinates[1], coordinates[0]));
});

function panToPark(val){
	// find the park in the dataset
	// let park = parkData.features.find(function(feature) {
    //     return feature.properties.name === val;
    // });
	// console.log(park);
	console.log('Panning to ' + val)
	// find the coordinates of the park and pan to it
    let coordinates = parkData.features.find(function(feature) {
        return feature.properties.name === val;
    }).geometry.coordinates;
    console.log(coordinates);
    myMap.panTo(new L.LatLng(coordinates[1], coordinates[0]));
  }
