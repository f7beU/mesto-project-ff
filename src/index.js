import "./index.css";
import { createCard, deleteCard, likeButtonJob } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getProfileData,
  openCard,
  editProfile,
  postNewCard,
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

const params = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const configValid = {
  formSubmitInactive: "form__submit_inactive",
  formInputTypeError: "form__input_type_error",
  formInputErrorActive: "form__input-error_active",
};

let nameMeProfile = "";
let autorCard = "";
let arrLikes = [];
let elementId = "";

Promise.all([getProfileData(), openCard()])
  .then((values) => {
    const [userData, cardsArray] = values;
    // console.log("Оба промиса сработали")
    nameInput.textContent = userData.name;
    jobInput.textContent = userData.about;
    imageProfileFoto.src = userData.avatar;
    nameMeProfile = userData.name;
    // console.log(cardsArray);
    cardsArray.forEach((el) => {
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
          likeButtonJob,
          popupOpenImageModal,
          nameMeProfile,
          autorCard,
          elementId,
          arrLikes
        )
      );
    });
  })
  .catch((err) => {
    console.error("Ошибка. Запрос не выполнен: ", err);
  });

// открытие попапа редактора профиля
const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
  clearValidation(popupTypeEdit, params);
  const nameInputFormPopup = popupTypeEdit.querySelector("#name-input");
  const descriptionInputFormPopup =
    popupTypeEdit.querySelector("#description-input");
  getProfileData()
    .then((res) => {
      nameInputFormPopup.value = res.name;
      descriptionInputFormPopup.value = res.about;
      openPopup(popupTypeEdit);
    })
    .catch((err) => {
      console.error("Ошибка. Запрос не выполнен: ", err);
    });
});

// открытие попапа добавления новой карточки
const addNewCardButton = document.querySelector(".profile__add-button");
addNewCardButton.addEventListener("click", () => {
  clearValidation(popupNewCard, params);
  openPopup(popupNewCard);
});

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

// изменение данных в форме карточки профиля
const formElementProfile = popupTypeEdit.querySelector(".popup__form");

function handleFormProfileSubmit(event) {
  event.preventDefault();

  editProfile(
    formElementProfile.name.value,
    formElementProfile.description.value
  )
    .then(loadingNewData(true, formElementProfile))
    .then((res) => {
      nameInput.textContent = res.name;
      jobInput.textContent = res.about;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.error("Ошибка. Запрос не выполнен: ", err);
    })
    .finally(() => {
      loadingNewData(false, formElementProfile);
    });
}
formElementProfile.addEventListener("submit", handleFormProfileSubmit);

// изменение аватара профиля
const imageProfileFotoPopup = document.querySelector(".popup_type_new-avatar");

imageProfileFoto.addEventListener("click", () => {
  clearValidation(imageProfileFotoPopup, params);
  openPopup(imageProfileFotoPopup);
});

const imageProfileForm = imageProfileFotoPopup.querySelector(
  params.formSelector
);

const imageNewProfileFoto = imageProfileForm.link;

imageProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  editProfileFoto(imageNewProfileFoto.value)
    .then(loadingNewData(true, imageProfileForm))
    .then((data) => {
      imageProfileFoto.src = data.avatar;
      closePopup(imageProfileFotoPopup);
      imageProfileForm.reset();
    })
    .catch((err) => {
      console.error("Возникла проблема с PATCH-запросом:", err.message);
    })
    .finally(() => {
      loadingNewData(false, imageProfileForm);
    });
});

// добавление новой карточки
const formElementNewCard = popupNewCard.querySelector(".popup__form");

formElementNewCard.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInputNewPlace = formElementNewCard.querySelector(
    ".popup__input_type_card-name"
  );

  const linkInputNewPlace = formElementNewCard.querySelector(
    ".popup__input_type_url"
  );

  const cardLike = formElementNewCard.querySelector(".likes__counter");

  postNewCard(nameInputNewPlace.value, linkInputNewPlace.value)
    .then(loadingNewData(true, popupNewCard))
    .then((res) => {
      autorCard = res.owner.name;
      elementId = res._id;
      arrLikes = res.likes;
      placesList.prepend(
        createCard(
          nameInputNewPlace.value,
          linkInputNewPlace.value,
          cardLike,
          deleteCard,
          likeButtonJob,
          popupOpenImageModal,
          nameMeProfile,
          autorCard,
          elementId,
          arrLikes
        )
      );
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.error("Ошибка. Запрос не выполнен: ", err);
    })
    .finally(() => {
      loadingNewData(false, popupNewCard);
    });
});

// функция отображения процесса загрузки
function loadingNewData(isLoading, popupForm) {
  const popupButton = popupForm.querySelector(params.submitButtonSelector);
  if (isLoading) {
    popupButton.textContent = "Сохранение...";
  } else {
    popupButton.textContent = "Сохранить";
  }
}

enableValidation(params);
