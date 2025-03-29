import { deleteMeCard, cardLikeAdd, cardLikeRemove } from "../api.js";

const card = document.querySelector("#card-template").content;

export function createCard(
  cardTitle,
  cardImage,
  cardLike,
  deleteCard,
  likeCardButton,
  likeCardButtonOff,
  popupOpenImageModal,
  nameMeProfile,
  autorCard,
  elementId,
  arrLikes
) {
  const cardElement = card.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const popupOpenImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardTitle;
  cardElement.querySelector(".card__title").textContent = cardTitle;

  // проверяю кто автор карточки
  if (autorCard !== nameMeProfile) {
    // console.log("Имена не совпадают")
    deleteButton.style.display = "none";
  }

  checkArrayLikes(arrLikes, likeButton);

  cardElement.querySelector(".likes__counter").textContent = cardLike;

  // вызов функции удаления карточки со страницы
  deleteButton.addEventListener("click", deleteCard);
  // вызов функции удаления карточки с сервера
  deleteButton.addEventListener("click", () => deleteMeCard(elementId));

  // вызов функции постановки лайка на страницу и на сервер
  likeButton.addEventListener("click", likeCardButton);
  likeButton.addEventListener("click", () =>
    cardLikeAdd(elementId)
      .then((res) => {
        // console.log("Лайк поставлен");
        return res.json();
      })
      .then((data) => {
        // console.log(data.likes.length + " новое количество лайков");
        cardElement.querySelector(".likes__counter").textContent =
          data.likes.length;
      })
      .catch((err) => {
        console.log("Возникла проблема с PUT-запросом:", err.message);
      })
  );

  //функция снятия лайка
  const likeButtonOff = cardElement.querySelector(
    ".card__like-button_is-active"
  );
  if (likeButtonOff !== null) {
    likeButtonOff.addEventListener("click", likeCardButtonOff);
    likeButtonOff.addEventListener("click", () =>
      cardLikeRemove(elementId)
        .then((res) => {
          // console.log("Лайк успешно снят");
          return res.json();
        })
        .then((data) => {
          // console.log(data.likes.length + " новое количество лайков");
          cardElement.querySelector(".likes__counter").textContent =
            data.likes.length;
        })
        .catch((err) => {
          console.log("Возникла проблема с DELETE-запросом:", err.message);
        })
    );
  }

  popupOpenImage.addEventListener("click", () =>
    popupOpenImageModal(cardImage, cardTitle)
  );

  return cardElement;
}

// функция удаления карточки со страницы
export function deleteCard(event) {
  const deleteItem = event.target.closest(".places__item");
  deleteItem.remove();
}

// функция постановки лайка на страницу
export function likeCardButton(event) {
  //console.log ("Нажато сердечко")
  event.target.classList.add("card__like-button_is-active");
}

// функция удаления лайка со страницы
export function likeCardButtonOff(event) {
  event.target.classList.remove("card__like-button_is-active");
}

// функция для отрисовки поставленного мною
// ранее лайка на странице при перезагрузке
import { nameMeProfile } from "../index.js";
export function checkArrayLikes(arr, likeButton) {
  arr.forEach((el) => {
    // console.log(el.name)
    if (el.name === nameMeProfile) {
      // console.log("Это мой лайк")
      likeButton.classList.add("card__like-button_is-active");
    }
  });
}
