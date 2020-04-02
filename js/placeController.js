'use strict';


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

function renderFavoritePlaces() {

    var favoriteLocations = loadFromStorage(KEY);
    console.log(favoriteLocations);

    var strHtml = favoriteLocations.map(location => {

        return `
        
        <div class="fav-location data-${location.id}" onclick="initMap(${location.lat}, ${location.lng})">
            <p class="location-name">${location.name}</p>
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