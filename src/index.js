document.getElementById("close").onclick = function() {
  document.getElementById("mapid").style.width = "680px";
  document.getElementById("container").style.display = "none";
  document.getElementById("chartContainer").style.display = "none";
  document.getElementById("pieContainer").style.display = "none";
}

// You can require libraries
const d3 = require('d3');


// Prevalence of mental health disorders by disorder type
const csvFile = require('../total-data.csv');

// You can load JSON files directly via require.
// Note this does not add a network request, it adds
// the data directly to your JavaScript bundle.
// const exampleData = require('./example-data.json');


// Anything you put in the static folder will be available
// over the network, e.g.
// Load the csv file
var all_data = d3.csv(csvFile, function(data) {
  return {
      entity: data.Entity,
      code: data.Code,
      year: +data.Year,
      schizophrenia: +data["Schizophrenia (%)"],
      bipolar: +data["Bipolar disorder (%)"],
      eating: +data["Eating disorders (%)"],
      anxiety: +data["Anxiety disorders (%)"],
      drug: +data["Drug use disorders (%)"],
      depression: +data["Depression (%)"],
      alcohol: +data["Alcohol use disorders (%)"],
      total: +data["total (%)"]
  };
});


var slider = document.getElementById("yearRange");
var output = document.getElementById("yearDisplay");
output.innerHTML = slider.value; // Display the default slider value
window.sliderYear = slider.value;
// returns a Promise of filtered csv array from all_data
function filter_data_country() {
  return all_data.then(function(d) {
      var d_filtered =  d.filter(function(row) {
          return row["code"] == window.countryCode;
      });
      return d_filtered;
  });
}

function filter_data_year(data, year) {
  return data.then(function(d) {
    var d_filtered =  d.filter(function(row) {
        return row["year"] == year;
    });
    return d_filtered;
  });
}

// var counterPie = 1;

function showPie(year) {
  var data = filter_data_country();

  filter_data_year(data, year).then(function(d) {
    d.map(function(row) {
      var chartPie = new CanvasJS.Chart("pieContainer", {
        theme: "light4", // "light1", "light2", "dark1", "dark2"
        backgroundColor: "beige",
        interactivityEnabled: true,
        title: {
            text: "Percentage of Population with Disorders in " + row["entity"],
            fontFamily: "avenir",
            fontColor: "#003366",
        },
        data: [{
          type: "pie",	
          startAngle: 25,
          toolTipContent: "<b>{label}</b>: {y}%",
          indexLabelFontSize: 16,
          indexLabel: "{label} - #percent%",
          percentFormatString: "#0.##",
          fontFamily: "avenir",
          dataPoints: [
            { 'label': "Schizophrenia", y: row["schizophrenia"]},
            { 'label': "Bipolar disorder", y: row["bipolar"]},
            { 'label': "Eating disorders", y: row["eating"]},
            { 'label': "Anxiety disorders", y: row["anxiety"]},
            { 'label': "Drug use disorders", y: row["drug"]},
            { 'label': "Depression", y: row["depression"]},
            { 'label': "Alcohol use disorders", y: row["alcohol"]}
          ]
        }]
      });
      chartPie.render();
    });
  });

  /* function updateChart() {
    counterPie++;
    data = filter_data_country();
    filter_data_year(data, 1990 + counterPie).then(function(d) {
      d.map(function(row) {
        var dps = chart.options.data[0].dataPoints;

        dps[0] = { label: "Schizophrenia", y: row["schizophrenia"], color: "#FF2500" };
        dps[1] = { label: "Bipolar disorder", y: row["bipolar"], color: "#FF2500" };
        dps[2] = { label: "Eating disorders", y: row["eating"], color: "#FF2500" };
        dps[3] = { label: "Anxiety disorders", y: row["anxiety"], color: "#FF2500" };
        dps[4] = { label: "Drug use disorders", y: row["drug"], color: "#FF2500" };
        dps[5] = { label: "Depression", y: row["depression"], color: "#FF2500" };
        dps[6] = { label: "Alcohol use disorders", y: row["alcohol"], color: "#FF2500" };

        chart.options.data[0].dataPoints = dps; 
        chart.render();
      });
    });
  };

  updateChart();

  setInterval(function() {updateChart()}, 500); */

}

// var counterChart = 1;


function showGraph(year) {
  var data = filter_data_country();
  filter_data_year(data, year).then(function(d) {
    if (d.length == 0) {
      var element = document.getElementById("noData");
      element.style.display = "block";
      element.innerHTML = "<h3>No Data Found for " + window.countryCode + " </h3>";
      document.getElementById("chartContainer").style.display = "none";
      document.getElementById("pieContainer").style.display = "none";
    }
    d.map(function(row) {
      var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light4",
        backgroundColor: "beige",
        title: {
          text: "Percentage of " + row["entity"] + " Total Population" ,
          fontFamily: "avenir",
          fontColor: "#003366",
        },
        axisY: {
          title: "Country's Population (%)",
          suffix: " %",
          maximum: 9.0,
        },
        data: [{
          type: "bar",	
          yValueFormatString: "#0.##'%'",
          indexLabel: "{y}",
          fontFamily: "avenir",
          dataPoints: [
            { label: "Schizophrenia", y: row["schizophrenia"]},
            { label: "Bipolar disorder", y: row["bipolar"]},
            { label: "Eating disorders", y: row["eating"]},
            { label: "Anxiety disorders", y: row["anxiety"]},
            { label: "Drug use disorders", y: row["drug"]},
            { label: "Depression", y: row["depression"]},
            { label: "Alcohol use disorders", y: row["alcohol"]}
          ]
        }]
      });
      chart.render();
    });
  });

  /* function updateChart() {
    counterChart++;
    data = filter_data_country();

    filter_data_year(data, year).then(function(d) {
      d.map(function(row) {
        var dps = chart.options.data[0].dataPoints;

        dps[0] = { label: "Schizophrenia", y: row["schizophrenia"] * 10, color: "#FF2500" };
        dps[1] = { label: "Bipolar disorder", y: row["bipolar"] * 10, color: "#FF2500" };
        dps[2] = { label: "Eating disorders", y: row["eating"] * 10, color: "#FF2500" };
        dps[3] = { label: "Anxiety disorders", y: row["anxiety"] * 10, color: "#FF2500" };
        dps[4] = { label: "Drug use disorders", y: row["drug"] * 10, color: "#FF2500" };
        dps[5] = { label: "Depression", y: row["depression"] * 10, color: "#FF2500" };
        dps[6] = { label: "Alcohol use disorders", y: row["alcohol"] * 10, color: "#FF2500" };

        chart.options.data[0].dataPoints = dps; 
        chart.render();
      });
    });
  };

  updateChart();

  setInterval(function() {updateChart()}, 500);*/

}

function getColor(d) {
  return d > 17 ? '#800026' :
         d > 15  ? '#BD0026' :
         d > 13  ? '#E31A1C' :
         d > 11  ? '#FC4E2A' :
         d > 9   ? '#FD8D3C' :
         d > 7   ? '#FEB24C' :
                  '#FFEDA0';
                    
}

// Update the current slider value and render a new plot
slider.oninput = function() {
  output.innerHTML = this.value;
  window.sliderYear = this.value;
  showGraph(this.value);
  showPie(this.value);
}

window.showGraph = showGraph;
window.showPie = showPie;
