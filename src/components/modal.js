import { popupNewCard, popupTypeEdit } from "../index.js";

import { popupImage } from "./card.js";

export {
  openModalProfile,
  openModalNewCard,
  closeModal,
  closeModalOverleyAndEsc,
};

function openModalProfile() {
  //console.log("Есть нажатие на открытие попапа редактора профиля");
  popupTypeEdit.classList.add("popup_is-opened");
}

function openModalNewCard() {
  //console.log("Есть нажатие на попап добавления карточки");
  popupNewCard.classList.add("popup_is-opened");
}

function closeModal() {
  //console.log ("Нажатие на крестик закрытия любого попапа")
  popupTypeEdit.classList.remove("popup_is-opened");
  popupNewCard.classList.remove("popup_is-opened");
  popupImage.classList.remove("popup_is-opened");
}

function closeModalOverleyAndEsc(event) {
  //console.log (event.target)
  if (
    event.target === popupTypeEdit ||
    event.target === popupNewCard ||
    event.target === popupImage ||
    event.key === "Escape"
  ) {
    popupTypeEdit.classList.remove("popup_is-opened");
    popupNewCard.classList.remove("popup_is-opened");
    popupImage.classList.remove("popup_is-opened");
  }
}
