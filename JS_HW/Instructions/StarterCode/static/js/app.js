//  1.  Using the UFO dataset provided in the form of an array of JavaScript objects,
//write code that appends a table to your web page and then adds new rows of data
//for each UFO sighting.
//   2.  Make sure you have a column for date/time, city, state, country, shape, and
// comment at the very least.
//   3.  Use a date form in your HTML document and write JavaScript code that will
//LISTEN for events and search through the date/time column to find rows that
//match user input.

// from data.js
var tableData = data;

// YOUR CODE HERE!
//table guide https://www.youtube.com/watch?v=XFGtGzZhy_A
// Get a reference to the table body
var tbody = d3.select("tbody");
// // Step 1: Loop Through `data`// data.forEach(function(weatherReport) {
// // Step 2:  Use d3 to append one table row `tr` for each weather report ObjectValue
// // Don't worry about adding cells or text yet, just try appending the `tr` elements.
tableData.forEach(function(dRow) {
  var row = tbody.append("tr");
  Object.values(dRow).forEach(function(value) {
    var rowData = row.append("td");
      rowData.text(value);
    }
  )}
);


var submit = d3.select("#submit");
submit.on("click", function() {

  // Select the input element and get the raw HTML node
  var queryElement = d3.select("#datetime");
  var queryValue = inputElement.property("value");
  // Apply `filter` to the table data to only keep the
  // rows where the value matches the filter value
  var row = tbody.append("tr");
  var filteredData = tableData.filter(row => row.datetime === queryElement);
  var tbody = d3.select("tbody");
  filteredData.forEach(function(dRow) {
    var fRow = tbody.append("tr");
    Object.values(dRow).forEach(function(value) {
      var rowData = fRow.append("td");
        rowData.text(value);})})})
