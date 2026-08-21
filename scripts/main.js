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
    temperature: 18.4,
    ph: 8.1,
    oxygen: 7.8,
    turbidity: 2.4,
    salinity: 34.2
};


// ===============================
// HISTORIQUES
// ===============================

const historiqueTemperature = [];
const historiquePh = [];
const historiqueOxygen = [];
const historiqueTurbidity = [];
const historiqueSalinity = [];

const historiqueHeures = [];


// ===============================
// FONCTIONS D'ANALYSE
// Seuils pédagogiques
// ===============================

function analyserTemperature(valeur) {

    if (valeur < 10) {
        return "🟠 Température basse";
    } else if (valeur > 25) {
        return "🔴 Température élevée";
    } else {
        return "🟢 Normal";
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


// ===============================
// COULEURS DES STATUTS
// ===============================

function appliquerCouleurStatut(element, statut) {

    element.classList.remove(
        "normal",
        "vigilance",
        "alerte"
    );

    if (statut.includes("Normal")) {

        element.classList.add("normal");

    } else if (
        statut.includes("Vigilance") ||
        statut.includes("basse") ||
        statut.includes("élevée")
    ) {

        element.classList.add("vigilance");

    } else if (statut.includes("Alerte")) {

        element.classList.add("alerte");
    }
}


// ===============================
// QUALITÉ GLOBALE
// ===============================

function analyserQualiteGlobale() {

    const resultats = [
        analyserTemperature(mesures.temperature),
        analyserPh(mesures.ph),
        analyserOxygene(mesures.oxygen),
        analyserTurbidite(mesures.turbidity),
        analyserSalinite(mesures.salinity)
    ];

    if (
        resultats.some(
            resultat => resultat.includes("Alerte")
        )
    ) {

        return "🔴 Attention : au moins un paramètre est en alerte";
    }

    if (
        resultats.some(
            resultat =>
                resultat.includes("Vigilance") ||
                resultat.includes("basse") ||
                resultat.includes("élevée")
        )
    ) {

        return "🟠 Vigilance : certains paramètres nécessitent votre attention";
    }

    return "🟢 Toutes les mesures sont normales";
}

function appliquerCouleurStatutGlobal(element, statut) {

    element.classList.remove(
        "normal",
        "vigilance",
        "alerte"
    );

    if (statut.includes("Toutes les mesures sont normales")) {

        element.classList.add("normal");

    } else if (statut.includes("Vigilance")) {

        element.classList.add("vigilance");

    } else if (statut.includes("Alerte") || statut.includes("Attention")) {

        element.classList.add("alerte");
    }
}

// ===============================
// AFFICHAGE DES MESURES
// ===============================

function afficherMesures() {

    temperature.textContent =
        mesures.temperature.toFixed(1) + " °C";

    ph.textContent =
        mesures.ph.toFixed(1);

    oxygen.textContent =
        mesures.oxygen.toFixed(1) + " mg/L";

    turbidity.textContent =
        mesures.turbidity.toFixed(1) + " NTU";

    salinity.textContent =
        mesures.salinity.toFixed(1) + " PSU";


    const temperatureResultat =
        analyserTemperature(mesures.temperature);

    const phResultat =
        analyserPh(mesures.ph);

    const oxygenResultat =
        analyserOxygene(mesures.oxygen);

    const turbidityResultat =
        analyserTurbidite(mesures.turbidity);

    const salinityResultat =
        analyserSalinite(mesures.salinity);


    temperatureStatus.textContent =
        temperatureResultat;

    phStatus.textContent =
        phResultat;

    oxygenStatus.textContent =
        oxygenResultat;

    turbidityStatus.textContent =
        turbidityResultat;

    salinityStatus.textContent =
        salinityResultat;


    appliquerCouleurStatut(
        temperatureStatus,
        temperatureResultat
    );

    appliquerCouleurStatut(
        phStatus,
        phResultat
    );

    appliquerCouleurStatut(
        oxygenStatus,
        oxygenResultat
    );

    appliquerCouleurStatut(
        turbidityStatus,
        turbidityResultat
    );

    appliquerCouleurStatut(
        salinityStatus,
        salinityResultat
    );


  const statutGlobal = analyserQualiteGlobale();
  statusMessage.textContent = statutGlobal;
  appliquerCouleurStatutGlobal(
      statusMessage,
      statutGlobal
  );

}


// ===============================
// CRÉATION DES GRAPHIQUES
// ===============================

function creerGraphique(idCanvas, titre, donnees) {

    const canvas =
        document.querySelector(idCanvas);

    return new Chart(canvas, {

        type: "line",

        data: {

            labels: historiqueHeures,

            datasets: [
                {
                    label: titre,
                    data: donnees,
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 1
                }
            ]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }
            }
        }
    });
}


