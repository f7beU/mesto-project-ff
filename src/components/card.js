const card = document.querySelector("#card-template").content;

export function createCard(
  cardTitle,
  cardImage,
  deleteCard,
  likeCardButton,
  popupOpenImageModal
) {
  const cardElement = card.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const popupOpenImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardTitle;
  cardElement.querySelector(".card__title").textContent = cardTitle;

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCardButton);
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
}
