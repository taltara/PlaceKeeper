'use strict';

var gLocations;
var gCurrLocation;
var map;
var onDelete = false;
const KEY = 'userData';


function createLocation() {
    var locations = loadFromStorage(KEY);
    gLocations = locations;
    _saveLocationsToStorage();
}

function _saveLocationsToStorage() {
    saveToStorage(KEY, gLocations);
}

function getLocationById(locationId) {
    var location = gLocations.find(function (location) {
        return locationId === location.id;
    })
    return location;
}




function initMap(lat = null, lng = null) {
    var centerOn;
    if (!lat || !lng) {
        // Eilat
        centerOn = { lat: 29.5577, lng: 34.9519 };
    } else {

        centerOn = { lat, lng };
    }
    var elMap = document.querySelector('#map');
    var options = { center: centerOn, zoom: 10, gestureHandling: 'greedy' };
    map = new google.maps.Map(elMap, options);


    map.addListener('click', function(e) {

        onNewLocation(e);
    });
}


function onNewLocation(event) {
    
    var latLng = event.latLng;
    var lat = latLng.lat();
    var lng = latLng.lng();

    var inputArea = document.querySelector(".error-input");
    inputArea.innerHTML = `
    
        <form>
            <input type="text" name="new-location" placeholder="Enter New Place Name">
            <button onclick="addNewLocation(event)">Add</button>
        </form>
    `;
    if(!inputArea.classList.contains('show-map-section')) {

        inputArea.classList.add('show-map-section');
    }

    gCurrLocation = {lat, lng};
}

function addNewLocation() {

    event.preventDefault();
    
    var newLocationName = document.querySelector('input[name = "new-location"]');
    
    var name = newLocationName.value;
    var lat = gCurrLocation.lat, lng = gCurrLocation.lng;

    document.querySelector('.error-input').innerHTML = '';
    let newLocation = {id: makeId(), lat, lng, name: name};

    if(gLocations && gLocations.length) {

        gLocations.unshift(newLocation);

    } else {

        gLocations = [newLocation];
    }
    console.log(gLocations);
    _saveLocationsToStorage();
    renderFavoritePlaces();
    showHideMapInput();
}

function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
}

function showLocation(position) {
    console.log(position);

    initMap(position.coords.latitude, position.coords.longitude);
}

