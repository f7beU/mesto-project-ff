export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
  document.addEventListener("click", closePopupOverleyClick);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
  document.removeEventListener("click", closePopupOverleyClick);
}

function handleEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function closePopupOverleyClick(event) {
  const popupElement = event.target;
  const popupElementContainsClass = popupElement.classList.contains("popup");
  if (popupElementContainsClass === true) {
    closePopup(popupElement);
  }
}
