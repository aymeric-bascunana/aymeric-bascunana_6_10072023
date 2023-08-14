function validateForm() {
  var email = document.getElementById("E-mail").value;
  var password = document.getElementById("motDePasse").value;

  // Valider l'email et password ou echec
  if (email === "utilisateur@example.com" && password === "motdepasse") {
    document.getElementById("messageErreur").textContent = "Connexion réussie!";
  } else {
    document.getElementById("messageErreur").textContent =
      "Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.";
  }
}
