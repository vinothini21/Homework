// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
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

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterdatetime = $datetimeInput.value.trim().toLowerCase();

  // Set filtereddata to an array of all data whose "datetime" matches the filter
  filteredData = dataSet.filter(function(data) {
    var dataDatetime = data.datetime.toLowerCase();

    // If true, add the datetime to the filtereddata, otherwise don't add it to filtereddata
    return dataDatetime === filterdatetime;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();
