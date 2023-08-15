fetch("http://localhost:5678/api/users/login")
  .then((data) => data.json())
  .then((login) => {
    console.log(login);
    createLogin(login);
  });

function validateForm() {
  const email = document.getElementById("E-mail").value;
  const password = document.getElementById("motDePasse").value;

  const formData = {
    E_mail: email,
    motDePasse: password,
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
      createLogin(data);
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
}
