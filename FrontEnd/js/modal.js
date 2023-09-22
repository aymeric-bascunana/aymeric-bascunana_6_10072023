const modifyBtn = document.getElementById("modifyBtn");
const btnModalAddWork = document.getElementById("btnModalAddWork");
const modalWorks = document.getElementById("modalWorks");
const modalAddWork = document.getElementById("modalAddWork");
const closeAddWorkModal = document.getElementById("closeAddWorkModal");
const closeWorkModal = document.getElementById("closeWorkModal");
const returnToWorks = document.getElementById("returnToWorks");

function openModal(modal) {
  modal.style.display = "block";
}

function closeModal(modal) {
  modal.style.display = "none";
}

modifyBtn.addEventListener("click", () => {
  openModal(modalWorks);
});

btnModalAddWork.addEventListener("click", () => {
  openModal(modalAddWork);
  closeModal(modalWorks);
});

closeAddWorkModal.addEventListener("click", () => {
  closeModal(modalAddWork);
});

closeWorkModal.addEventListener("click", () => {
  closeModal(modalWorks);
});

returnToWorks.addEventListener("click", () => {
  returnToPreviousModal();
});

function returnToPreviousModal() {
  // Masquez la modal actuelle
  const modalAddWork = document.getElementById("modalAddWork");
  modalAddWork.style.display = "none";

  // Affichez la modal précédente
  const modalWorks = document.getElementById("modalWorks");
  modalWorks.style.display = "block";
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
  const addImageContainer = document.getElementById("addImageContainer");

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

// Sélectionnez l'élément de prévisualisation de l'image
const imagePreview = document.getElementById("imagePreview");

// Sélectionnez l'élément de la div "addImg"
const addImgContainer = document.getElementById("addImageContainer");

// Ajoutez un gestionnaire d'événement pour détecter quand l'image de prévisualisation apparaît
imagePreview.addEventListener("load", function () {
  // L'image de prévisualisation est chargée, ajoutez la classe pour élargir la div
  addImgContainer.classList.add("addImg-wide");
});

// Ajoutez un gestionnaire d'événement pour détecter quand l'image de prévisualisation disparaît
function removeWideClass() {
  addImgContainer.classList.remove("addImg-wide");
}

// Ajoutez un gestionnaire d'événements au bouton "Valider"
// document.getElementById("addImageForm").addEventListener("submit", (event) => {
//   event.preventDefault();

//   const imageTitle = document.getElementById("imageTitle").value;
//   const imageCategory = document.getElementById("imageCategory").value;
//   const previewImage = document.getElementById("previewImage");

//   // Vérifiez si une image a été sélectionnée
//   if (previewImage.src) {
//     // Créez un objet "work" avec les données de l'image
//     const newWork = {
//       imageUrl: previewImage.src,
//       title: imageTitle,
//       category: {
//         name: imageCategory,
//       },
//     };

//     // Ajoutez cet objet "work" à la div "gallery" en appelant la fonction createWorks
//     addImageToWorks([newWork]);

//     // Réinitialisez le formulaire
//     document.getElementById("imageTitle").value = "";
//     document.getElementById("imageCategory").value = "categorie1";
//     document.getElementById("imagePreview").style.display = "none";
//     document.getElementById("previewImage").src = "";
//   } else {
//     alert("Veuillez sélectionner une image avant de valider.");
//   }
// });

// Sélectionnez les éléments du formulaire
const formulaire = document.getElementById("addImageForm");
const imageInput = document.getElementById("imageUpload");
const titreInput = document.getElementById("imageTitle");
const categorieSelect = document.getElementById("imageCategory");
const boutonValide = document.querySelector(".btnValide");

// Fonction pour vérifier si les champs sont remplis
function verifierChamps() {
  if (titreInput.value && categorieSelect.value && imageInput.files[0]) {
    boutonValide.style.backgroundColor = "green"; // Changer la couleur du bouton en vert
    boutonValide.disabled = false;
  } else {
    boutonValide.style.backgroundColor = ""; // Revenir à la couleur par défaut du bouton
    boutonValide.disabled = true;
  }
}

// Ajouter des écouteurs d'événements pour chaque champ
imageInput.addEventListener("input", verifierChamps);
titreInput.addEventListener("input", verifierChamps);
categorieSelect.addEventListener("change", verifierChamps);

// Écoutez l'événement "submit" du formulaire
formulaire.addEventListener("submit", function (e) {
  e.preventDefault();

  // Créez un nouvel objet FormData à partir du formulaire
  const formData = new FormData();

  formData.append("title", titreInput.value);
  formData.append("image", imageInput.files[0]);
  formData.append("category", categorieSelect.value);

  // Exemple de requête POST avec fetch :
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      return response.json();
    })
    .then((response) => {
      console.log(response);
      // Fermez la modal après avoir ajouté avec succès
      closeModal(modalAddWork);

      // Réinitialisez le formulaire
      document.getElementById("imageTitle").value = "";
      document.getElementById("imageCategory").value = "categorie1";
      document.getElementById("imagePreview").style.display = "none";
      document.getElementById("previewImage").src = "";

      // Actualisez la galerie pour afficher la nouvelle œuvre
      init();
      //Fuermeture de la modal
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
});

// Fonction pour créer et afficher le modal
// function openImageModal() {
//   const modal = document.createElement("div");
//   modal.classList.add("modal");

//   const modalContent = document.createElement("div");
//   modalContent.classList.add("modal-content");

//   const closeBtn = document.createElement("span");
//   closeBtn.classList.add("close");
//   closeBtn.textContent = "×";
//   closeBtn.addEventListener("click", closeModal);

//   const modalTitle = document.createElement("h2");
//   modalTitle.classList.add("titre-galerie");
//   modalTitle.textContent = "Galerie photo";

//   const worksContainer = document.createElement("ul");
//   worksContainer.classList.add("works-container");

//   // Remplir la liste des works depuis le fetch
//   //   fetchWorks().then((works) => {
//   //     works.forEach((work) => {
//   //       const workItem = document.createElement("li");
//   //       workItem.textContent = work;
//   //       worksContainer.appendChild(workItem);
//   //     });
//   //   });

//   const updateButton = document.createElement("button");
//   updateButton.classList.add("addbutton");
//   updateButton.type = "button";
//   updateButton.textContent = "Ajouter une photo";
//   updateButton.addEventListener("click", updateImage);

//   worksContainer.appendChild(updateButton);

//   modalContent.appendChild(closeBtn);
//   modalContent.appendChild(modalTitle);
//   modalContent.appendChild(worksContainer);

//   modal.appendChild(modalContent);

//   document.body.appendChild(modal);
// }

// Fonction pour fermer le modal
// function closeModal() {
//   const modal = document.querySelector(".modal");
//   document.body.removeChild(modal);
// }

// Fonction pour mettre à jour l'image
// function updateImage() {
//   const imageUrl = document.getElementById("imageUrl").value;
//   closeModal();
// }
