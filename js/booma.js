var map;
var sql;
var sql_query;
var markerNum = 0;
var upperbound = 85; //For now manually set to highest active cartodb_id
var sublayer;

function placeMap() {
    // Create map
    cartodb.createVis('map', 'https://booma.cartodb.com/api/v2/viz/7f87d4f0-ba51-11e4-96b0-0e0c41326911/viz.json')
        
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
        map.setZoom(2);
        
        //var sublayer = layers[1].getSubLayer(0);
        //sublayer.setCartoCSS("#daily_spots[cartodb_id=1] {marker-fill: black;}");
            
  });
       
}

window.onload = placeMap();
        
//loads map to location of hash mark
window.onload = setTimeout(function(){loadHash(window.location.hash.substring(1)); }, 900);
        
function loadHash() {
    if (window.location.hash.substring(1) >= 1) {
        markerNum = parseInt(window.location.hash.substring(1));
        callMarker(markerNum); 
    }
}

// Opens marker from sidebar link
function callMarker() {
    displayInfo(markerNum); 
}

function displayInfo() {
    sql = new cartodb.SQL({ user: 'booma' });
    sql_query = "SELECT * FROM daily_spots WHERE booma_id = " + markerNum;
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
        document.getElementById("post-header-img").innerHTML = record.book_amazon_cover;
        document.getElementById("title").innerHTML = record.title;
        document.getElementById("pub-date").innerHTML = record.date;
        document.getElementById("auth-name").innerHTML = record.auth_name;
        document.getElementById("book_amazon").innerHTML = "( <a href=\"" + record.book_amazon + "\" target=\"_blank\">Amazon</a> | ";
        document.getElementById("book_worldcat").innerHTML = "<a href=\"" + record.book_worldcat + "\" target=\"_blank\">Library</a> )";
        document.getElementById("image").innerHTML = "<img src=\"" + record.image + "\" width=\"100%\">";
        document.getElementById("image-cap").innerHTML = record.image_cap; // change to caption
        document.getElementById("quote").innerHTML = record.quote;
        document.getElementById("text-desc").innerHTML = record.text_desc;
        document.getElementById("real-world-desc").innerHTML = record.real_world_desc;
        document.getElementById("quote-cit").innerHTML = record.quote_cit;
        document.getElementById("auth-bio").innerHTML = record.auth_bio;

        // document.getElementById("link").innerHTML = "<p><a href=\"" + record.link + "\" target=\"_blank\">Read the article</a>";
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