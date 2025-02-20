import { popup, popupNewCard, popupTypeEdit, popupImage } from "../index.js";

export {
  openModal,
  openModalNewCard,
  closeModal,
  closeModalOverley,
  closeModalEsc,
};

function openModal() {
  //console.log("Есть нажатие на открытие попапа редактора профиля");
  popupTypeEdit.style.display = "flex";
  popupTypeEdit.style.transition = "visibility 0s 0.6s, opacity 0.6s";
}

function openModalNewCard() {
  //console.log("Есть нажатие на добавление карточки");
  popupNewCard.style.display = "flex";
}

function closeModal() {
  //console.log("Есть нажатие на кнопку закрытия попапа");
  popup.style.display = "none";
  popupNewCard.style.display = "none";
  popupImage.style.display = "none";
}

function closeModalOverley(evt) {
  if (evt.target === popup) {
    //console.log("Нажатие на попап");
    popup.style.display = "none";
    popupNewCard.style.display = "none";
    popupImage.style.display = "none";
  }
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    //console.log("Нажатие на Esc");
    popup.style.display = "none";
    popupNewCard.style.display = "none";
    popupImage.style.display = "none";
  }
}
