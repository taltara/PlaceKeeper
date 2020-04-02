'use strict';

var gPref;
var gForecast;
var gZodiac;
const KEYp = 'prefData';
var gUserData;

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

function setUserPrefChanges(preferences) {

    document.body.style.backgroundColor = preferences.bgc;
    document.body.style.color = preferences.textColor;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function _savePreferencesToStorage() {

    gUserData = { gPref, gZodiac };
    saveToStorage(KEYp, gUserData);
}


function onColorPrefChange(event) {

    event.preventDefault();

    var elNewBgc = document.querySelector('input[name = "bgc"]');
    var elNewTc = document.querySelector('input[name = "tc"]');

    gPref = { bgc: elNewBgc.value, textColor: elNewTc.value };
    setUserPrefChanges(gPref);
    _savePreferencesToStorage();
}

async function onDatePrefChange(event, hasZodiac = null) {

    if (event) event.preventDefault();


    var elNewDate = document.querySelector('input[name = "dob"]');

    // console.log('ENTERED', elNewDate.value);
    gZodiac = zodiacSignHelper(elNewDate.value);
    // console.log(gZodiac, " - ", elNewDate.value);
    if (gZodiac === undefined) return;
    


    await getAstrologyForecast(gZodiac);

    _savePreferencesToStorage();
}

function setHomepageIndex() {

    var elForecast = document.querySelector('.dailyForecast');

}

// Cleans birth date and retreives zodiac sun sign for astrology forecast
function zodiacSignHelper(newDate) {

    var birthDate = newDate.split('-');
    birthDate = birthDate.splice(1);
    birthDate = { month: parseInt(birthDate[0]), day: parseInt(birthDate[1]) };
    console.log(birthDate);

    return determineZodiacByDate(birthDate);
}

async function getAstrologyForecast(zodiac) {

    const URL = `https://aztro.sameerkumar.website/?sign=${zodiac}&day=today`;
    await fetch(URL, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(json => {
            // console.log(json);
            gForecast = json;
        });
    // return res;
}



// Returns zodiac sun symbol
function determineZodiacByDate(date) {

    switch (date.month) {

        case 1: // january
            if (date.day >= 20) {
                return 'aquarius';
            } else {
                return 'capricorn';
            }
            break;

        case 2: // february
            if (date.day >= 19) {
                return 'pisces';
            } else {
                return 'aquarius';
            }
            break;

        case 3: // march
            if (date.day >= 21) {
                return 'aries';
            } else {
                return 'pisces';
            }
            break;

        case 4: // april
            if (date.day >= 20) {
                return 'taurus';
            } else {
                return 'aries';
            }
            break;

        case 5: // may
            if (date.day >= 21) {
                return 'gemini';
            } else {
                return 'taurus';
            }
            break;

        case 6: // june
            if (date.day >= 21) {
                return 'cancer';
            } else {
                return 'gemini';
            }
            break;

        case 7: // july
            if (date.day >= 23) {
                return 'leo';
            } else {
                return 'cancer';
            }
            break;


        case 8: // august
            if (date.day >= 23) {
                return 'virgo';
            } else {
                return 'leo';
            }
            break;


        case 9: // september
            if (date.day >= 23) {
                return 'libra';
            } else {
                return 'virgo';
            }
            break;

        case 10: // october
            if (date.day >= 23) {
                return 'scorpio';
            } else {
                return 'libra';
            }
            break;


        case 11: // november
            if (date.day >= 22) {
                return 'sagittarius';
            } else {
                return 'scorpio';
            }
            break;


        case 12: // december
            if (date.day >= 22) {
                return 'capricorn';
            } else {
                return 'sagittarius';
            }
            break;

    }
}