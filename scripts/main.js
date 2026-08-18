const loginButton = document.querySelector("#login-button");

loginButton.addEventListener("click", function () {
    alert("La connexion OCEAGuard sera bientôt disponible !");
});

const temperature = document.querySelector("#temperature");
const ph = document.querySelector("#ph");
const oxygen = document.querySelector("#oxygen");
const turbidity = document.querySelector("#turbidity");
const turbidityStatus = document.querySelector("#turbidity-status");
const salinity = document.querySelector("#salinity");

const temperatureValue = 21.7;
const phValue = 8.1;

const oxygenValue = 7.8;
  function analyserOxygene(valeur) {

    if (valeur > 6) {
        return "🟢 Normal";
    } else if (valeur >= 3) {
        return "🟠 Vigilance";
    } else {
        return "🔴 Alerte";
    }

}
const oxygenStatus = document.querySelector("#oxygen-status");
oxygenStatus.textContent = analyserOxygene(oxygenValue);

const salinityValue = 34.2;

const turbidityValue = 2.5;
    function analyserTurbidite(valeur) {
      if (valeur < 5) {
          return "🟢 Normal";
      } else if (valeur <= 10) {
          return "🟠 Vigilance";
      } else {
          return "🔴 Alerte";
      }
    }

    turbidityStatus.textContent = analyserTurbidite(turbidityValue);



temperature.textContent = temperatureValue + " °C";
ph.textContent = phValue;
oxygen.textContent = oxygenValue + " mg/L";
turbidity.textContent = turbidityValue + " NTU";
salinity.textContent = salinityValue + " PSU";

const statusMessage = document.querySelector(".status-message");

if (temperatureValue < 10) {

    statusMessage.textContent = "🟠 Température basse";

} else if (temperatureValue > 25) {

    statusMessage.textContent = "🔴 Attention : température élevée";

} else {

    statusMessage.textContent = "🟢 Toutes les mesures sont normales";

}