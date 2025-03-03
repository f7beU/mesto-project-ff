import "./index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCardButton } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const logoImage = new URL("./images/logo.svg", import.meta.url);
const avatarImage = new URL("./images/avatar.jpg", import.meta.url);

const placesList = document.querySelector(".places__list");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const allPopups = document.querySelectorAll(".popup");

initialCards.forEach((el) => {
  const cardTitle = el.name;
  const cardImage = el.link;

  placesList.append(
    createCard(
      cardTitle,
      cardImage,
      deleteCard,
      likeCardButton,
      popupOpenImageModal
    )
  );
});

//открытие попапа редактора профиля
const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => openPopup(popupTypeEdit));

//открытие попапа добавления новой карточки
const addNewCardButton = document.querySelector(".profile__add-button");
addNewCardButton.addEventListener("click", () => openPopup(popupNewCard));

//функция открытия при нажатии на картинку
function popupOpenImageModal(url, alt) {
  openPopup(popupImage);
  popupImage.querySelector("img").src = url;
  popupImage.querySelector(".popup__caption").textContent = alt;
  popupImage.querySelector("img").alt = alt;
}

//закрытие попапа нажатием на крестик
for (let i = 0; i < allPopups.length; i++) {
  const popupCloseButton = allPopups[i].querySelector(".popup__close");
  popupCloseButton.addEventListener("click", () => closePopup(allPopups[i]));
}

//изменение данных в форме карточки профиля
const formElementProfile = popupTypeEdit.querySelector(".popup__form");
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__description");

formElementProfile.name.value = nameInput.textContent;
formElementProfile.description.value = jobInput.textContent;

function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = formElementProfile.name.value;
  jobInput.textContent = formElementProfile.description.value;

  closePopup(popupTypeEdit);
}
formElementProfile.addEventListener("submit", handleFormProfileSubmit);

//закрытие попапа профиля с незаполненными полями ввода
const formElementProfileCloseButton =
  popupTypeEdit.querySelector(".popup__close");
formElementProfileCloseButton.addEventListener("click", function () {
  if (formElementProfile.name.value === "") {
    formElementProfile.name.value = nameInput.textContent;
  }
  if (formElementProfile.description.value === "") {
    formElementProfile.description.value = jobInput.textContent;
  }
});

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
      popupOpenImageModal
    )
  );

  closePopup(popupNewCard);

  nameInputNewPlace.value = "";
  linkInputNewPlace.value = "";
}
formElementNewCard.addEventListener("submit", addNewCardForm);
