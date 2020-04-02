'use strict';

function onColorPrefChange(event) {

    event.preventDefault();
    prefChangeNotice();
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
    if (gZodiac === undefined) {

        prefChangeNotice(false);
        return;

    } else prefChangeNotice();


    await getAstrologyForecast(gZodiac);

    _savePreferencesToStorage();
}

function setHomepageIndex() {

    var elForecast = document.querySelector('.dailyForecast');
}

function prefChangeNotice(success = true) {

    var elNotice = document.querySelector('.settings-message');
    if (success) {
        elNotice.textContent = 'Settings Saved Successfully!';
    } else {

        elNotice.textContent = 'Settings Unchanges - Pick A Date!';
    }
    elNotice.style.opacity = '1';

    setTimeout(() => {

        elNotice.style.opacity = '0';
    }, 2000);
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

