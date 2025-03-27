import "./index.css";
import { initialCards } from "./components/cards.js";
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
// const imageProfile = document.querySelector(".profile__image")
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
let arrLikes = []
let elementId = ""

Promise.all([openProfileData, openCard]).then((values) => {
  const [promise1data, promise2data] = values;
  // console.log(promise1data);
  // console.log(promise2data);
  // console.log("Оба промиса сработали")
  openProfileData().then((data) => {
    // console.log(data)
    nameInput.textContent = data.name;
    jobInput.textContent = data.about;
    imageProfileFoto.src = data.avatar;
    // console.log("Свой id: ", data._id)
    nameMeProfile = data.name;
    // console.log("Свой id: ", idMeProfile)
  });
  openCard().then((data) => {
    console.log(data);
    data.forEach((el) => {
      const cardLike = el.likes.length;
      // console.log(el.owner.name)
      autorCard = el.owner.name;
      // console.log(el.likes)
      arrLikes = el.likes;
      // console.log(arrLikes)
      // console.log(autorCard)
      // console.log(el._id)
      elementId = el._id
      // if (el._id !== idMeProfile) {
      //   console.log("ID не совпадают")
      // }
      // else {
      //   console.log("Совпадение обнаружено")
      // }
      placesList.append(
        createCard(
          el.name,
          el.link,
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
    });
  });
});

// openProfileData ()
// .then((data) => {
//   // console.log(data)
//   // console.log(data.name)
//   // dataProfile = data
//   nameInput.textContent = data.name
//   // console.log(data.about)
//   jobInput.textContent = data.about
//   // console.log(data.avatar)
//   imageProfileFoto.src = data.avatar
// })

// openCard()
// .then((data) => {
//   // console.log(data);
//   // console.log("Что-то пришло с сервера")
//   data.forEach(el => {
//     // console.log(el.name)
//     // console.log(el.link)
//     // console.log(el.likes.length)
//     const cardLike = el.likes.length
//     // console.log(el.likes)
//     // console.log(cardLike)
//     placesList.append(createCard(
//       el.name,
//       el.link,
//       cardLike,
//       deleteCard,
//       likeCardButton,
//       popupOpenImageModal
//     ))
//   })
// })

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
// const nameInput = document.querySelector(".profile__title");
// const jobInput = document.querySelector(".profile__description");

formElementProfile.name.value = nameInput.textContent;
formElementProfile.description.value = jobInput.textContent;

function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  // formElementProfile.name.value = nameInput.textContent;
  // formElementProfile.description.value = jobInput.textContent;

  nameInput.textContent = formElementProfile.name.value;
  jobInput.textContent = formElementProfile.description.value;

  editProfile(
    formElementProfile.name.value,
    formElementProfile.description.value
  );

  closePopup(popupTypeEdit);
  // clearValidation(formElementProfile, params)
  // console.log(formElementProfile)
}
formElementProfile.addEventListener("submit", handleFormProfileSubmit);

// editProfile()

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

  const cardLike = formElementNewCard.querySelector(".likes__counter");
  // cardLike.value = 0
  // console.log(cardLike)
  // if (cardLike === null) {
  //   cardLike.value = "0"
  //   console.log("Поменять значение")
  // }

  //добавляю карточку в начало списка используя createCard
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
