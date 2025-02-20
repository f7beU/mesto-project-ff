import {card} from '../index.js'

export function createCard(cardTitle, cardImage, deleteCard, likeCardButton) {
  const cardElement = card.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const likeButton = cardElement.querySelector(".card__like-button")

  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardTitle;
  cardElement.querySelector(".card__title").textContent = cardTitle;

  deleteButton.addEventListener("click", deleteCard);

  likeButton.addEventListener("click", likeCardButton)

  return cardElement;
}

export function deleteCard(event) {
  const deleteItem = event.target.closest(".places__item");
  deleteItem.remove();
}

export function likeCardButton () {
  //console.log ("Нажато сердечко")
  const cardElement = card.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button")
  likeButton.classList.add('card__like-button_is-active')
  //console.log (likeButton)
}