// ===============================
// LES 5 GRAPHIQUES
// ===============================

const temperatureChart =
    creerGraphique(
        "#temperature-chart",
        "Température °C",
        historiqueTemperature
    );

const phChart =
    creerGraphique(
        "#ph-chart",
        "pH",
        historiquePh
    );

const oxygenChart =
    creerGraphique(
        "#oxygen-chart",
        "Oxygène mg/L",
        historiqueOxygen
    );

const turbidityChart =
    creerGraphique(
        "#turbidity-chart",
        "Turbidité NTU",
        historiqueTurbidity
    );

const salinityChart =
    creerGraphique(
        "#salinity-chart",
        "Salinité PSU",
        historiqueSalinity
    );


// ===============================
// GRAPHIQUE PRINCIPAL
// ===============================

const overviewCanvas = document.querySelector("#overview-chart");

const overviewChart = new Chart(overviewCanvas, {

    type: "line",

    data: {
        labels: historiqueHeures,

        datasets: [
            {
                label: "Température °C",
                data: historiqueTemperature,
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 1
            },
            {
                label: "pH",
                data: historiquePh,
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 1
            },
            {
                label: "Oxygène mg/L",
                data: historiqueOxygen,
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 1
            },
            {
                label: "Turbidité NTU",
                data: historiqueTurbidity,
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 1
            },
            {
                label: "Salinité PSU",
                data: historiqueSalinity,
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 1
            }
        ]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "bottom",

                labels: {
                    color: "#c9dbe6",
                    boxWidth: 12,
                    font: {
                        size: 10
                    }
                }
            }
        },

        scales: {
            x: {
                ticks: {
                    color: "#8fa8b8"
                },
                grid: {
                    color: "rgba(255,255,255,0.05)"
                }
            },

            y: {
                ticks: {
                    color: "#8fa8b8"
                },
                grid: {
                    color: "rgba(255,255,255,0.08)"
                }
            }
        }
    }
});

// ===============================
// PREMIER AFFICHAGE
// ===============================

afficherMesures();


// ===============================
// SIMULATION DES SONDES
// ===============================

setInterval(function () {

    // Variation progressive des mesures

    mesures.temperature +=
        (Math.random() - 0.5) * 0.8;

    mesures.ph +=
        (Math.random() - 0.5) * 0.1;

    mesures.oxygen +=
        (Math.random() - 0.5) * 0.4;

    mesures.turbidity +=
        (Math.random() - 0.5) * 1.2;

    mesures.salinity +=
        (Math.random() - 0.5) * 0.3;


    // Heure de la mesure

    const heure =
        new Date().toLocaleTimeString();


    // Ajout à l'historique

    historiqueHeures.push(heure);

    historiqueTemperature.push(
        mesures.temperature
    );

    historiquePh.push(
        mesures.ph
    );

    historiqueOxygen.push(
        mesures.oxygen
    );

    historiqueTurbidity.push(
        mesures.turbidity
    );

    historiqueSalinity.push(
        mesures.salinity
    );


    // Conservation des 20 dernières mesures

    if (historiqueHeures.length > 20) {

        historiqueHeures.shift();

        historiqueTemperature.shift();
        historiquePh.shift();
        historiqueOxygen.shift();
        historiqueTurbidity.shift();
        historiqueSalinity.shift();
    }


    // Mise à jour des valeurs

    afficherMesures();


    // Mise à jour des graphiques

    temperatureChart.update();
    phChart.update();
    oxygenChart.update();
    turbidityChart.update();
    salinityChart.update();

    overviewChart.update();

}, 5000);
