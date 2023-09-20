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
  const datatoken = localStorage.getItem("token");
  console.log(datatoken);

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
      if (data.token) {
        localStorage.setItem("token", datatoken);
        console.log("Token enregistré avec succès dans le localStorage");
        //Redirection index.html

        window.location.href = "index.html";
      } else {
        console.log("Token manquant dans la réponse");
      }
    })

    .catch((error) => {
      console.error("Erreur:", error);
    });
}
