
import "babel-polyfill";
var country2total = new Map();
var geojson;
var mymap;
var prev;

if (mymap != undefined) { mymap.remove(); }
mymap = L.map('mapid', {
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
bounds: bounds,
center: bounds.getCenter()
}).addTo(mymap);
geojson = L.geoJson(window.countriesData, {
  style: style,
  onEachFeature: onEachFeature
})
geojson.addTo(mymap);



function drawAll() {
  geojson.resetStyle();
  if (prev != undefined) {
    zoomToFeature(prev);
  }
}

function rgbaToHex(color) {
  var values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');
  var a = parseFloat(values[3] || 1),
    r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
    g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
    b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);

  return "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2);
}

function getColorByNumber(n,max) {
  let halfMax = max / 2  //最大数值的二分之一
    //var 百分之一 = (单色值范围) / halfMax;  单颜色的变化范围只在50%之内
    var one = 255 / halfMax; 
    var r = 0;
    var g = 0;
    var b = 0;


    if (n < halfMax) {
      // 比例小于halfMax的时候红色是越来越多的,直到红色为255时(红+绿)变为黄色.
      r = one * n;  
      g = 255;
    }

    if (n >= halfMax) {
      // 比例大于halfMax的时候绿色是越来越少的,直到0 变为纯红
      g = (255 - ((n - halfMax) * one)) < 0 ? 0 : (255 - ((n - halfMax) * one))
      r = 255;

    }
    r = parseInt(r);// 取整
    g = parseInt(g);// 取整
    b = parseInt(b);// 取整

    // console.log(r,g,b)
    return rgbaToHex("rgb(" + r + "," + g + "," + b + ")");
}

function getColor(d) {
  return getColorByNumber(d, 17);
  // if (window.disorder_type == "total") {
  //   return d > 17 ? '#800026' :
  //           d > 15  ? '#BD0026' :
  //           d > 13  ? '#E31A1C' :
  //           d > 11  ? '#FC4E2A' :
  //           d > 9   ? '#FD8D3C' :
  //           d > 7   ? '#FEB24C' :
  //                   '#FFEDA0';
  //   } else{  
  //     return d > 7 ? '#800026' :
  //             d > 6  ? '#BD0026' :
  //             d > 5  ? '#E31A1C' :
  //             d > 4  ? '#FC4E2A' :
  //             d > 3  ? '#FD8D3C' :
  //             d > 2  ? '#FEB24C' :
  //                       '#FFEDA0';                   
  //   }
}

var legend
async function updateMap() {
  country2total.clear();
  await updateCountry2total();
  drawAll();
  if (legend != undefined) {
    mymap.removeControl(legend);
    console.log("HERE");
  }
  legend = L.control({position: 'bottomright'});

  legend.onAdd = function (mymap) {
      if (window.disorder_type == "total") {
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 7, 9, 11, 13, 15, 17],
        labels = [];
      } else {
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5, 6],
        labels = [];
      }

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + "%" + (grades[i + 1] ? '&ndash;' + grades[i + 1] + "%" + '<br>' : '+');
      }

      return div;
  };
  legend.addTo(mymap);
}

window.updateMap = updateMap;

async function updateCountry2total() {
  await filter_data_year(window.all_data, window.sliderYear).then(function(d) {
    d.map(function(row) {
      var total = row[window.disorder_type];
      var country = row["code"];
      country2total[country] = total;
    });
  });
}

function style(feature) {
  return {
    // TODO Change This Color by data[feature.properties.adm0_a3]
    // fillColor: '#ffeda0',
    fillColor: getColor(country2total[feature.properties.adm0_a3]),
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

function resetMap() {
  mymap.fitBounds(bounds);
  if (prev != undefined) {
    geojson.resetStyle(prev.target);
    prev = undefined;
  }
}

window.resetMap = resetMap;


updateMap();