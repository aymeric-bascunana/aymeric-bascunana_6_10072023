const modifyBtn = document.getElementById("modifyBtn");
const btnModalAddWork = document.getElementById("btnModalAddWork");
const modalWorks = document.getElementById("modalWorks");
const modalAddWork = document.getElementById("modalAddWork");
const closeAddWorkModal = document.getElementById("closeAddWorkModal");
const closeWorkModal = document.getElementById("closeWorkModal");
const returnToWorks = document.getElementById("returnToWorks");

let modalIsOpen = false;

function openModal(modal) {
  modal.style.display = "block";
  modalIsOpen = true;
}

function closeModal(modal) {
  if (modal.id === "modalWork") {
    // Si c'est la modal de suppression, ne faites rien ici pour empêcher la fermeture
    clearImagePreview();
  }
  modal.style.display = "none";
  modalIsOpen = false;
}
function clearImagePreview() {
  const imagePreview = document.getElementById("imagePreview");
  const addImageContainer = document.getElementById("addImageContainer");

  // Cachez la prévisualisation
  imagePreview.style.display = "none";

  // Affichez à nouveau les éléments internes de la div
  const elementsToShow = addImageContainer.querySelectorAll(
    ".fa-image, .btnAdd, .sizeMax"
  );
  elementsToShow.forEach((element) => {
    element.style.display = "block";
  });

  // Effacez le contenu de l'élément de prévisualisation
  const previewImage = document.getElementById("previewImage");
  previewImage.src = "";
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

const formulaire = document.getElementById("addImageForm"); // Déclaration de formulaire

// Sélectionnez les éléments du formulaire
document.addEventListener("DOMContentLoaded", function () {
  const titreInput = document.getElementById("imageTitle");
  const categorieSelect = document.getElementById("imageCategory");
  const boutonValide = document.querySelector(".btnValide");
  const messageErreurDiv = document.getElementById("messageErreur");
  const fileInput = document.getElementById("imageUpload");

  function verifierChamps() {
    const fileInput = document.getElementById("imageUpload");
    const imageFile = fileInput.files[0];

    if (!titreInput.value || !categorieSelect.value || !fileInput.files[0]) {
      boutonValide.style.backgroundColor = "";
      boutonValide.disabled = true;
    } else {
      boutonValide.style.backgroundColor = "green";
      boutonValide.disabled = false;
    }

    if (!/image\/(jpeg|jpg|png)/.test(imageFile.type)) {
      messageErreurDiv.textContent =
        "Le fichier sélectionné n'est pas une image au format jpg, jpeg ou png. Veuillez sélectionner un fichier image valide.";
      boutonValide.style.backgroundColor = "";
      boutonValide.disabled = true;
    } else if (imageFile.size > 4 * 1024 * 1024) {
      // La taille du fichier est supérieure à 4 Mo (4 * 1024 * 1024 octets)
      messageErreurDiv.textContent =
        "Le fichier sélectionné est trop volumineux. La taille maximale autorisée est de 4 Mo.";
      boutonValide.style.backgroundColor = "";
      boutonValide.disabled = true;
    }
  }
  fileInput.addEventListener("input", verifierChamps);
  titreInput.addEventListener("input", verifierChamps);
  categorieSelect.addEventListener("change", verifierChamps);

  // Écoutez l'événement "submit" du formulaire
  formulaire.addEventListener("submit", function (e) {
    e.preventDefault();

    // Créez un nouvel objet FormData à partir du formulaire
    const formData = new FormData();

    formData.append("title", titreInput.value);
    formData.append("image", fileInput.files[0]);
    formData.append("category", categorieSelect.value);

    console.log(titreInput.value, fileInput.files[0], categorieSelect.value);

    // Ajoutez un gestionnaire d'événements au bouton pour déclencher l'ajout de l'image

    const token = localStorage.getItem("token");

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // L'ajout s'est bien déroulé, gérer la réponse ici
          console.log("L'image a été ajoutée avec succès.");
          // init();
        } else {
          // L'ajout a échoué, gérer l'erreur ici
          console.error("L'ajout de l'image a échoué.");
        }
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
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  });
});
