const form = document.getElementById("formulaire");
form.addEventListener("submit", (e) => {
  validateForm(e);
});

function validateForm(e) {
  e.preventDefault();
  const email = document.getElementById("E-mail").value;
  const password = document.getElementById("motDePasse").value;

  const formData = {
    email: email,
    password: password,
  };

  const url = "http://localhost:5678/api/users/login";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // createLogin(data);
      //Enregirestre le token dans le localStorage*
      // Supposons que votre token soit une chaîne de caractères
      var monToken = "votre_token_ici";

      // Enregistrez le token dans le stockage local
      localStorage.setItem("monToken", monToken);

      // Vous pouvez également vérifier si le token a été correctement enregistré
      if (data.token) {
        localStorage.setItem("monToken", data.token);
        console.log("Token enregistré avec succès dans le localStorage");
      } else {
        console.log("Token manquant dans la réponse");
      }
      //Redirection index.html
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
}
