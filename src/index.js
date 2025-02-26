import "./index.css";
import { initialCards } from "./components/cards.js";
import {
  createCard,
  deleteCard,
  likeCardButton,
  openModalImageCard,
} from "./components/card.js";
import {
  openModalProfile,
  openModalNewCard,
  closeModal,
  closeModalOverleyAndEsc,
} from "./components/modal.js";

const logoImage = new URL("./images/logo.svg", import.meta.url);
const avatarImage = new URL("./images/avatar.jpg", import.meta.url);

const placesList = document.querySelector(".places__list");

export { popupNewCard, popupTypeEdit };

const popup = document.querySelector(".popup");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const allButtonsClosePopup = document.querySelectorAll(".popup__close");
const allButtonsClosePopupOverley = document.querySelectorAll(".popup");

initialCards.forEach((el) => {
  const cardTitle = el.name;
  const cardImage = el.link;

  placesList.append(
    createCard(
      cardTitle,
      cardImage,
      deleteCard,
      likeCardButton,
      openModalImageCard
    )
  );
});

//открытие попапа редактора профиля
const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", openModalProfile);

//открытие попапа добавления новой карточки
const addNewCardButton = document.querySelector(".profile__add-button");
addNewCardButton.addEventListener("click", openModalNewCard);


//закрывается попап на крестик в правом верхнем, оверлей и Esc
for (let i = 0; i < allButtonsClosePopup.length; i++) {
  allButtonsClosePopup[i].addEventListener("click", closeModal);
}
for (let i = 0; i < allButtonsClosePopupOverley.length; i++) {
  allButtonsClosePopupOverley[i].addEventListener(
    "click",
    closeModalOverleyAndEsc
  );
}
document.addEventListener("keydown", closeModalOverleyAndEsc);


//изменение данных в форме карточки профиля
const formElementProfile = document.querySelector(".popup__form");
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__description");

formElementProfile.name.value = nameInput.textContent;
formElementProfile.description.value = jobInput.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = formElementProfile.name.value;
  jobInput.textContent = formElementProfile.description.value;

  closeModal();
}
formElementProfile.addEventListener("submit", handleFormSubmit);


//добавление новой карточки
const formElementNewCard = popupNewCard.querySelector(".popup__form");

function addNewCardForm(evt) {
  evt.preventDefault();

  const nameInputNewPlace = formElementNewCard.querySelector(
    ".popup__input_type_card-name"
  );
  const linkInputNewPlace = formElementNewCard.querySelector(
    ".popup__input_type_url"
  );

  //добавляю карточку в начало списка используя createCard
  placesList.prepend(
    createCard(
      nameInputNewPlace.value,
      linkInputNewPlace.value,
      deleteCard,
      likeCardButton,
      openModalImageCard
    )
  );

  closeModal();
}
formElementNewCard.addEventListener("submit", addNewCardForm);
