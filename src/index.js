import "./index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCardButton } from "./components/card.js";
import {
  openModal,
  closeModal,
  closeModalOverley,
  closeModalEsc,
  openModalNewCard,
} from "./components/modal.js";

const logoImage = new URL("./images/logo.svg", import.meta.url);
const avatarImage = new URL("./images/avatar.jpg", import.meta.url);

const placesList = document.querySelector(".places__list");

export {
  card,
  popup,
  popupNewCard,
  popupTypeEdit,
  popupImage,
  allButtonsClosePopup,
  allButtonsClosePopupOverley,
};

const card = document.querySelector("#card-template").content;
const popup = document.querySelector(".popup");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const allButtonsClosePopup = document.querySelectorAll(".popup__close");
const allButtonsClosePopupOverley = document.querySelectorAll(".popup");

initialCards.forEach((el) => {
  const cardTitle = el.name;
  const cardImage = el.link;

  placesList.append(
    createCard(cardTitle, cardImage, deleteCard, likeCardButton)
  );
});

//открывается попап редактора профиля
const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", openModal);

//открытие попапа добавления новой карточки
const addNewCardButton = document.querySelector(".profile__add-button");
addNewCardButton.addEventListener("click", openModalNewCard);

export const popupOpenImage = document.querySelectorAll(".card__image");
for (let i = 0; i < popupOpenImage.length; i++) {
  popupOpenImage[i].addEventListener("click", function () {
    popupImage.style.display = "flex";
    popupImage.style.transition = "visibility 0s 0.6s, opacity 0.6s";

    console.log(popupOpenImage);
    popupImage.querySelector("img").src = popupOpenImage[i].src;
    popupImage.querySelector(".popup__caption").textContent =
      popupOpenImage[i].alt;
  });
}

//закрывается попап на крестик в правом верхнем, оверлей и Esc
for (let i = 0; i < allButtonsClosePopup.length; i++) {
  allButtonsClosePopup[i].addEventListener("click", closeModal);
}
for (let i = 0; i < allButtonsClosePopupOverley.length; i++) {
  allButtonsClosePopupOverley[i].addEventListener("click", closeModalOverley);
}
document.addEventListener("keydown", closeModalEsc);

//изменение данных в форме карточки профиля
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__description");

formElement.name.value = nameInput.textContent;
formElement.description.value = jobInput.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = formElement.name.value;
  jobInput.textContent = formElement.description.value;

  closeModal();
}
formElement.addEventListener("submit", handleFormSubmit);

//добавление новой карточки
const formElementNewCard = popupNewCard.querySelector(".popup__form");

const newCardObj = {};

function addNewCardForm(evt) {
  evt.preventDefault();

  const nameInputNewPlace = formElementNewCard.querySelector(
    ".popup__input_type_card-name"
  );
  newCardObj.name = nameInputNewPlace.value;

  const linkInputNewPlace = formElementNewCard.querySelector(
    ".popup__input_type_url"
  );
  newCardObj.link = linkInputNewPlace.value;

  //удаление всех имеющихся на странице карточек
  const allCardDisplay = document.querySelectorAll(".places__item");
  for (let i = 0; i < allCardDisplay.length; i++) {
    allCardDisplay[i].remove();
  }

  initialCards.unshift(newCardObj);

  closeModal();
  //console.log ("Закрытие окна создания новой карточки через 'Сохранить'")

  initialCards.forEach((el) => {
    const cardTitle = el.name;
    const cardImage = el.link;

    placesList.append(
      createCard(cardTitle, cardImage, deleteCard, likeCardButton)
    );
  });

  nameInputNewPlace.value = "";
  linkInputNewPlace.value = "";

  const newPopupOpenImage = document.querySelectorAll(".card__image");
  for (let i = 0; i < newPopupOpenImage.length; i++) {
    newPopupOpenImage[i].addEventListener("click", function () {
      popupImage.style.display = "flex";
      popupImage.querySelector("img").src = newPopupOpenImage[i].src;
      popupImage.querySelector(".popup__caption").textContent =
        newPopupOpenImage[i].alt;
    });
  }
}
formElementNewCard.addEventListener("submit", addNewCardForm);
