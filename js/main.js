/**
THIS FUNCTION IS CALLED WHEN THE WEB PAGE LOADS. PLACE YOUR CODE TO LOAD THE 
DATA AND DRAW YOUR VISUALIZATION HERE. THE VIS SHOULD BE DRAWN INTO THE "VIS" 
DIV ON THE PAGE.

This function is passed the variables to initially draw on the x and y axes.
**/
function init(xAxis, yAxis){
	var w = 540;
	var h = 540;
	var padding = 5;
	var dataset = [];

	//Selecting svg element
	var svg = d3.select("#vis")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	//Scale functions
	var xScale = d3.scale.linear()
	    .domain([5, 10])
	    .range([0, w]);

    var yScale = d3.scale.linear()
	    .domain([2, 4])
	    .range([0, h]);

	//Getting data from csv file
	d3.csv("/data/data.csv", function(data) {
		dataset = data;

		//Adding circles to svg element
		svg.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
				console.log(+d[xAxis]);
				return xScale(+d[xAxis]);
			})
			.attr("cy", function(d) {
				return yScale(+d[yAxis]);
			})
			.attr("r", 5);
	});
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
