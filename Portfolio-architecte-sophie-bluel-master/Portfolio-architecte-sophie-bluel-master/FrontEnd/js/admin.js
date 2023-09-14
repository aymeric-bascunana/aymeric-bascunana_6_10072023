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
    // Suppriemr les catégories
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

// Afficher "logout a la place de login" => puis faire un systemetn pour supprimer le token pour se déconnecter
// fonction pour gérer la déconnexion
function logout() {
  localStorage.removeItem("token");

  // Mettre à jour le texte du lien "logout" en "login"
  const loginLink = document.querySelector(".login");
  loginLink.textContent = "Login";
}
