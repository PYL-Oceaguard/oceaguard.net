const monImage = document.querySelector("img");

monImage.addEventListener("click", () => {
  const maSrc = monImage.getAttribute("src");

  if (maSrc === "images/Logo Titre OceaGuard.png") {
    monImage.setAttribute("src", "images/representation-activite-oceaguard.png");
  } else {
    monImage.setAttribute("src", "images/Logo Titre OceaGuard.png");
  }
});

let monBouton = document.querySelector("button");

function essaiconnexion() {
  const monIdentifianr = prompt("Veuillez saisir votre identifiant");
  localStorage.setItem("identifiant", minIdentifiant);
  Bienvenue.textContent = `Bienvenue, ${monIdentifiant}`;
}

monBouton.addEventListener("click", () => {
  essaiconnexion();
});