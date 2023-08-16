// Créerper les work avec un fetch()
fetch("http://localhost:5678/api/works")
  .then((data) => data.json())
  .then((works) => {
    console.log(works);
    createWorks(works);
    initCategories(works);
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
        const activeButton = document.querySelector(".active_filter");
        if (activeButton) {
          activeButton.classList.remove("active_filter");
        }
        button.classList.add("active_filter");

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

  const allButton = document.getElementById("allButton");
  allButton.addEventListener("click", () => {
    const activeButton = document.querySelector(".active_filter");
    if (activeButton) {
      activeButton.classList.remove("active_filter");
    }
    allButton.classList.add("active_filter");

    createWorks(works);
  });
}

// Fonction pour créer et afficher le modal
function openImageModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.textContent = "×";
  closeBtn.addEventListener("click", closeModal);

  const modalTitle = document.createElement("h2");
  modalTitle.classList.add("titre-galerie");
  modalTitle.textContent = "Galerie photo";

  const imageForm = document.createElement("form");
  imageForm.id = "imageForm";

  const updateButton = document.createElement("button");
  updateButton.classList.add("addbutton");
  updateButton.type = "button";
  updateButton.textContent = "Ajouter une photo";
  updateButton.addEventListener("click", updateImage);

  imageForm.appendChild(updateButton);

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(imageForm);

  modal.appendChild(modalContent);

  document.body.appendChild(modal);
}

// Fonction pour fermer le modal
function closeModal() {
  const modal = document.querySelector(".modal");
  document.body.removeChild(modal);
}

// Fonction pour mettre à jour l'image
function updateImage() {
  const imageUrl = document.getElementById("imageUrl").value;
  closeModal();
}

const modifyBtn = document.getElementById("modifyBtn");
modifyBtn.addEventListener("click", openImageModal);
