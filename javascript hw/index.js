// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);


// Set filtereddata to dataSet initially
var filteredData = dataSet;

// renderTable renders the filtereddata to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredData.length; i++) {
    // Get get the current data object and its fields
    var data = filteredData[i];
    var fields = Object.keys(data);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the data object, create a new cell at set its inner text to be the current value at the current data field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = data[field];
    }
  }
}
// Filter by Date/time
function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDatetime = $datetimeInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase(); 
  var filterShape = $shapeInput.value.trim().toLowerCase();

  
  // Set filtereddata to an array of all data whose "datetime" matches the filter
  filteredData = dataSet.filter(function(data) {
    var dataDatetime = data.datetime.toLowerCase();
    var dataCity = data.city.toLowerCase();
    var dataState = data.state.toLowerCase();
    var dataCountry = data.country.toLowerCase();
    var dataShape = data.shape.toLowerCase();

    // filtering the columns
    var filteredFields =
      (filterDatetime === "" || dataDatetime === filterDatetime) &&
      (filterCity === "" || dataCity === filterCity) &&
      (filterState === "" || dataState === filterState) &&
      (filterCountry === "" || dataCountry === filterCountry) &&
      (filterShape === "" || dataShape === filterShape);
    return filteredFields;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();
