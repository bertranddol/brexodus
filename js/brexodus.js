var w = 800;
var h = 600;
var palette = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];

reglette( "climat" )
reglette( "english" )
reglette( "finance" )
for ( ii = 4 ; ii < 11 ; ii++ ) { 
	reglette( "leDial"+ii)
}
afficheLaCarte() ;

function reglette( dialName ) {
	var svg = d3.select( "#"+ dialName ),
	    margin = {right: 10, left: 10, top:0 , bottom:0 },
	    width = +svg.attr("width") - margin.left - margin.right,
	    height = +svg.attr("height");
	
	var x = d3.scaleLinear()
	    .domain([0, 100])
	    .range([0, width])
	    .clamp(true);
	
	var slider = svg.append("g")
	    .attr("class", "slider")
	    .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");
	
	slider.append("line")
	    .attr("class", "track")
	    .attr("x1", x.range()[0])
	    .attr("x2", x.range()[1])
	  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
	    .attr("class", "track-inset")
	  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
	    .attr("class", "track-overlay")
	    .call(d3.drag()
	        .on("start.interrupt", function() { slider.interrupt(); })
	        .on("start drag", function() { hue(x.invert(d3.event.x)); }));
	
	slider.insert("g", ".track-overlay")
	    .attr("class", "ticks")
	    .attr("transform", "translate(0," + 18 + ")")
	  .selectAll("text")
	  .data(x.ticks(4))
	  .enter().append("text")
	    .attr("x", x)
	    .attr("text-anchor", "middle")
	    .text(function(d) { return d + "%"; });
	
	var handle = slider.insert("circle", ".track-overlay")
	    .attr("class", "handle")
	    .attr("r", 9);
	
	slider.transition() // Gratuitous intro!
	    .duration(750)
	    .tween("hue", function() {
	      var i = d3.interpolate(0, 50);
	      return function(t) { hue(i(t)); };
	    });
	
	function hue(h) {
	  handle.attr("cx", x(h));
	  svg.style("background-color", d3.hsl(h, 0.8, 0.8));
	  adjustScore( dialName , h)
	}
	
	
}

function adjustScore(type,h) {
    for (i=0; i< pays.mesScores.length; i++) {
   		pays.mesScores[i][type] = Math.round( pays.laBase[i][type] * h/100 );
    }		    
    ajusterCouleur() ;
}

function ajusterCouleur() {
	for (i=0; i< pays.mesScores.length; i++) {
		lePays = pays.mesScores[i].name;
		var leScore = 0 , cnt = 0 ;
		for (var key in pays.mesScores[i]) {
			if (pays.mesScores[i].hasOwnProperty(key)) {
			    console.log(key + " -> " + pays.mesScores[i][key] );
			    if ( parseInt( pays.mesScores[i][key] ) > 0 ) {
			    	cnt ++ ;
			    	leScore += parseInt( pays.mesScores[i][key] ) ;
			    }
			}
		}
   		leScore = Math.round( leScore / cnt ) ;
		var x = document.getElementsByClassName( lePays );
   		var u = 0;
   		for (u = 0; u < x.length; u++) {
   		    x[u].setAttribute("fill",palette[ leScore ] );
   		}
    }	
}


//Define map projection
function afficheLaCarte() {
	var projection = d3.geo.mercator() //utiliser une projection standard pour aplatir les pôles, voir D3 projection plugin
						   .center([ 17, 47 ]) //comment centrer la carte, longitude, latitude
						   .translate([ w/2, h/2 ]) // centrer l'image obtenue dans le svg
						   .scale([ w/1.125 ]); // zoom, plus la valeur est petit plus le zoom est gros 
	
	//Define path generator
	var path = d3.geo.path()
					 .projection(projection);
	
	
	//Create SVG
	var svg = d3.select("#laCarte")
				.append("svg")
				.attr("width", w)
				.attr("height", h);
	
	//Load in GeoJSON data
	d3.json("data/countries_simplified.json", function(json) {
		//Bind data and create one path per GeoJSON feature
		svg.selectAll("path")
		   .data(json.features)
		   .enter()
		   .append("path")
		   .attr("d", path)
		   .attr("class", function(d,i) { return d.properties.sovereignt ; } )
		   .attr("stroke", "rgba(8, 81, 156, 0.2)")
	       .attr("fill", function(d,i) { return palette[d.properties.labelrank] ; }  );
	});
}		