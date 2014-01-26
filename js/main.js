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
	colors = [d3.rgb("#17becf"), d3.rgb("#e6550d"), d3.rgb("#2ca02c")];
	selectColor = [d3.rgb("#0A5057"), d3.rgb("#813007"), d3.rgb("#164E16")];
	
	//Selecting svg element
	svg = d3.select("#vis")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	//Scale functions
	xScale = d3.scale.linear()
	    .range([padding, w-padding])
	    .nice();

    yScale = d3.scale.linear()
	    .range([h-padding, padding])
	    .nice();

	//Axes
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

	
	//Getting data from csv file
	d3.csv("/data/data.csv", function(data) {
		dataset = data;

		//Scale Functions
		xScale.domain(calculateDomain(dataset, xAxisLabel));

	    yScale.domain(calculateDomain(dataset, yAxisLabel));

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
			.attr("r", 6)
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
			})
			.on("click", function(d) { 
			
			changeOpacity(d["variety"]);
			if (d["variety"] == "Kama") {
					this.setAttribute("fill", selectColor[0]);
				}
				else if (d["variety"] == "Rosa") {
					this.setAttribute("fill", selectColor[1]);
				}
				else {
					this.setAttribute("fill", selectColor[2]);
				}
			return showDetails("Compactness: " + (+d["compactness"]) + "<br/> Kernel Length: " + (+d["kernelLength"]) + "<br/>Kernel Width: " + (+d["kernelWidth"]) + "<br/>Asymmetry Coefficient: " + (+d["asymmetryCoefficient"]) + "<br/>Groove Length: " + (+d["grooveLength"]));
			
			});

		//Added axes to document
		xAxisDisplay = svg.append("g")
			.attr("class", "axis xAxis")
			.attr("transform", "translate(0," + (h - padding) + ")")
			.call(xAxis)
			.append("text")
			.attr("class", "xlabel")
			.attr("x", w)
			.attr("y", -6)
			.style("text-anchor", "end")
			.text(xAxisLabel.replace(/([A-Z])/g, ' $1')
			.replace(/^./, function(str){ return str.toUpperCase(); }) + " (cm)");
		yAxisDisplay = svg.append("g")
			.attr("class", "axis yAxis")
			.attr("transform", "translate(" + padding + ", 0)")
			.call(yAxis)
			.append("text")
			.attr("class", "ylabel")
			.attr("dy", ".75em" )
			.attr("y", 6)
			.attr("transform", "rotate(-90)")
			.style("text-anchor", "end")
			.text(yAxisLabel.replace(/([A-Z])/g, ' $1')
			.replace(/^./, function(str){ return str.toUpperCase(); }) + " (cm)");
	});

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
			.attr("r", 6);


	//Recalculate domain
	xScale.domain(calculateDomain(dataset, value));
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
	//Update axis
	svg.selectAll("g.xAxis").call(xAxis);

	//Update text display
	svg.selectAll(".xlabel").text(value.replace(/([A-Z])/g, ' $1')
		.replace(/^./, function(str){ return str.toUpperCase(); }));
			
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
			.attr("r", 6);

	yScale.domain(calculateDomain(dataset, value));
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");
	svg.selectAll("g.yAxis").call(yAxis);

	//Update text display
	svg.selectAll(".ylabel").text(value.replace(/([A-Z])/g, ' $1')
		.replace(/^./, function(str){ return str.toUpperCase(); }));

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

function changeOpacity(type) {

	var circle = svg.selectAll("circle")
			.data(dataset);
			
	circle.enter().append("circle")
			.attr("r", 6);
			
	circle.attr("fill", function(d){
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
			
	circle.attr("opacity", function(d){ 
	
	if (d["variety"] != type) {
		return 0.2;
	} 
	else { 
		return 1;
	}
				
	});
	
	circle.exit().remove();


}
function calculateDomain(dataset, label) {
	var minimum = d3.min(dataset, function(d) {
		return +d[label]});
	var maximum = d3.max(dataset, function(d) {
		return +d[label]});
	return [minimum, maximum];

}
