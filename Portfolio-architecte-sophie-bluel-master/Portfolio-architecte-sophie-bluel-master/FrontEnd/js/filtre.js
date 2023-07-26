function filterCategory(category) {
  // Récupérer la liste
  var list = document.getElementById("list");

  // Récupérer les éléments de la liste
  var items = list.getElementsByTagName("li");

  // Parcourir les éléments de la liste
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemCategory = item.getAttribute("data-category");

    // Vérifier si l'élément correspond à la catégorie sélectionnée
    if (category === "all" || itemCategory === category) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  }
}

//ici la parti du code js pour le login//
function validateForm() {
  // Récupérer les valeurs saisies par l'utilisateur
  var identifiant = document.getElementById("E-mail").value;
  var motDePasse = document.getElementById("motDePasse").value;

  // Vérifier les conditions pour la connexion
  if (identifiant === "votre_E-mail" && motDePasse === "votre_mot_de_passe") {
    // Redirection vers la page avec les boutons d'actions pour éditer le site
    window.location.href = "page_actions.html";
  } else {
    // Afficher le message d'erreur
    document.getElementById("messageErreur").innerHTML =
      "Erreur dans l'identifiant ou le mot de passe";
  }
}

//ici la parti du modal//
function openImageModal() {
  document.getElementById("imageModal").style.display = "block";
}

// Ajouter une image à la liste
function addImage() {
  var imageURL = document.getElementById("imageURL").value;
  if (imageURL !== "") {
    var projectList = document.getElementById("list");
    var li = document.createElement("li");
    li.setAttribute("data-category", "Nouvelle Catégorie"); // Changez cette catégorie par celle que vous voulez
    var figure = document.createElement("figure");
    var img = document.createElement("img");
    img.src = imageURL; // Utiliser l'URL de l'image fournie par l'utilisateur
    img.alt = "Nouveau Projet";
    var figcaption = document.createElement("figcaption");
    figcaption.innerText = "Nouveau Projet";
    var deleteIcon = document.createElement("span");
    deleteIcon.className = "delete";
    deleteIcon.innerText = "🗑️";
    deleteIcon.onclick = function () {
      deleteProject(li);
    };

    figure.appendChild(img);
    figure.appendChild(figcaption);
    figure.appendChild(deleteIcon);
    li.appendChild(figure);
    projectList.appendChild(li);
    document.getElementById("imageURL").value = "";
  }
}

// Retirer une image de la liste
function removeImage() {
  var imageURL = document.getElementById("imageURL").value;
  var images = document.querySelectorAll("#list img");

  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    if (img.src === imageURL) {
      var listItem = img.parentNode.parentNode;
      listItem.parentNode.removeChild(listItem);
      break;
    }
  }

  document.getElementById("imageURL").value = "";
}

// Fermer la fenêtre modale d'ajout/retirer des images
function closeImageModal() {
  document.getElementById("imageModal").style.display = "none";
}

// Tableau contenant les URL des images à ajouter à la galerie
const images = [
  "./assets/images/abajour-tahina.png",
  "./assets/images/appartement-paris-v.png",
  "./assets/images/restaurant-sushisen-londres.png",
  "./assets/images/la-balisiere.png",
  "./assets/images/structures-thermopolis.png",
  "./assets/images/appartement-paris-x.png",
  "./assets/images/le-coteau-cassis.png",
  "./assets/images/villa-ferneze.png",
  "./assets/images/appartement-paris-xviii.png",
  "./assets/images/bar-lullaby-paris.png",
  "./assets/images/hotel-first-arte-new-delhi.png",
];

//const imageNames = [
//"Abajour Tahina",

//"Appartement Paris V",

//"Restaurant Sushisen Londres",

//"La Balisiere",

//"Structures Thermopolis",

//"Appartement Paris X",

//"Le Coteau Cassis",

//"Villa Ferneze",

//"Appartement Paris XVIII",

//"Bar Lullaby Paris",

//"Hotel First Arte New Delhi",
//];

// Fonction pour ajouter des images à la galerie
function ajouterImagesALaGalerie() {
  // Obtient l'élément parent dans lequel nous voulons ajouter les images (la galerie)
  var galerie = document.querySelector(".gallery");

  // Parcours le tableau d'URL d'images
  images.forEach(function (urlImage) {
    // Crée un nouvel élément <img>
    var nouvelleImage = document.createElement("img");

    // Définit l'attribut "src" de l'image pour l'URL spécifiée
    nouvelleImage.src = urlImage;

    // Ajoute une classe (facultatif, pour le style)
    nouvelleImage.classList.add("image");

    // Ajoute l'image à l'élément parent (la galerie)
    galerie.appendChild(nouvelleImage);
  });
}

// Appel de la fonction pour ajouter les images à la galerie lors du chargement de la page
ajouterImagesALaGalerie();

const containerDots = document.querySelector(".gallery");

for (let index = 0; index < imagesNbr; index++) {
  let images = document.createElement("img");
  dot.className = "images";
  console.log(dot);
  containerDots.appendChild(img);
}
