import { deleteMeCard, cardLikeAdd, cardLikeRemove } from "../api.js";

const card = document.querySelector("#card-template").content;

export function createCard(
  cardTitle,
  cardImage,
  cardLike,
  deleteCard,
  likeButtonJob,
  popupOpenImageModal,
  idMeProfile,
  idAutorCard,
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
  if (idAutorCard !== idMeProfile) {
    // console.log("Имена не совпадают")
    deleteButton.style.display = "none";
  }

  // вызов функции проверки, стоит ли мой лайк на карточке
  checkArrayLikes(arrLikes, likeButton, idMeProfile);

  const likesCounter = cardElement.querySelector(".likes__counter");

  likesCounter.textContent = cardLike;

  // вызов функции удаления карточки со страницы
  deleteButton.addEventListener("click", (event) =>
    deleteCard(event, elementId)
  );

  // вызов функции работы лайка
  likeButton.addEventListener("click", (event) =>
    likeButtonJob(event, elementId, likeButton, likesCounter)
  );

  popupOpenImage.addEventListener("click", () =>
    popupOpenImageModal(cardImage, cardTitle)
  );

  return cardElement;
}

// функция удаления карточки со страницы
export function deleteCard(event, elementId) {
  const deleteItem = event.target.closest(".places__item");
  deleteMeCard(elementId)
    .then(deleteItem.remove())
    .catch((err) => {
      console.error("Возникла проблема с DELETE-запросом:", err.message);
    });
}

// функция работы кнопки лайка
export function likeButtonJob(event, elementId, likeButton, likesCounter) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    // console.log("Лайк присутствует");
    cardLikeRemove(elementId)
      .then((data) => {
        // console.log("Снимаю лайк");
        // console.log(data.likes.length + " новое количество лайков");
        likesCounter.textContent = data.likes.length;
        event.target.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.error("Возникла проблема с DELETE-запросом:", err.message);
      });
  } else {
    // console.log("Лайк отсутствует");
    cardLikeAdd(elementId)
      .then((data) => {
        // console.log("Ставлю лайк");
        // console.log(data.likes.length + " новое количество лайков");
        likesCounter.textContent = data.likes.length;
        event.target.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.error("Возникла проблема с PUT-запросом:", err.message);
      });
  }
}

// функция для отрисовки поставленного мною
// ранее лайка на странице при перезагрузке
export function checkArrayLikes(arr, likeButton, idMeProfile) {
  arr.forEach((el) => {
    if (el._id === idMeProfile) {
      // console.log("Это мой лайк")
      likeButton.classList.add("card__like-button_is-active");
    }
  });
}
