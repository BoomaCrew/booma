// The following code was written for Booma, LLC.  All rights reserved, July 2016.


//THE MAP

    //Initialize Map on Page^
    mapboxgl.accessToken = 'pk.eyJ1IjoiYm9vbWEiLCJhIjoiZmJlMjI0OTNiNDkwODEzZTQzM2ZiNGM4M2ViZjE1NTAifQ.r4uKg2eQt3L_lUEal0fvrg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/booma/ciqio020x0004banadd9t9xm8',
        // leaves out center and zoom, set bounds immediately after
    });

    //Set map's bounds^
    map.fitBounds([[6.25, 47.35], [19.0, 36.35]]);


    //Add navigation controls
    map.addControl(new mapboxgl.Navigation());


    //Adds data on load
    map.on('load', function () {
            
        
        //Adds source (must be combined with .addLayer below)    
        map.addSource("points", {
            "type": "geojson",
            "data": url
        });
        
      //Adds source (.addLayer must be combined with .addSource above)
            //Initial data layer
            map.addLayer({
                "id": "points",
                "type": "symbol",
                "source": "points",
                "layout": {
                    "icon-image": "{icon}-15",
                    //"text-field": "{title}",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top"
                },
                "paint": {
                    "text-color": "blue",  //not necessary since no labels are shown
                    "icon-color": "blue"  //not working with current icons
                }
            });

    });

//THE DATA

    var url = '../geojson/inferno.geojson';
    //The GeoJSON DATA
    var points = 
        {
        "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [11.2558, 43.7696]
                },
                "properties": {
                    "title": "Florence",
                     "icon": "circle",
                     "zoom": 10,
                     "canto": 1,
                     "locImages": ["image Test", "Now what"],
                     "textDesc": "<p>The first reference to Dante's home city of Florence does not occur in the book until Circle Three where the two travelers encounter Ciacco among the Gluttons.  While there is no historical record of a Ciacco in Florence during the time of Dante, the character claims to the poets that he is from Dante's own divided city.</p><p>Following the tradition laid out in both Odysseus's trip to the Underworld in the <em>Odyssey</em> and Aeneas's in the <em>Aeneid</em>, the souls in Dante's Hell deliver prophecies.  Ciacco is the first character to do this in the <em>Inferno</em>, telling Dante about the political infighting among the Guelphs that, though not referenced here specifically, will lead to Dante's exile from his beloved Florence.</p>",
                     "worldDesc": "<p>The first reference to Dante's home city of Florence does not occur in the book until Circle Three where the two travelers encounter Ciacco among the Gluttons.  While there is no historical record of a Ciacco in Florence during the time of Dante, the character claims to the poets that he is from Dante's own divided city.</p><p>Following the tradition laid out in both Odysseus's trip to the Underworld in the <em>Odyssey</em> and Aeneas's in the <em>Aeneid</em>, the souls in Dante's Hell deliver prophecies.  Ciacco is the first character to do this in the <em>Inferno</em>, telling Dante about the political infighting among the Guelphs that, though not referenced here specifically, will lead to Dante's exile from his beloved Florence.</p><p>Florence is Fantastic</p>",
                    "footnotes": "footnote test",
                    "links": "link test"
                 }
             }, {
                 "type": "Feature",
                 "geometry": {
                     "type": "Point",
                     "coordinates": [12.2035, 44.4184]        
                 },
                 "properties": {
                     "title": "Ravenna",
                     "icon": "circle",
                     "zoom": 14,
                     "canto": 1,
                     "locImages": "",
                     "textDesc": "<p>Among the Carnal in Circle Three, Francesca and her lover Paolo descend from the whirlwind that blows them around to share their story of lust with Dante.  Francesca introduces herself as being from the place where the Po River empties into the Adriatic Sea, a refrence to her birthplace Ravenna.</p>",
                     "worldDesc": "<p>Ravenna is Ravishing!</p>",
                     "footnotes": "",
                     "links": "",
                 }
             }, {
                 "type": "Feature",
                 "geometry": {
                     "type": "Point",
                     "coordinates": [15.9934, 38.7510],
                 },
                 "properties": {
                     "title": "Mongibello2",
                     "icon": "circle",
                     "zoom": 6,
                     "canto": 4,
                     "locImages": "image test",
                     "textDesc": "<p>The first sinner Dante and Virgil encounter among the Violent Against God in the Third Round of Circle Seven is Campaneus, who was struck down by one of Jupiter's (or Zeus's) lightning bolts as he stormed the walls of Thebes.  While he his punished by laying on the burning plain of sand he still defies God, saying that all of the workers in Mongibello would have been worn out making lightening bolts before Jupiter would have earned any concessions from him.  Mongibello is an Italian name for Mount Etna, the volcanic peak on Sicily where, Vulcan kept his smithy.</p>",
                     "worldDesc": "<p>Mongibello is another name for Mount Etna</p>",
                     "footnotes": "footnote test",
                     "links": "link test"
                 }
             }, {
                 "type": "Feature",
                 "geometry": {
                     "type": "Point",
                     "coordinates": [14.9934, 37.7510],
                 },
                 "properties": {
                     "title": "Mongibello",
                     "icon": "circle",
                     "zoom": 6,
                     "canto": 2,
                     "locImages": "Image Test",
                     "textDesc": "<p>The first sinner Dante and Virgil encounter among the Violent Against God in the Third Round of Circle Seven is Campaneus, who was struck down by one of Jupiter's (or Zeus's) lightning bolts as he stormed the walls of Thebes.  While he his punished by laying on the burning plain of sand he still defies God, saying that all of the workers in Mongibello would have been worn out making lightening bolts before Jupiter would have earned any concessions from him.  Mongibello is an Italian name for Mount Etna, the volcanic peak on Sicily where, Vulcan kept his smithy.</p>",
                     "worldDesc": "<p>Mongibello is another name for Mount Etna</p>",
                     "footnotes": "footnote test",
                     "links": "link test"
                 }
            }]
    }
  
    //End GeoJSON

