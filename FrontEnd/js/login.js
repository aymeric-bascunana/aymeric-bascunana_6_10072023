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

      //Enregirestre le token dans le localStorage*
      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Token enregistré avec succès dans le localStorage");
        //Redirection index.html

        window.location.href = "index.html";
      } else {
        console.log("Token manquant dans la réponse");
      }
    })

    .catch((error) => {
      console.error("Erreur:", error);
      const messageErreurDiv = document.getElementById("messageErreur");
      messageErreurDiv.innerHTML =
        "Votre E-mail ou Mot de passe est incorrect.";
    });
}
