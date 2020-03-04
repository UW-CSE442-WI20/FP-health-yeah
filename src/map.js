
if (mymap != undefined) { mymap.remove(); }

var mymap = L.map('mapid', {
  minZoom: 1.4
}).setView([51.505, -0.09], 1.4);
var shipLayer = L.layerGroup();
mymap.addLayer(shipLayer);

var southWest = L.latLng(-89.98155760646617, -180),
northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);

mymap.setMaxBounds(bounds);
mymap.on('drag', function() {
mymap.panInsideBounds(bounds, { animate: false });
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5naWVsZWV5eiIsImEiOiJjazY4c3MwOHAwOGc1M29xanNrOWdpcjgwIn0.kOc4Y88p-f10kvKPyKoKOA', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/light-v10',
accessToken: 'your.mapbox.access.token',
noWrap: true,
bounds: [
  [-90, -180],
  [90, 180]
],
center: bounds.getCenter()
}).addTo(mymap);

function style(feature) {
return {
  // TODO Change This Color by data[feature.properties.adm0_a3]
  fillColor: '#ffeda0',
  // fillColor: getColor(feature.properties.measlesrate),
  weight: 2,
  opacity: 1,
  color: 'white',
  fillOpacity: 0.7
};
}
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
      weight: 5,
      color: 'green',  // Change this color
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }
}
var clicked = false;
var prev;

function resetHighlight(e) {
  if (e != prev) {
    geojson.resetStyle(e.target);
  }
  if (prev != undefined) {
    highlightFeature(prev)
  }
}


function zoomToFeature(e) {
  if (prev != undefined) {
    geojson.resetStyle(prev.target);
  }
  highlightFeature(e)
  clicked = true;
  var layer = e.target;
  prev = e;
  window.countryCode = layer.feature.properties.adm0_a3;
  mymap.fitBounds(layer.getBounds());
  document.getElementById("noData").style.display = "none";

  document.getElementById("mapid").style.width = "48%";
  document.getElementById("container").style.display = "inline-block";

  document.getElementById("chartContainer").style.display = "inline-block";
  window.showGraph(window.sliderYear);

  document.getElementById("pieContainer").style.display = "inline-block";
  window.showPie(window.sliderYear);
}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}


var geojson;

geojson = L.geoJson(window.countriesData, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(mymap)