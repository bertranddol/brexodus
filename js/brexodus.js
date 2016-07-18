var w = 800;
var h = 600;
var palette = ["#F41F0A", "#D35B3B", "#9BBB9B", "#40A040", "#107710"];


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
	        .on("start drag", function() { mesChoix( dialName , x.invert(d3.event.x) ) ; hue(x.invert(d3.event.x)); }));
	
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
	      return function(t) { mesChoix( dialName , i(t) ) ; hue( i(t));  };
	    });
	
	function hue(h) {
	  handle.attr("cx", x(h));
	  svg.style("background-color", d3.hsl(h, 0.8, 0.8));
	}
	
	
}

function mesChoix(dialName, coeff) {
	choixArr[dialName] = coeff ;
	ajusterScorePays( dialName , h)
}

function ajusterScorePays(type,h) {
	var scorePays = [] ;
	// Loop pays
	for (i=0; i< pays.mesScores.length; i++) {
		lePays = pays.mesScores[i].name;
		var leScore = 0 , cnt = 0 ;
		// Loop choix
		for (var categ in pays.mesScores[i]) {
			if (pays.mesScores[i].hasOwnProperty(categ)) {
			    if ( parseInt( pays.mesScores[i][categ] ) > 0 & ( choixArr[categ] > 0)  ) {
			    	cnt ++ ;
			    	leScore += pays.mesScores[i][categ] * choixArr[categ] ;//parseInt( pays.mesScores[i][key] ) ;
			    }
			}
		}
   		leScore = leScore/cnt/100 ;
   	    ajusterCouleurUnPays( lePays , leScore ) ;
	}   
}

function ajusterCouleurUnPays( lePays , leScore ) {
	// Loop pays
	var tot = 0 , eng =0, sd =0 , n=pays.mesScores.length ;
	for (pp=0; pp< n; pp++) {
		xs = pays.mesScores[pp].robbery*-1 // chomage*-1 // english // rainfall*-1
		if ( pays.mesScores[pp].name == 'United Kingdom' ) eng = xs
		if ( pays.mesScores[pp].name == lePays ) leScore = xs
	    tot += xs
	    sd += Math.pow(( xs - eng) , 2)
	}
	mean = tot / n
	//eng = mean
	sd = sd / n
	sd = Math.sqrt( sd )
	console.log( "tot for climat = " + tot ) 
	console.log( "sd for climat = " + sd ) 
	console.log( "mean for climat = " + mean ) 
	console.log( "eng for climat = " + eng ) 
	
	
	//
	var x = document.getElementsByClassName( lePays );
   	var u = 0, coco = 2; // 
   	for (u = 0; u < x.length; u++) {
   		if ( leScore <  ( eng - (1*sd) ) ) coco = 0 
   		if ( leScore <  ( eng - (.5*sd) ) ) coco = 1
   		//if ( leScore >= ( eng ) ) coco = 2
   		if ( leScore >  ( eng + (.5*sd) ) ) coco = 3  // top 25%
   		if ( leScore >  ( eng + (1*sd) ) ) coco = 4 // top 13.6% of normal distribution
   		
//   		yoyo = Math.round( leScore % 4)
	//	if ( yoyo > 4 ) yoyo = 4 ;
   		console.log( "for " + lePays + " coco="+ coco )
	    x[u].setAttribute("fill",palette[ coco ] );
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
	       //.attr("fill", function(d,i) { return couleurMoi(i , d.properties.sovereignt) ; }  )
	       ;
	});
}		

function couleurMoi( i , unPays ) {
	var u = i % 5
	if ( u == 4 ) u = 0 ;
	return palette[u]
}