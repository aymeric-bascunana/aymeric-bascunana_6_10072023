const modifyBtn = document.getElementById("modifyBtn");
const btnModalAddWork = document.getElementById("btnModalAddWork");
const modalWorks = document.getElementById("modalWorks");
const modalAddWork = document.getElementById("modalAddWork");

modifyBtn.addEventListener("click", () => {
  openModal(modalWorks);
});
btnModalAddWork.addEventListener("click", () => {
  openModal(modalAddWork);
  closeModal(modalWorks);
});

function openModal(modal) {
  modal.style.display = "block";
}

function closeModal(modal) {
  modal.style.display = "none";
}

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
