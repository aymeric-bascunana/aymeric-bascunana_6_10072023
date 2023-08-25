function displayAdminMenu(works) {
  // code JS pour la barre du token
  if (localStorage.getItem("token")) {
    console.log("Menu Admin actif");
    const menuAdmin = document.getElementById("menuAdmin");
    menuAdmin.style.display = "block";
    const modifyBtn = document.getElementById("modifyBtn");
    modifyBtn.style.display = "block";
    createWorksInModal(works);
    // Suppriemr les catégories
    // Afficher "logout a la place de login" => puis faire un systemetn pour supprimer le token pour se déconnecter
  }
}
