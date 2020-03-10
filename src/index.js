document.getElementById("close").onclick = function() {
  document.getElementById("mapid").style.width = "680px";
  document.getElementById("container").style.display = "none";
  document.getElementById("chartContainer").style.display = "none";
  document.getElementById("pieContainer").style.display = "none";
  var schi = document.getElementById("schi-definition").classList;
  schi.remove("beige");
  var bp = document.getElementById("bp-definition").classList;
  bp.remove("beige");
  var eat = document.getElementById("eat-definition").classList;
  eat.remove("beige");
  var an = document.getElementById("an-definition").classList;
  an.remove("beige");
  var drug = document.getElementById("drug-definition").classList;
  drug.remove("beige");
  var dp = document.getElementById("dp-definition").classList;
  dp.remove("beige");
  var jiu = document.getElementById("jiu-definition").classList;
  jiu.remove("beige");
  window.resetMap();
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
window.all_data = all_data

var slider = document.getElementById("yearRange");
var output = document.getElementById("yearDisplay");
var disorder = document.getElementById("disorder");

output.innerHTML = slider.value; // Display the default slider value
window.sliderYear = slider.value;
window.disorder_type = disorder.value;
// returns a Promise of filtered csv array from all_data
function filter_data_country(c) {
  return all_data.then(function(d) {
      var d_filtered =  d.filter(function(row) {
          return row["code"] == c;
      });
      return d_filtered;
  });
}
window.filter_data_country = filter_data_country;

function filter_data_year(data, year) {
  return data.then(function(d) {
    var d_filtered =  d.filter(function(row) {
        return row["year"] == year;
    });
    return d_filtered;
  });
}
window.filter_data_year = filter_data_year;

// var counterPie = 1;

function clickSchi() {
  var myButtonClasses = document.getElementById("schi-definition").classList;
  console.log("get id!");
  if (myButtonClasses.contains("beige")) {
    console.log("remove highlight");
    myButtonClasses.remove("beige");
  } else {
    console.log("add highlight");
    myButtonClasses.add("beige");
  }
}

function clickBp() {
  var myButtonClasses = document.getElementById("bp-definition").classList;
  console.log("get id!");
  if (myButtonClasses.contains("beige")) {
    console.log("remove highlight");
    myButtonClasses.remove("beige");
  } else {
    console.log("add highlight");
    myButtonClasses.add("beige");
  }
}

function clickEat() {
  var myButtonClasses = document.getElementById("eat-definition").classList;
  console.log("get id!");
  if (myButtonClasses.contains("beige")) {
    console.log("remove highlight");
    myButtonClasses.remove("beige");
  } else {
    console.log("add highlight");
    myButtonClasses.add("beige");
  }
}

function clickAn() {
  var myButtonClasses = document.getElementById("an-definition").classList;
  console.log("get id!");
  if (myButtonClasses.contains("beige")) {
    console.log("remove highlight");
    myButtonClasses.remove("beige");
  } else {
    console.log("add highlight");
    myButtonClasses.add("beige");
  }
}

function clickDrug() {
  var myButtonClasses = document.getElementById("drug-definition").classList;
  console.log("get id!");
  if (myButtonClasses.contains("beige")) {
    console.log("remove highlight");
    myButtonClasses.remove("beige");
  } else {
    console.log("add highlight");
    myButtonClasses.add("beige");
  }
}

function clickDp() {
  var myButtonClasses = document.getElementById("dp-definition").classList;
  console.log("get id!");
  if (myButtonClasses.contains("beige")) {
    console.log("remove highlight");
    myButtonClasses.remove("beige");
  } else {
    console.log("add highlight");
    myButtonClasses.add("beige");
  }
}

function clickJiu() {
  var myButtonClasses = document.getElementById("jiu-definition").classList;
  console.log("get id!");
  if (myButtonClasses.contains("beige")) {
    console.log("remove highlight");
    myButtonClasses.remove("beige");
  } else {
    console.log("add highlight");
    myButtonClasses.add("beige");
  }
}


function showPie(year) {
  var data = filter_data_country(window.countryCode);

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
          toolTipContent: "<b>{label}</b>: Click to see highlighted definition below",
          indexLabelFontSize: 16,
          indexLabel: "{label} - #percent%",
          percentFormatString: "#0.##",
          fontFamily: "avenir",
          explodeOnClick: false,
          showInLegend: true,
          dataPoints: [
            { 'label': "Schizophrenia", y: row["schizophrenia"], name: "Schizophrenia", click: clickSchi},
            { 'label': "Bipolar disorder", y: row["bipolar"], name: "Bipolar", click: clickBp},
            { 'label': "Eating disorders", y: row["eating"], name: "Eating", click: clickEat},
            { 'label': "Anxiety disorders", y: row["anxiety"], name: "Anxiety", click: clickAn},
            { 'label': "Drug use disorders", y: row["drug"], name: "Drug use", click: clickDrug},
            { 'label': "Depression", y: row["depression"], name: "Depression", click: clickDp},
            { 'label': "Alcohol use disorders", y: row["alcohol"],name: "Alcohol use", click: clickJiu}
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
  var data = filter_data_country(window.countryCode);
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
          toolTipContent: "<b>{label}</b>: Click to see highlighted definition below",
          indexLabel: "{y}",
          fontFamily: "avenir",
          dataPoints: [
            { 'label': "Schizophrenia", y: row["schizophrenia"], click: clickSchi},
            { 'label': "Bipolar disorder", y: row["bipolar"], click: clickBp},
            { 'label': "Eating disorders", y: row["eating"], click: clickEat},
            { 'label': "Anxiety disorders", y: row["anxiety"], click: clickAn},
            { 'label': "Drug use disorders", y: row["drug"], click: clickDrug},
            { 'label': "Depression", y: row["depression"], click: clickDp},
            { 'label': "Alcohol use disorders", y: row["alcohol"], click: clickJiu}
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


// Update the current slider value and render a new plot
slider.oninput = function() {
  output.innerHTML = this.value;
  window.sliderYear = this.value;
  showGraph(this.value);
  showPie(this.value);
  window.updateMap();
}
disorder.oninput = function() {
  window.disorder_type = disorder.value;
  window.updateMap();
}
window.showGraph = showGraph;
window.showPie = showPie;

