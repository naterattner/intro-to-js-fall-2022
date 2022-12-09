// make map
let myMap;
myMap = L.map("map");

// create tile layer
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap);

myMap.setView([40.7080962, -73.9717345], 12);

//
// L.geoJSON(nyc).addTo(myMap);



//park data
console.log(parkData)
// const parkLayer = L.geoJSON().addTo(myMap);
// parkLayer.addData(parkData);

const parkLayer = L.geoJSON(parkData, {
	onEachFeature: function (feature, layer) {
	  layer.bindPopup('<h1>'+feature.properties.name+'</h1><p>name: '+feature.properties.name+'</p>');
	}
  }).addTo(myMap);



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

$("#pan-to-flatbush").click(function() {
    // find flatbush neighborhood property in the dataset
    let flatbush = nyc.features.find(function(feature) {
        return feature.properties.neighborhood === "Flatbush";
    });
    console.log(flatbush);
	// find the coordinates of flatbush property
    let coordinates = nyc.features.find(function(feature) {
        return feature.properties.neighborhood === "Flatbush";
    }).geometry.coordinates;
    console.log(coordinates);
    myMap.panTo(new L.LatLng(coordinates[0][0][1], coordinates[0][0][0]));
});
