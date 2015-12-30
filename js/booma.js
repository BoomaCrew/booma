var map;
var sql;
var sql_query;
var markerNum = 0;
var upperbound = 84; //For now manually set to highest active cartodb_id
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
        
        window.location.hash = markerNum;
        
        // Zooms to location when clicked
        var lat = data.rows[0].latitude;
        var long = data.rows[0].longitude;
        var zoomHeight = data.rows[0].zoom_height;
        map.panTo([lat, long]);
        setTimeout(function(){map.setZoom(zoomHeight); }, 900);
        
        var title = data.rows[0].title;
        var pub_date = data.rows[0].date;
        var auth_name = data.rows[0].auth_name;
        var image = data.rows[0].image;
        var image_cap = data.rows[0].image_cap;
        var quote = data.rows[0].quote;
        var text_desc = data.rows[0].text_desc;
        var real_world_desc = data.rows[0].real_world_desc;
        var book_amazon_cover = data.rows[0].book_amazon_cover;
        var book_amazon = data.rows[0].book_amazon;
        var book_worldcat = data.rows[0].book_worldcat;
        var quote_cit = data.rows[0].quote_cit;
        var auth_bio = data.rows[0].auth_bio;
        var link = data.rows[0].link;
        
        // Displays the ID of the object in the external information box
        document.getElementById("post-header-img").innerHTML= book_amazon_cover;
        document.getElementById("title").innerHTML= title;
        document.getElementById("pub-date").innerHTML= pub_date;
        document.getElementById("auth-name").innerHTML= auth_name;
        document.getElementById("book_amazon").innerHTML="( <a href=" + book_amazon + " target='_blank'>Amazon</a> | ";
        document.getElementById("book_worldcat").innerHTML="<a href=" + book_worldcat + " target='_blank'>Library</a> )";
        document.getElementById("image").innerHTML= "<img src=" + image + " width=100%>";
        document.getElementById("image-cap").innerHTML= image_cap; //change to caption
        document.getElementById("quote").innerHTML= quote;
        document.getElementById("text-desc").innerHTML= text_desc;
        document.getElementById("real-world-desc").innerHTML= real_world_desc;
        document.getElementById("quote-cit").innerHTML= quote_cit;
        document.getElementById("auth-bio").innerHTML= auth_bio;
        document.getElementById("link").innerHTML= "<p><a href=" + link + " target='_blank'>Read the article</a>";
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