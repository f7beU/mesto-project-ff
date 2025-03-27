import { deleteMeCard, cardLikeAdd, cardLikeRemove } from "../api.js";

const card = document.querySelector("#card-template").content;

export function createCard(
  cardTitle,
  cardImage,
  cardLike,
  deleteCard,
  likeCardButton,
  likeCardButtonOff, // добавил
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

  if (autorCard !== nameMeProfile) {
    // console.log("Имена не совпадают")
    deleteButton.style.display = "none";
  }

  checkArrayLikes(arrLikes, likeButton);

  // const likesCounter = cardElement.querySelector(".likes__counter")
  cardElement.querySelector(".likes__counter").textContent = cardLike;

  deleteButton.addEventListener("click", deleteCard);
  //функция удаления карточки с сервера
  deleteButton.addEventListener("click", () => deleteMeCard(elementId));

  //функция постановки лайка
  likeButton.addEventListener("click", likeCardButton);
  likeButton.addEventListener(
    "click",
    () =>
      cardLikeAdd(elementId)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Сетевой ответ не был успешным");
          }
          console.log("Лайк поставлен");
          return response.json();
        })
        .then((data) => {
          console.log(data.likes.length);
          cardElement.querySelector(".likes__counter").textContent =
            data.likes.length;
        })
    // .catch((error) => {
    //   console.error("Возникла проблема с PUT-запросом:", error.message);
    // });
  );

  //функция снятия лайка
  const likeButtonOff = cardElement.querySelector(
    ".card__like-button_is-active"
  );
  // console.log(likeButtonOff)
  if (likeButtonOff !== null) {
    likeButtonOff.addEventListener("click", likeCardButtonOff);
    likeButtonOff.addEventListener(
      "click",
      () =>
        cardLikeRemove(elementId)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Сетевой ответ не был успешным");
            }
            console.log("Лайк успешно снят");
            return response.json();
          })
          .then((data) => {
            console.log(data.likes.length);
            cardElement.querySelector(".likes__counter").textContent =
              data.likes.length;
          })
      // .catch((error) => {
      //   console.error("Возникла проблема с PUT-запросом:", error.message);
      // });
    );
  }

  popupOpenImage.addEventListener("click", () =>
    popupOpenImageModal(cardImage, cardTitle)
  );

  return cardElement;
}

export function deleteCard(event) {
  const deleteItem = event.target.closest(".places__item");
  deleteItem.remove();
}

export function likeCardButton(event) {
  //console.log ("Нажато сердечко")
  event.target.classList.add("card__like-button_is-active");

  // const likeButtonOff = cardElement.querySelector(
  //   ".card__like-button_is-active"
  // );
  // // console.log(likeButtonOff)
  // if (likeButtonOff !== null) {
  //   likeButtonOff.addEventListener("click", likeCardButtonOff);
  //   likeButtonOff.addEventListener(
  //     "click",
  //     () =>
  //       cardLikeRemove(elementId)
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error("Сетевой ответ не был успешным");
  //           }
  //           console.log("Лайк успешно снят");
  //           return response.json();
  //         })
  //         .then((data) => {
  //           console.log(data.likes.length);
  //           cardElement.querySelector(".likes__counter").textContent =
  //             data.likes.length;
  //         })
  //     // .catch((error) => {
  //     //   console.error("Возникла проблема с PUT-запросом:", error.message);
  //     // });
  //   );
  // }
}

export function likeCardButtonOff(event) {
  event.target.classList.remove("card__like-button_is-active");
}

// функция для отрисовки поставленного мною
// ранее лайка на странице при перезагрузке
import { nameMeProfile } from "../index.js";
export function checkArrayLikes(arr, likeButton) {
  // console.log(arr)
  arr.forEach((el) => {
    // console.log(el)
    // console.log(el.name)
    if (el.name === nameMeProfile) {
      // console.log("Это мой лайк")
      likeButton.classList.add("card__like-button_is-active");
    }
  });
}
