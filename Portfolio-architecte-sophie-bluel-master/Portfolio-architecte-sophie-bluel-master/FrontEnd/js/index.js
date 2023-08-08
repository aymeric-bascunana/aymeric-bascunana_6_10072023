// Créerper les work avec un fetch()
fetch("http://localhost:5678/api/works")
  .then((data) => data.json())
  .then((works) => {
    console.log(works);
    createWorks(works);
  });

function createWorks(works) {
  // Récupérez la div "gallery" dans laquelle vous afficherez les images
  const galleryDiv = document.getElementById("gallery");

  // Itérez sur chaque objet "work" et ajoutez l'image à la div "gallery"
  works.forEach((work) => {
    const figure = document.createElement("figure");
    // console.log(figureDiv);
    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = work.title;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    // console.log(image);

    // Ajoutez appendchild à leurs div
    galleryDiv.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(figcaption);
    // console.log(figureDiv);
    //console.log(figcaption);
  });
}

// <figure>
//   <img
//     src="assets/images/appartement-paris-v.png"
//     alt="Appartement Paris V"
//   />
//   <figcaption>Appartement Paris V</figcaption>
// </figure>

fetch("http://localhost:5678/api/categories")
  .then((data) => data.json())
  .then((categories) => {
    console.log(categories);
    createCategoryButtons(categories);
  });

function createCategoryButtons(categories) {
  const categoryButtonsContainer = document.getElementById("categories");

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name; // Remplacez "name" par la propriété appropriée de votre objet catégorie
    button.addEventListener("click", () => {
      // Ajoutez le code que vous souhaitez exécuter lorsqu'un bouton est cliqué
      // Par exemple, filtrer les éléments en fonction de la catégorie sélectionnée
      // Vous pouvez également ajouter / supprimer la classe "active_filter" pour styliser le bouton actif
    });

    categoryButtonsContainer.appendChild(button);
  });
}
