'use strict';

async function onInit(local = '') {

    var initialPreferences = loadFromStorage(KEYp);

    if (initialPreferences) {

        if (initialPreferences.gPref != undefined) {

            setUserPrefChanges(initialPreferences.gPref);
        }

        if (local === 'home') {

            var elHorForecast = document.querySelector('.dailyForecast');


            if (initialPreferences.gZodiac != undefined) {

                await getAstrologyForecast(initialPreferences.gZodiac);

                elHorForecast.innerHTML = `
                <h1>Your Horoscope:</h1>
                <h2>${capitalizeFirstLetter(initialPreferences.gZodiac)}</h2>
                <p><span class="hor-info">Date Range: </span>${gForecast['date_range']}</p>
                <p><span class="hor-info">Horoscope: </span>${gForecast['description']}</p>
                <p><span class="hor-info">Compatibility: </span>${gForecast['compatibility']}</p>
                <p><span class="hor-info">Mood: </span>${gForecast['mood']}</p>
                <p><span class="hor-info">Color: </span>${gForecast['color']}</p>
                <p><span class="hor-info">Lucky #: </span>${gForecast['lucky_number']}</p>
                <p><span class="hor-info">Lucky Time: </span>${gForecast['lucky_time']}</p>
                `

                elHorForecast.classList.add('show');
            } else {

                elHorForecast.innerHTML = '';
            }

        }
    }

    if (local === 'map') {

        gLocations = loadFromStorage(KEY);
        renderFavoritePlaces();

    } else if (local === 'user-pref') {

        gUserData = loadFromStorage(KEYp);
        if (gUserData) {

            gZodiac = gUserData.gZodiac;
            gPref = gUserData.gPref;
        }

        setTimeout(() => {

            var allSettings = document.querySelectorAll('.preference-box');
            allSettings.forEach(setting => {

                setting.style.opacity = '1';
            })
        }, 200);
    }
}

function makeId(length = 10) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}