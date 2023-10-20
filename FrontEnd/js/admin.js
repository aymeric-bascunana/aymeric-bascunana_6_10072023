function displayAdminMenu(works) {
  const logoutLink = document.getElementById("logout");

  // code JS pour la barre du token
  if (localStorage.getItem("token")) {
    console.log("Menu Admin actif");
    const menuAdmin = document.getElementById("menuAdmin");
    menuAdmin.style.display = "block";
    const modifyBtn = document.getElementById("modifyBtn");
    modifyBtn.style.display = "block";

    createWorksInModal(works);

    // Masquer les catégories lorsque la barre d'édition est active
    const categories = document.getElementById("categories");
    categories.style.display = "none";

    // Mettre à jour le texte du lien "login" en "logout"
    const loginLink = document.querySelector(".login");
    loginLink.textContent = "Logout";
    loginLink.style.display = "none";

    logoutLink.style.display = "block";
  } else {
    logoutLink.style.display = "none";
  }
}

const logoutLink = document.getElementById("logout");

function logout() {
  // Effectuez ici les étapes de déconnexion, par exemple, supprimez le jeton du localStorage
  localStorage.removeItem("token");

  // Redirigez l'utilisateur vers la page de connexion (par exemple, "login.html")
  window.location.href = "index.html";

  // Mettez à jour le texte du lien "Logout" en "Login"
  logoutLink.textContent = "Login";

  // Réalisez d'autres actions de déconnexion si nécessaire
}

// Ajoutez un gestionnaire d'événements "click" au lien "Logout"
logoutLink.addEventListener("click", (e) => {
  e.preventDefault(); // Empêchez le lien de se comporter par défaut (navigation)
  logout(); // Appelez la fonction de déconnexion
});
