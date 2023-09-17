function init() {
  // Créerper les work avec un fetch()
  fetch("http://localhost:5678/api/works")
    .then((data) => data.json())
    .then((works) => {
      console.log(works);
      createWorks(works);
      initCategories(works);
      displayAdminMenu(works);
    });
}

init();

function createWorks(works) {
  // Récupérez la div "gallery" dans laquelle vous afficherez les images
  const galleryDiv = document.getElementById("gallery");
  galleryDiv.innerHTML = "";

  console.log("creatWorks");

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

function createWorksInModal(works) {
  // Récupérez la div "gallery" dans laquelle vous afficherez les images
  const worksContainer = document.getElementById("works-container");
  worksContainer.innerHTML = "";

  console.log("createWorksInModal");

  // Itérez sur chaque objet "work" et ajoutez l'image à la div "gallery"
  works.forEach((work) => {
    const li = document.createElement("li");

    const figure = document.createElement("figure");
    // console.log(figureDiv);
    const image = document.createElement("img");
    image.classList.add("img-modal");
    image.src = work.imageUrl;
    image.alt = work.title;

    // Ajout d'icône de poubelle
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash", "delete-icon");
    deleteIcon.addEventListener("click", () => {
      // Code pour supprimer l'image
      console.log("delete");
      figure.parentElement.remove();

      //Faire un fetch vers url de suresion en mode delete (+Token)
    });

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = "éditer";
    // console.log(image);

    // Ajoutez appendchild à leurs div
    figure.appendChild(image);
    figure.appendChild(deleteIcon);
    figure.appendChild(figcaption);
    li.appendChild(figure);
    worksContainer.appendChild(li);
    // console.log(figureDiv);
    //console.log(figcaption);
  });
}

function initCategories(works) {
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
      button.textContent = category.name;
      button.addEventListener("click", () => {
        changeClassActive(button);
        filterWorks(category.name);
      });

      categoryButtonsContainer.appendChild(button);
    });
  }

  function filterWorks(categoryName) {
    console.log(works, categoryName);
    const filterWorks = works.filter(
      (work) => work.category.name === categoryName
    );
    createWorks(filterWorks);
  }

  function changeClassActive(btn) {
    const activeButton = document.querySelector(".active_filter");
    if (activeButton) {
      activeButton.classList.remove("active_filter");
    }
    btn.classList.add("active_filter");
  }

  const allButton = document.getElementById("allButton");
  allButton.addEventListener("click", () => {
    changeClassActive(allButton);
    // const activeButton = document.querySelector(".active_filter");
    // if (activeButton) {
    //   activeButton.classList.remove("active_filter");
    // }
    // allButton.classList.add("active_filter");

    createWorks(works);
  });
}

var categories = [
  { value: "1", label: "Objets" },
  { value: "2", label: "Appartements" },
  { value: "3", label: "Hotels & restaurants" },
];

// Sélectionnez l'élément select par son ID
var selectElement = document.getElementById("imageCategory");

// Parcourez le tableau de catégories et ajoutez-les au select
categories.forEach(function (category) {
  var option = document.createElement("option");
  option.value = category.value;
  option.text = category.label;
  selectElement.appendChild(option);
});

function actualiserContenu() {
  fetch("http://localhost:5678/api/works")
    .then((data) => data.json())
    .then((newWorks) => {
      console.log(newWorks);

      // Itérez sur chaque nouvelle œuvre
      newWorks.forEach((newWork) => {
        // Vérifiez si l'œuvre existe déjà dans la galerie
        const existingWork = document.querySelector(
          `[data-id="${newWork.id}"]`
        );

        if (existingWork) {
          // Si l'œuvre existe, mettez à jour ses détails (par exemple, son titre ou son image)
          const image = existingWork.querySelector("img");
          const figcaption = existingWork.querySelector("figcaption");

          image.src = newWork.imageUrl;
          image.alt = newWork.title;
          figcaption.textContent = newWork.title;
        } else {
          // Si l'œuvre n'existe pas, créez un nouvel élément pour elle
          const galleryDiv = document.getElementById("gallery");
          const figure = document.createElement("figure");
          figure.dataset.id = newWork.id;

          const image = document.createElement("img");
          image.src = newWork.imageUrl;
          image.alt = newWork.title;

          const figcaption = document.createElement("figcaption");
          figcaption.textContent = newWork.title;

          figure.appendChild(image);
          figure.appendChild(figcaption);
          galleryDiv.appendChild(figure);
        }
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error);
    });
}

fetch("http://localhost:5678/api/works/1", {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("La requête a échoué");
    }

    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Erreur:", error);
  });