/*

//INTERACTING WITH THE MAP

    //Make points clickable and centerable


        //When a point is clicked, fly to point, center map, and throw data to sidebar divs
        map.on('click', function (e) {
            displayInfo(e);
        });

        function displayInfo(e) {
            // Use queryRenderedFeatures to get features at a click event's point
            // Use layer option to avoid getting results from other layers
            var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
            // if there are features within the given radius of the click event,
            // fly to the location of the click event
            if (features.length) {
                // Get coordinates from the symbol and center the map on those coordinates
                map.flyTo({center: features[0].geometry.coordinates, zoom: features[0].properties.zoom}); //can add pitch and bearing too

                document.getElementById("title").innerHTML = features[0].properties.title;
                document.getElementById("loc-images").innerHTML = features[0].properties.locImages;
                document.getElementById("text-desc").innerHTML = features[0].properties.textDesc;
                document.getElementById("world-desc").innerHTML = features[0].properties.worldDesc;
                document.getElementById("footnotes").innerHTML = features[0].properties.footnotes;
                document.getElementById("links").innerHTML = features[0].properties.links;

            }    
        };

        //When a location from the table of contents is clicked, fly to point, center map, and send data to sidebar divs
        function displayInfoSB(locNum) {
                map.flyTo({center: points.features[locNum].geometry.coordinates, zoom: points.features[locNum].properties.zoom}); //can add pitch and bearing too

                document.getElementById("title").innerHTML = points.features[locNum].properties.title; 
                document.getElementById("loc-images").innerHTML = points.features[locNum].properties.locImages;
                document.getElementById("text-desc").innerHTML = points.features[locNum].properties.textDesc;
                document.getElementById("world-desc").innerHTML = points.features[locNum].properties.worldDesc;
                document.getElementById("footnotes").innerHTML = points.features[locNum].properties.footnotes;
                document.getElementById("links").innerHTML = points.features[locNum].properties.links;
            };


    //Create popups on hover

        //Create a popups
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        //Add popups to the map when the cursor moves over a point 
        map.on('mousemove', function(e) {
            hoverAction(e);
        });
        

        function hoverAction(e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

            if (!features.length) {
                popup.remove();
                return;
            }

            var feature = features[0];

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(feature.geometry.coordinates)
                .setHTML(feature.properties.title)
                .addTo(map);
        };


        //Add popups to the map when the cursor moves over a link in the sidebar
        function hoverActionSB(locNum) {

        var feature = points.features[locNum];

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(feature.geometry.coordinates)
                .setHTML(feature.properties.title)
                .addTo(map);

        }


    
        
        //Populate canto selector drop down menu
            //Identify which cantos have content
            var cantos = [];
            points.features.forEach(function(feature) {
                var canNum = feature.properties['canto'];    

                    if (cantos.indexOf(canNum) == -1) {
                        cantos.push(canNum);
                    }

                cantos.sort();
            });

            //Add canto numbers to dropdown list
            for(var i = 0; i < cantos.length; i++) {
                var newCanto = document.getElementById("cantoSelDD").appendChild(document.createElement('li'));
                newCanto.innerHTML = "<a onClick='displayCanto(" + cantos[i] + 
                    ")'>" + cantos[i] + "</a>";

            }; 

        
        
      

            //Add location titles to the Table of Contents
            for (var i = 0; i < points.features.length; i++) {
                var newLoc = document.getElementById("mapContents").appendChild(document.createElement('div'));
                newLoc.innerHTML = "<a onClick='displayInfoSB(" + i + ")' onmouseover='hoverActionSB(" + i + ")' onmouseout='popup.remove()' >" + points.features[i].properties['title'] + "</a>";
            }

     });

            //Refreshes map and sidebar when a new Canto is selected
            //Resets map view and and clears content divs
            function displayCanto(cantoNum){
                map.fitBounds([[6.25, 47.35], [19.0, 36.35]]);    
                document.getElementById("mapContents").innerHTML = "";
                document.getElementById("title").innerHTML = ""; 
                document.getElementById("loc-images").innerHTML = "";
                document.getElementById("text-desc").innerHTML = "<em style='color: grey'>Select a location from the map or from the Table of Contents above.</em>";
                document.getElementById("world-desc").innerHTML = "";
                document.getElementById("footnotes").innerHTML = "";
                document.getElementById("links").innerHTML = "";

                
                //Creates a new layer specific to Canto Selector set to 'All'
                //Adds source (.addLayer must be combined with .addSource above)
                if (cantoNum < 0) {
                    document.getElementById("cantoSel").innerHTML = "All" + ' <span class="caret"></span>';
                    map.addLayer({
                        "id": "points",
                        "type": "symbol",
                        "source": "points",
                        "layout": {
                            "icon-image": "{icon}-15",
                            //"text-field": "{title}",
                            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                            "text-offset": [0, 0.6],
                            "text-anchor": "top"
                        },
                        "paint": {
                            "icon-color": "blue"
                        }
                    });

                    
                    //Repopulates Table of Contents with data from newly created layer
                    for (var i = 0; i < points.features.length; i++) {
                        var newLoc = document.getElementById("mapContents").appendChild(document.createElement('div'));
                        newLoc.innerHTML = "<a onClick='displayInfoSB(" + i + ")' onmouseover='hoverActionSB(" + i + ")' onmouseout='popup.remove()'>" + points.features[i].properties['title'] + "</a>";
                    }   

                } 
                
                //Creates a new layer specific to Canto Selector selection
                else {
                    
                    //Set the Canto Selector number
                    document.getElementById("cantoSel").innerHTML = cantoNum + ' <span class="caret"></span>';

                    //Adds source (.addLayer must be combined with .addSource above)
                    map.addLayer({
                        "id": "points",
                        "type": "symbol",
                        "source": "points",
                        "layout": {
                            "icon-image": "{icon}-15",
                            //"text-field": "{title}",
                            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                            "text-offset": [0, 0.6],
                            "text-anchor": "top"
                        },
                        "paint": {
                            "icon-color": "blue"
                        },
                        "filter": ["==", "canto", cantoNum]
                    });

                    //Repopulates Table of Contents with data from newly created layer
                    for (var i = 0; i < points.features.length; i++) {
                        if(points.features[i].properties['canto'] == cantoNum) {
                            var newLoc = document.getElementById("mapContents").appendChild(document.createElement('div'));
                            newLoc.innerHTML = "<a onClick='displayInfoSB(" + i + ")' onmouseover='hoverActionSB(" + i + ")' onmouseout='popup.remove()'>" + points.features[i].properties['title'] + "</a>";
                        }
                    }
                }
            }


            //Resets map
            function mapRefresh(){
                map.fitBounds([[6.25, 47.35], [19.0, 36.35]]); 
            }




    
    */
  


