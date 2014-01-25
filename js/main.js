/**
THIS FUNCTION IS CALLED WHEN THE WEB PAGE LOADS. PLACE YOUR CODE TO LOAD THE 
DATA AND DRAW YOUR VISUALIZATION HERE. THE VIS SHOULD BE DRAWN INTO THE "VIS" 
DIV ON THE PAGE.

This function is passed the variables to initially draw on the x and y axes.
**/
function init(xAxisLabel, yAxisLabel){
	var w = 1024;
	var h = 540;
	var padding = 40;
	dataset = [];
	var colors = [d3.rgb("#17becf"), d3.rgb("#e6550d"), d3.rgb("#2ca02c")];

	//Selecting svg element
	svg = d3.select("#vis")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	//Scale functions
	xScale = d3.scale.linear()
	    .domain([5, 7])
	    .range([padding, w-padding])
	    .nice();

    yScale = d3.scale.linear()
	    .domain([2.5, 4.5])
	    .range([h-padding, padding])
	    .nice();

	//Axes
	xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
	yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

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
			.attr("r", 5)
			.attr("fill", function(d){
				if (d["variety"] == "Kama") {
					return colors[0];
				}
				else if (d["variety"] == "Rosa") {
					return colors[1];
				}
				else {
					return colors[2];
				}
			});

	});

	//Added axes to document
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis)
		.append("text")
		.attr("class", "xlabel")
		.attr("x", w)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text(xAxisLabel + " (cm)");
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + padding + ", 0)")
		.call(yAxis)
		.append("text")
		.attr("class", "ylabel")
		.attr("dy", ".75em" )
		.attr("y", 6)
		.attr("transform", "rotate(-90)")
		.style("text-anchor", "end")
		.text(yAxisLabel + " (cm)");
}

/**
## onXAxisChange(value)
This function is called whenever the menu for the variable to display on the
x axis changes. It is passed the variable name that has been selected, such as
"compactness". Populate this function to update the scatterplot accordingly.
**/
function onXAxisChange(value){

	var circle = svg.selectAll("circle")
			.data(dataset);
			
	circle.enter().append("circle")
			.attr("r", 5);
			
	circle.attr("cx", function(d){return xScale(+d[value])});
	
	circle.exit().remove();
	

}


/**
## onYAxisChange(value)
This function is called whenever the menu for the variable to display on the
y axis changes. It is passed the variable name that has been selected, such as
"Asymmetry Coefficient". Populate this function to update the scatterplot 
accordingly.
**/
function onYAxisChange(value){

	var circle = svg.selectAll("circle")
			.data(dataset);
			
	circle.enter().append("circle")
			.attr("r", 5);
			
	circle.attr("cy", function(d){return yScale(+d[value])});
	
	circle.exit().remove();

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
