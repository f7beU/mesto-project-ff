// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// const card = document.querySelector("#card-template").content;

// const placesList = document.querySelector(".places__list");

// function createCard(cardTitle, cardImage, deleteCard) {
//   const cardElement = card.querySelector(".card").cloneNode(true);
//   const deleteButton = cardElement.querySelector(".card__delete-button");

//   cardElement.querySelector(".card__image").src = cardImage;
//   cardElement.querySelector(".card__image").alt = cardTitle;
//   cardElement.querySelector(".card__title").textContent = cardTitle;

//   deleteButton.addEventListener("click", deleteCard);

//   return cardElement;
// }

// function deleteCard(event) {
//   const deleteItem = event.target.closest(".places__item");
//   deleteItem.remove();
// }

// initialCards.forEach((el) => {
//   const cardTitle = el.name;
//   const cardImage = el.link;

//   placesList.append(createCard(cardTitle, cardImage, deleteCard));
// });


// export const card = document.querySelector("#card-template").content;

// export const placesList = document.querySelector(".places__list");

// export function createCard(cardTitle, cardImage, deleteCard) {
//   const cardElement = card.querySelector(".card").cloneNode(true);
//   const deleteButton = cardElement.querySelector(".card__delete-button");

//   cardElement.querySelector(".card__image").src = cardImage;
//   cardElement.querySelector(".card__image").alt = cardTitle;
//   cardElement.querySelector(".card__title").textContent = cardTitle;

//   deleteButton.addEventListener("click", deleteCard);

//   return cardElement;
// }

// export function deleteCard(event) {
//   const deleteItem = event.target.closest(".places__item");
//   deleteItem.remove();
// }

// initialCards.forEach((el) => {
//   const cardTitle = el.name;
//   const cardImage = el.link;

//   placesList.append(createCard(cardTitle, cardImage, deleteCard));
// });