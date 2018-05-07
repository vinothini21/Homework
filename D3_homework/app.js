var margin = {top: 20, right: 40, bottom: 60, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

/* 
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */ 

// setup x 
var xValue = function(d) { return d["Income_100,000_or_more"];}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(7);

// setup y
var yValue = function(d) { return d.College_or_more;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
var cValue = function(d) { return d.stateName;},
   color = d3.scale.category10();

// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// load data
d3.csv("data.csv", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.College_or_more = +d.College_or_more;
    d["Income_100,000_or_more"] = +d["Income_100,000_or_more"];
//    console.log(d);
  });

  // don't want circle overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);
 
  var currentAxisLabelX = "Income_100,000_or_more";
  var currentAxisLabelY = "College_or_more";

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height  + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "x label")
      .attr("x",  width/ 3)
      .attr("y",  0 - margin.right + 80)
      .attr("font-family", "sans-serif")
      .attr("font-size", "15px")
      .attr("font-weight", "bold")
      .text("Income 100,000+");
      
  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "y label")
      .attr("transform", "rotate(-90)")
      .attr("y",  0 - margin.left + 50)
      .attr("dy", "1em")
      .attr("x", 0 - height / 1.5)
      .attr("font-weight", "bold")
      .attr("font-family", "sans-serif")
      .attr("font-size", "15px")
      .text("Atleast a degree");

  // draw circle for the points
  svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("r", 9)
      .attr("fill", "skyblue")
      .attr("cx", xMap)
      .attr("cy", yMap)
      //.style("fill", function(d) { return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d["stateName"] + "<br/> (" + xValue(d) 
	        + ", " + yValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
  svg.selectAll("circleText")
    .data(data)
    .enter()
    .append("text")
    .attr("dx", function (data, index) {
      return xScale(+data[currentAxisLabelX]) - 5
    })
    .attr("dy", function (data) {
      return yScale(+data[currentAxisLabelY]) + 2
    })
    .text(function (data, index) {
      return data.State;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "8px")
    .style("fill", "red");

  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
      
      
  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", red);
      

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})
});
d3.select(window).on('resize', resize); 

function resize() {
    // update width
    width = parseInt(d3.select('#chart').style('width'), 100);
    width = width - margin.left - margin.right;
    x.range([0, width]);

    
}