/*Changes made on this version:
* Made map_zoom a variable, so intitial zoom is set on project page
*
*/

var map;
var sql;
var sql_query;
var markerNum = -1;
//var upperbound = 85; //For now manually set to highest active cartodb_id
var sublayer;


function placeMap() {
    // Create map
    cartodb.createVis('map', map_id) //map_id should be included on page where it will be displayed
        
      .done(function(vis, layers) {
        // Allow the user to interact with the data layer
        // (Layer 0 is the base layer, Layer 1 is the data layer)
        layers[1].setInteraction(true);
                    
        // When a point is clicked...
        layers[1].on('featureClick', function(e, latlng, pos, data, layerNumber) {
            // Information about the point is shown on the console
            cartodb.log.log(e, latlng, pos, data, layerNumber);
            
            // The ID of the object is stored in the variable-markerNum
                markerNum = data.booma_id;
            
            // It displays the ID of the object in the console
            console.log(data.booma_id);
               
            displayInfo();
      });
          
        
        // Set initial map view        
        map = vis.getNativeMap();
        map.setZoom(map_zoom);
            
  });
       
}

window.onload = placeMap();
        
//loads map to location of hash mark
window.onload = setTimeout(function(){loadHash(window.location.hash.substring(1)); }, 900);
        
function loadHash() {
    if (window.location.hash.substring(1) >= 1) {
        markerNum = parseInt(window.location.hash.substring(1));
        callMarker(); 
    }
}

// Opens marker from sidebar link
function callMarker() {
    displayInfo(); 
}

function displayInfo() {
    sql = new cartodb.SQL({ user: 'booma' });
    sql_query = sqlCall + markerNum;
    sql.execute(sql_query)
    .done(function(data) {
        console.log(data.rows[0]);

        var record = data.rows[0];

        window.location.hash = markerNum;

        // Zooms to location when clicked
        map.panTo([record.latitude, record.longitude]);

        setTimeout(function () {
            map.setZoom(record.zoom_height);
        }, 900);

        // Displays the ID of the object in the external information box
        // TODO: Simplify this section with a templating engine.
        if (record.image_main != null) {
        document.getElementById("image").innerHTML = "<img src=\"" + record.image_main + "\" width=\"100%\">";
        }
        else {
           document.getElementById("image").innerHTML = "";
        }
        document.getElementById("image-cap").innerHTML = record.image_cap; // change to caption
        document.getElementById("name").innerHTML = record.name;
        document.getElementById("text-desc").innerHTML = record.desc_text;
        document.getElementById("real-world-desc").innerHTML = record.desc_real_world;
        document.getElementById("links").innerHTML = record.links;

    })
    
    .error(function(errors) {
        //***errors contains a list of errors
        console.log("errors:" + errors);
    });
}

function goToStart () {
    markerNum = 0;
    callMarker();
}

function goToPrevious () {
    markerNum = (markerNum - 1 + upperbound) % upperbound;
    callMarker();
}

function goToRandom () {
    markerNum = Math.floor(Math.random() * upperbound) + 1;
    callMarker();
}

function goToNext () {
    markerNum = (markerNum + 1 + upperbound) % upperbound;
    callMarker();
}

function goToEnd () {
    markerNum = upperbound - 1;
    callMarker();
}

function goTo(mn) {
    markerNum = mn;
    callMarker();
}
