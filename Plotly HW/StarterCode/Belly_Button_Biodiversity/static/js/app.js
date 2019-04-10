function buildMetadata(sample) {
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${sample}`).then(function(response) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use d3 to select the panel with id of `#sample-metadata`
    var panelSelect = d3.select('#sample-metadata');
  // Use `.html("") to clear any existing metadata
    panelSelect.html("");
  // Use `Object.entries` Object.entries(obj).sort((a, b) => b[0].localeCompare(a[0]));.
  // to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
    Object.entries(response).forEach(([key , value]) => {
    panelSelect.append("h6").text(`${key}: ${value}`);
  });

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
})}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(function(response) {
    // @TODO: Build a Bubble Chart using the sample data
    var bData = [{
      x: response.otu_ids,
      y: response.sample_values,
      text: response.otu_labels,
      mode: 'markers'

    }]

    var bLayout = {
      title: "Bubble Chart for BellyButton",
      xaxis: {
        title: "otu_ids"
      },
      yaxis: {
        title: "Sample Values"
      }
    };

    Plotly.newPlot("bubble", bData, bLayout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var pData = [
      {
        labels: response.otu_ids.slice(10),
        values: response.sample_values.slice(10),
        text: response.otu_labels.slice(10),
        type: 'pie'
      }]
    var pLayout = {
      height: 400,
      width: 500
    }
    Plotly.plot('pie', pData , pLayout );})
  };

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
