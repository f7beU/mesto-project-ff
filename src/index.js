import "./index.css";
import {
  createCard,
  deleteCard,
  likeCardButton,
  likeCardButtonOff,
} from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  openProfileData,
  openCard,
  editProfile,
  createNewCard,
  editProfileFoto,
} from "./api.js";

const logoImage = new URL("./images/logo.svg", import.meta.url);
const avatarImage = new URL("./images/avatar.jpg", import.meta.url);

const placesList = document.querySelector(".places__list");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const allPopups = document.querySelectorAll(".popup");

const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__description");
const imageProfileFoto = document.querySelector(".profile__image");

//style="background-image: url(<%=require('./images/avatar.jpg')%>)"
const params = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export let nameMeProfile = "";
let autorCard = "";
let arrLikes = [];
let elementId = "";

Promise.all([openProfileData, openCard]).then((values) => {
  const [promise1data, promise2data] = values;
  // console.log("Оба промиса сработали")
  openProfileData().then((data) => {
    nameInput.textContent = data.name;
    jobInput.textContent = data.about;
    imageProfileFoto.src = data.avatar;
    nameMeProfile = data.name;
  });
  openCard().then((data) => {
    // console.log(data);
    data.forEach((el) => {
      const cardLike = el.likes.length;
      autorCard = el.owner.name;
      arrLikes = el.likes;
      elementId = el._id;
      placesList.append(
        createCard(
          el.name,
          el.link,
          cardLike,
          deleteCard,
          likeCardButton,
          likeCardButtonOff,
          popupOpenImageModal,
          nameMeProfile,
          autorCard,
          elementId,
          arrLikes
        )
      );
    });
  });
});

// открытие попапа редактора профиля
const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => openPopup(popupTypeEdit));

// открытие попапа добавления новой карточки
const addNewCardButton = document.querySelector(".profile__add-button");
addNewCardButton.addEventListener("click", () => openPopup(popupNewCard));

// функция открытия попапа при нажатии на картинку
function popupOpenImageModal(url, alt) {
  openPopup(popupImage);
  popupImage.querySelector("img").src = url;
  popupImage.querySelector(".popup__caption").textContent = alt;
  popupImage.querySelector("img").alt = alt;
}

// закрытие попапа нажатием на крестик
for (let i = 0; i < allPopups.length; i++) {
  const popupCloseButton = allPopups[i].querySelector(".popup__close");
  popupCloseButton.addEventListener("click", () => closePopup(allPopups[i]));
}

// изменение данных в форме карточки профиля и аватара профиля
const formElementProfile = popupTypeEdit.querySelector(".popup__form");
const imageProfileFotoPopup = document.querySelector(".popup_type_new-avatar");

imageProfileFoto.addEventListener("click", () =>
  openPopup(imageProfileFotoPopup)
);
const imageProfileLink = imageProfileFotoPopup.querySelector(".popup__form");
const imageProfileLinkButton =
  imageProfileFotoPopup.querySelector(".popup__button");
imageProfileLinkButton.addEventListener("click", () =>
  editProfileFoto(imageProfileLink.link.value)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.avatar);
    })
    .catch((err) => {
      console.log("Возникла проблема с PATCH-запросом:", err.message);
    })
);

formElementProfile.name.value = nameInput.textContent;
formElementProfile.description.value = jobInput.textContent;

function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = formElementProfile.name.value;
  jobInput.textContent = formElementProfile.description.value;

  editProfile(
    formElementProfile.name.value,
    formElementProfile.description.value
  );

  closePopup(popupTypeEdit);
}
formElementProfile.addEventListener("submit", handleFormProfileSubmit);

// закрытие попапа профиля с незаполненными полями ввода
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

// добавление новой карточки
const formElementNewCard = popupNewCard.querySelector(".popup__form");

function addNewCardForm(evt) {
  evt.preventDefault();

  const nameInputNewPlace = formElementNewCard.querySelector(
    ".popup__input_type_card-name"
  );
  const linkInputNewPlace = formElementNewCard.querySelector(
    ".popup__input_type_url"
  );

  const cardLike = formElementNewCard.querySelector(".likes__counter");

  // добавляю карточку в начало списка используя createCard
  placesList.prepend(
    createCard(
      nameInputNewPlace.value,
      linkInputNewPlace.value,
      cardLike,
      deleteCard,
      likeCardButton,
      likeCardButtonOff, //
      popupOpenImageModal,
      nameMeProfile,
      autorCard,
      elementId,
      arrLikes
    )
  );

  createNewCard(nameInputNewPlace.value, linkInputNewPlace.value);

  closePopup(popupNewCard);

  nameInputNewPlace.value = "";
  linkInputNewPlace.value = "";
  clearValidation(formElementNewCard, params);
}
formElementNewCard.addEventListener("submit", addNewCardForm);

enableValidation(params);
