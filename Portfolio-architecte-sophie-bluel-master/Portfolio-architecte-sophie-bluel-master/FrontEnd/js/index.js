// Créerper les work avec un fetch()
fetch("http://localhost:5678/api/works")
  .then((data) => data.json())
  .then((works) => {
    console.log(works);

    // Récupérez la div "gallery" dans laquelle vous afficherez les images
    const galleryDiv = document.getElementById("gallery");

    // Itérez sur chaque objet "work" et ajoutez l'image à la div "gallery"
    works.forEach((work) => {
      const image = document.createElement("img");
      image.src = work.imageURL;
      image.alt = work.title;

      // Ajoutez l'image à la div "gallery"
      galleryDiv.appendChild(image);
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des données :", error);
  });

// <figure>
//   <img
//     src="assets/images/appartement-paris-v.png"
//     alt="Appartement Paris V"
//   />
//   <figcaption>Appartement Paris V</figcaption>
// </figure>
