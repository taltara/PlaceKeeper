'use strict';

var gLocations;
var map;
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
    var locationIdx = gLocations.findIndex(function (location) {
        return locationId === location.id;
    })
    gLocations.splice(locationIdx, 1);
    _saveLocationsToStorage();

}

function getLocationById(locationId) {
    var location = gLocations.find(function (location) {
        return locationId === location.id;
    })
    return location;
}

function initMap() {

    var elMap = document.querySelector('#map');
    var options = {center: {lat: 29.5577, lng: 34.9519}, zoom: 10, gestureHandling: 'greedy'};
    map = new google.maps.Map(elMap, options);
}