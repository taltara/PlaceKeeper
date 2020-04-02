'use strict';

var gPref;
var gForecast;
var gZodiac;
const KEYp = 'prefData';
var gUserData;



function setUserPrefChanges(preferences) {

    document.body.style.backgroundColor = preferences.bgc;
    document.body.style.color = preferences.textColor;
}

function _savePreferencesToStorage() {

    gUserData = { gPref, gZodiac };
    saveToStorage(KEYp, gUserData);
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