/**
THIS FUNCTION IS CALLED WHEN THE WEB PAGE LOADS. PLACE YOUR CODE TO LOAD THE 
DATA AND DRAW YOUR VISUALIZATION HERE. THE VIS SHOULD BE DRAWN INTO THE "VIS" 
DIV ON THE PAGE.

This function is passed the variables to initially draw on the x and y axes.
**/
function init(xAxisLabel, yAxisLabel){
	var w = 1024;
	var h = 540;
	var padding = 20;
	var dataset = [];

	//Selecting svg element
	var svg = d3.select("#vis")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	//Scale functions
	var xScale = d3.scale.linear()
	    .domain([5, 7])
	    .range([padding, w-padding]);

    var yScale = d3.scale.linear()
	    .domain([2.5, 4.5])
	    .range([h-padding, padding]);

	//Getting data from csv file
	d3.csv("/data/data.csv", function(data) {
		dataset = data;

		//Adding circles to svg element
		svg.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
				return xScale(+d[xAxisLabel]);
			})
			.attr("cy", function(d) {
				return yScale(+d[yAxisLabel]);
			})
			.attr("r", 5);

		svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.text(function(d) {
				return d[xAxisLabel] + ", " + d[yAxisLabel];
			})
			.attr("x", function(d) {
				return xScale(+d[xAxisLabel]);
			})
			.attr("y", function(d) {
				return yScale(+d[yAxisLabel]);
			})
			.attr("font-family", "sans-serif")
			.attr("font-size", "12px")
			.attr("fill", "red");
	});

	//Axes
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");

	//Added axes to document
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis);

}

/**
## onXAxisChange(value)
This function is called whenever the menu for the variable to display on the
x axis changes. It is passed the variable name that has been selected, such as
"compactness". Populate this function to update the scatterplot accordingly.
**/
function onXAxisChange(value){

}


/**
## onYAxisChange(value)
This function is called whenever the menu for the variable to display on the
y axis changes. It is passed the variable name that has been selected, such as
"Asymmetry Coefficient". Populate this function to update the scatterplot 
accordingly.
**/
function onYAxisChange(value){

}

/**
## showDetails(string)
This function will display details in the "details" box on the page. Pass in 
a string and it will be displayed. For example, 
    showDetails("Variety: " + item.variety);
**/
function showDetails(string){
    d3.select('#details').html(string);
}
