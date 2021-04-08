// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map', {
  center: [40.7, -74],
  zoom: 10
});

// Add base layer
L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
  maxZoom: 18
}).addTo(map);

// Initialize Carto

var client = new carto.Client({
  apiKey: 'default_public',
  username: 'johannajovo'
});

// Initialze data source
var fsource = new carto.source.SQL("SELECT * FROM johannajovo.dohmh_farmers_markets_map_");

// Create style for the data
var fstyle = new carto.style.CartoCSS(`
  
 #layer {
  marker-width: 15;
  marker-fill: #0817ea;
  marker-fill-opacity: 1;
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
  marker-file: url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/triangle-stroked-18.svg');
}

 `);

// Add style to the data
var flayer = new carto.layer.Layer(fsource, fstyle);

// Initialze data source
var osource = new carto.source.SQL("SELECT * FROM  johannajovo.living_lots_nyc_lots_2021_02_02");

// Create style for the data
var ostyle = new carto.style.CartoCSS(`
  
 #layer {
 marker-width: 15;
 marker-fill: ramp([known_use], (#0f570e, #19181a, #f54707), ("Community Garden", "Public Vacant Land"), "=");
  marker-fill-opacity: .7;
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: .5;
}

 `);


// Add style to the data
var olayer = new carto.layer.Layer(osource, ostyle);



// Add the data to the map as a layer
client.addLayers([olayer,flayer]);
client.getLeafletLayer().addTo(map);

// Step 1: Find the button by its class. If you are using a different class, change this.
var publicvacantland = document.querySelector('.PUBLICVACANTLAND');

// Step 2: Add an event listener to the button. We will run some code whenever the button is clicked.
publicvacantland.addEventListener('click', function (e) {
  fsource.setQuery("SELECT * FROM johannajovo.living_lots_nyc_lots_2021_02_02 WHERE known_use = 'lot'");
  
  // Sometimes it helps to log messages, here we log to let us know the button was clicked. You can see this if you open developer tools and look at the console.
 console.log('lot was clicked');
  
});


// Step 1: Find the button by its class. If you are using a different class, change this.
var farmersmarket = document.querySelector('.FARMERSMARKET');

// Step 2: Add an event listener to the button. We will run some code whenever the button is clicked.
farmersmarket.addEventListener('click', function (e) {
  fsource.setQuery("SELECT * FROM johannajovo.dohmh_farmers_markets_map_ WHERE borough ILIKE '%staten%'");
  
  // Sometimes it helps to log messages, here we log to let us know the button was clicked. You can see this if you open developer tools and look at the console.
  console.log('Farmers Market in Staten Island was clicked');
});
// Step 1: Find the button by its class. If you are using a different class, change this.
var reset = document.querySelector('.RESET');

// Step 2: Add an event listener to the button. We will run some code whenever the button is clicked.
reset.addEventListener('click', function (e) {
  fsource.setQuery("SELECT * FROM johannajovo.dohmh_farmers_markets_map_ ");
  
  // Sometimes it helps to log messages, here we log to let us know the button was clicked. You can see this if you open developer tools and look at the console.
  console.log('RESET was clicked');
});