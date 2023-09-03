// Créerper les work avec un fetch()
fetch("http://localhost:5678/api/works")
  .then((data) => data.json())
  .then((works) => {
    console.log(works);
    createWorks(works);
    initCategories(works);
    displayAdminMenu(works);
  });

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
      // Par exemple : icon.parentElement.parentElement.remove();
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
      categoriesTab = categories;
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

// Ajoutez un gestionnaire d'événements au bouton "Ajouter photo"
document.getElementById("btnAddPhoto").addEventListener("click", () => {
  // Ouvrez le champ de téléchargement d'image
  document.getElementById("imageUpload").click();
});

// Ajoutez un gestionnaire d'événements au champ de téléchargement d'image
document.getElementById("imageUpload").addEventListener("change", (event) => {
  const fileInput = event.target;
  const imagePreview = document.getElementById("imagePreview");
  const previewImage = document.getElementById("previewImage");
  const addImageContainer = document.getElementById("addImageContainer"); // Nouvelle ligne

  if (fileInput.files.length > 0) {
    // Affichez la prévisualisation de l'image
    imagePreview.style.display = "block";
    // Masquez les éléments internes de la div (icône, bouton, paragraphe)
    const elementsToHide = addImageContainer.querySelectorAll(
      ".fa-image, .btnAdd, .sizeMax"
    );
    elementsToHide.forEach((element) => {
      element.style.display = "none";
    });
    const selectedFile = fileInput.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    previewImage.src = imageUrl;
  } else {
    // Cachez la prévisualisation si aucun fichier n'est sélectionné
    imagePreview.style.display = "none";
    // Affichez à nouveau les éléments internes de la div
    const elementsToShow = addImageContainer.querySelectorAll(
      ".fa-image, .btnAdd, .sizeMax"
    );
    elementsToShow.forEach((element) => {
      element.style.display = "block";
    });
    previewImage.src = "";
  }
});

// Ajoutez un gestionnaire d'événements au bouton "Valider"
document.getElementById("addImageForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const imageTitle = document.getElementById("imageTitle").value;
  const imageCategory = document.getElementById("imageCategory").value;
  const previewImage = document.getElementById("previewImage");

  // Vérifiez si une image a été sélectionnée
  if (previewImage.src) {
    // Créez un objet "work" avec les données de l'image
    const newWork = {
      imageUrl: previewImage.src,
      title: imageTitle,
      category: {
        name: imageCategory,
      },
    };

    // Ajoutez cet objet "work" à la div "gallery" en appelant la fonction createWorks
    createWorks([newWork]);

    // Réinitialisez le formulaire
    document.getElementById("imageTitle").value = "";
    document.getElementById("imageCategory").value = "categorie1";
    document.getElementById("imagePreview").style.display = "none";
    document.getElementById("previewImage").src = "";
  } else {
    alert("Veuillez sélectionner une image avant de valider.");
  }
});
