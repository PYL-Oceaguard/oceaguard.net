const loginButton = document.querySelector("#login-button");

loginButton.addEventListener("click", function () {
    alert("La connexion OCEAGuard sera bientôt disponible !");
});


// ===============================
// ÉLÉMENTS HTML
// ===============================

const temperature = document.querySelector("#temperature");
const temperatureStatus = document.querySelector("#temperature-status");
const ph = document.querySelector("#ph");
const phStatus = document.querySelector("#ph-status");
const oxygen = document.querySelector("#oxygen");
const oxygenStatus = document.querySelector("#oxygen-status");
const turbidity = document.querySelector("#turbidity");
const turbidityStatus = document.querySelector("#turbidity-status");
const salinity = document.querySelector("#salinity");
const salinityStatus = document.querySelector("#salinity-status");
const statusMessage = document.querySelector(".status-message");


// ===============================
// DONNÉES
// ===============================

const mesures = {
    temperature: 31.7,
    ph: 8.1,
    oxygen: 4,
    turbidity: 12,
    salinity: 34.2
};


// ===============================
// FONCTIONS D'ANALYSE
// ===============================

function analyserTemperature(valeur) {

    if (valeur < 10) {
        return "🟠 Température basse";
    } else if (valeur > 25) {
        return "🔴 Attention : température élevée";
    } else {
        return "🟢 Température normale";
    }

}


function analyserPh(valeur) {

    if (valeur < 7) {
        return "🔴 Alerte";
    } else if (valeur < 7.5) {
        return "🟠 Vigilance";
    } else {
        return "🟢 Normal";
    }

}


function analyserOxygene(valeur) {

    if (valeur > 6) {
        return "🟢 Normal";
    } else if (valeur >= 3) {
        return "🟠 Vigilance";
    } else {
        return "🔴 Alerte";
    }

}


function analyserTurbidite(valeur) {

    if (valeur < 5) {
        return "🟢 Normal";
    } else if (valeur <= 10) {
        return "🟠 Vigilance";
    } else {
        return "🔴 Alerte";
    }

}

function analyserSalinite(valeur) {

    if (valeur < 30) {
        return "🟠 Salinité basse";
    } else if (valeur > 40) {
        return "🟠 Salinité élevée";
    } else {
        return "🟢 Normal";
    }

}

function appliquerCouleurStatut(element, statut) {

    element.classList.remove("normal", "vigilance", "alerte");

    if (statut.includes("Normal")) {
        element.classList.add("normal");
    } else if (statut.includes("Vigilance")) {
        element.classList.add("vigilance");
    } else if (statut.includes("Alerte") || statut.includes("élevée")) {
        element.classList.add("alerte");
    }

}

// ===============================
// AFFICHAGE DES VALEURS
// ===============================

temperature.textContent = mesures.temperature + " °C";

ph.textContent = mesures.ph;

oxygen.textContent = mesures.oxygen + " mg/L";

turbidity.textContent = mesures.turbidity + " NTU";

salinity.textContent = mesures.salinity + " PSU";


// ===============================
// AFFICHAGE DES STATUTS
// ===============================

const temperatureResultat = analyserTemperature(mesures.temperature);
temperatureStatus.textContent = temperatureResultat;
appliquerCouleurStatut(temperatureStatus, temperatureResultat);


const phResultat = analyserPh(mesures.ph);
phStatus.textContent = phResultat;
appliquerCouleurStatut(phStatus, phResultat);


const oxygenResultat = analyserOxygene(mesures.oxygen);
oxygenStatus.textContent = oxygenResultat;
appliquerCouleurStatut(oxygenStatus, oxygenResultat);


const turbidityResultat = analyserTurbidite(mesures.turbidity);
turbidityStatus.textContent = turbidityResultat;
appliquerCouleurStatut(turbidityStatus, turbidityResultat);


const salinityResultat = analyserSalinite(mesures.salinity);
salinityStatus.textContent = salinityResultat;
appliquerCouleurStatut(salinityStatus, salinityResultat);
