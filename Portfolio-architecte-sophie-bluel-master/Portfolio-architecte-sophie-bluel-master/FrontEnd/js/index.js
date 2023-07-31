// Créerper les work avec un fetch()
fetch("http://localhost:5678/api/works")
  .then((data) => data.json())
  .then((works) => {
    console.log(works);

    for (let index = 0; index < image.length; index++) {
      const ajouteImage = array[index];
    }

    function ajouteImage() {
      
      var galerie = document.querySelector(".gallery");

      images.array.forEach(function fetch("http://localhost:5678/api/works") {
        var nouvelleImage = document.createElement("figure");
        var nouvelleImage = document.createElement("img");
        nouvelleImage.src = "http://localhost:5678/api/works";
      } => {

        
      });
       nouvelleImage.classList.add("image");
       galerie.appendChild(nouvelleImage);
    }
    // <figure>
    //   <img
    //     src="assets/images/appartement-paris-v.png"
    //     alt="Appartement Paris V"
    //   />
    //   <figcaption>Appartement Paris V</figcaption>
    // </figure>
  });



  //Créer les catégoires ?
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