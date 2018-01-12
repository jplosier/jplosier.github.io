/* geoFindMe  Learn about this code on MDN: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation */
function geoFindMe() {
  var locationOut = document.getElementById("locationOut");
  var orientationOut = document.getElementById("orientationOut");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var altitude  = position.coords.altitude;  // meters above sea level
    var accuracy  = position.coords.accuracy;  // in meters
    var altitudeAccuracy = position.coords.altitudeAccuracy;  // in meters
    var heading   = position.coords.heading;   // 0 = true north, 90 = east, etc. Only works if speed >0
    var speed     = position.coords.speed;     // meters per second or null
    
    var timestamp = position.timestamp;

    locationOut.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°, within ' + accuracy + ' meters (' + (accuracy*3.2808) + ' feet)</p>' +
                       '<p>Altitude is ' + altitude + ' meters above Sea Level, within ' + altitudeAccuracy +' meters</p>' +
                       '<p>Speed is ' + speed + ' m/s, heading is ' + heading +'°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    locationOut.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  locationOut.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

// document.getElementById("findButton").addEventListener("click", geoFindMe, false);

function handleOrientation(event) {
  var absolute = event.absolute;  // true if using Earth reference frame. false if device reference
  var alpha    = event.alpha;     // rotation LEFTWARD  around Z axis
  var beta     = event.beta;      // rotation FORWARD   around X axis
  var gamma    = event.gamma;     // rotation RIGHTWARD around Y axis

  var refFrame=(absolute?'Earth':'Device');
      
  orientationOut.innerHTML = '<p>Reference Frame is ' + refFrame + '</p>' +
                       '<p>Alpha is ' + alpha + '°</p>' +
                       '<p>Beta is ' + beta + '°</p>' +
                       '<p>Gamma is ' + gamma + '°</p>';
}

function orientationhandler(evt){
  // For FF3.6+
  if (!evt.gamma && !evt.beta) {
    evt.gamma = -(evt.x * (180 / Math.PI));
    evt.beta = -(evt.y * (180 / Math.PI));
  }
  
  // use evt.gamma, evt.beta, and evt.alpha 
  // according to dev.w3.org/geo/api/spec-source-orientation

  orientationOut.innerHTML = '<p>Alpha is ' + evt.alpha + '°</p>' +
                       '<p>Beta is ' + evt.beta + '°</p>';
}

/*
orientationOut.innerHTML = "<p>Locating…</p>";
window.addEventListener("deviceorientation", handleOrientation, true);
window.addEventListener('MozOrientation',    orientationhandler, false);
*/

/* ********************************************** */
/* * Map Handling                               * */
/* ********************************************** */

var Map = {};

/* Load Map */
function loadMap(mapURL) {
  console.log('loadMap()');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', mapURL);
  xhr.onload = function(e) {
    var data = JSON.parse(this.response);
    Map = data;
    console.log('loaded map("' + Map.map + '")');
  }
  xhr.send();

};  // loadMap();


window.addEventListener('load', function() { loadMap('./data/Billys_House.JSON'); });


/* ****************************************** */
/* * Service Worker */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}