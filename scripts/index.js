// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const card = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function workingCard() {
  initialCards.forEach((el) => {
    const cardTitle = el.name;
    const cardImage = el.link;
    const cardItem = card.querySelector(".places__item").cloneNode(true);
    cardItem.querySelector(".card__image").src = cardImage;
    cardItem.querySelector(".card__title").textContent = cardTitle;
    placesList.append(cardItem);
    const deleteButton = document.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", deleteCard);
  });
}
workingCard(initialCards);

function deleteCard() {
  const deleteButton = document.querySelector(".card__delete-button");
  const listItem = deleteButton.closest(".places__item");
  listItem.remove();
}
