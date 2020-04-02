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

function deleteLocation(locationId) {
    event.stopPropagation();
    // console.log(gLocations);
    if(onDelete) return;

    var locationIdx = gLocations.findIndex(function (location) {
        return locationId === location.id;
    })
    gLocations.splice(locationIdx, 1);
    _saveLocationsToStorage();
    document.querySelector(`.data-${locationId}`).classList.add('hide');
    onDelete = true;

    setTimeout(() => {
        
        renderFavoritePlaces();
        onDelete = false;
    }, 300);
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

function renderFavoritePlaces() {

    var favoriteLocations = loadFromStorage(KEY);
    console.log(favoriteLocations);

    var strHtml = favoriteLocations.map(location => {

        return `
        
        <div class="fav-location data-${location.id}" onclick="initMap(${location.lat}, ${location.lng})">
            <p>${location.name}</p>
            <div class="lat-lng">
            <div class="coord-block"><span>Lat:</span><p>${location.lat}</p></div>
            <div class="coord-block"><span>Lng:</span><p>${location.lng}</p></div>
            </div>
            <i class="fas fa-times" onclick="deleteLocation('${location.id}')"></i>
        </div>
        `;
    });

    document.querySelector('.fav-locations').innerHTML = strHtml.join('');
    
}

function handleLocationError(error) {
    var locationError = document.getElementById("error-input");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }

    showHideMapInput();
}

function showHideMapInput() {
    
    var locationError = document.querySelector('.error-input');

    if(!locationError.classList.contains('show-map-section')) {
    
        locationError.classList.add('show-map-section');
        
        setTimeout(() => {
            
            locationError.classList.remove('show-map-section');
        }, 3000);
    } else {
        
        locationError.classList.remove('show-map-section');

    }
    
}