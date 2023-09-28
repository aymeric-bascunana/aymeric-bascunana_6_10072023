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

    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = work.title;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;

    // Ajoutez appendchild à leurs div
    galleryDiv.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(figcaption);
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

    const image = document.createElement("img");
    image.classList.add("img-modal");
    image.src = work.imageUrl;
    image.alt = work.title;

    // Ajout d'icône de poubelle
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash", "delete-icon");
    deleteIcon.dataset.id = work.id;
    deleteIcon.addEventListener("click", () => {
      const token = localStorage.getItem("token");
      console.log(token);
      // Code pour supprimer l'image
      console.log("delete", work.id);

      //Faire un fetch vers url de suresion en mode delete (+Token)
      fetch("http://localhost:5678/api/works/" + work.id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // La suppression s'est bien déroulée, gérer la réponse ici
            console.log("L'élément a été supprimé avec succès.");
            init();
          } else {
            // La suppression a échoué, gérer l'erreur ici
            console.error("La suppression a échoué.");
          }
        })
        .catch((error) => {
          console.log(
            "Une erreur s'est produite lors de la suppression:",
            error
          );
        });
    });

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = "éditer";

    // Ajoutez appendchild à leurs div
    figure.appendChild(image);
    figure.appendChild(deleteIcon);
    figure.appendChild(figcaption);
    li.appendChild(figure);
    worksContainer.appendChild(li);
  });
}

function initCategories(works) {
  fetch("http://localhost:5678/api/categories")
    .then((data) => data.json())
    .then((categories) => {
      console.log(categories);
      createCategoryButtons(categories);
      createCategoryOptions(categories);
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

  function createCategoryOptions(categories) {
    const selectElement = document.getElementById("imageCategory");

    categories.forEach(function (category) {
      let option = document.createElement("option");
      option.value = category.id;
      option.text = category.name;
      selectElement.appendChild(option);
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

    createWorks(works);
  });
}

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
