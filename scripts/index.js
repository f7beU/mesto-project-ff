// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const card = document.querySelector("#card-template").content;

const placesList = document.querySelector(".places__list");

function addCard(arr) {
  arr.forEach((el) => {
    const cardTitle = el.name;
    const cardImage = el.link;

    placesList.append(createCard(cardTitle, cardImage));
  });
}
addCard(initialCards);

function createCard(cardTitle, cardImage) {
  const cardElement = card.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardTitle;
  cardElement.querySelector(".card__title").textContent = cardTitle;

  deleteButton.addEventListener("click", function () {
    const listItem = deleteButton.closest(".places__item");
    listItem.remove();
  });

  return cardElement;
}
