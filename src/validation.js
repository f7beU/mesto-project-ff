// включение валидации вызовом enableValidation
// все настройки передаются при вызове

import { configValid } from "./index.js";

export const clearValidation = (formElement, params) => {
  const inputList = Array.from(
    formElement.querySelectorAll(params.inputSelector)
  );
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.value = "";
    hideInputError(formElement, inputElement, params);
  });
  toggleButtonState(inputList, buttonElement, params);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const toggleButtonState = (inputList, buttonElement) => {
  // если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // console.log("Инпут невалидный");
    buttonElement.disabled = true;
    buttonElement.classList.add(configValid.formSubmitInactive);
  } else {
    // console.log("Инпут валидный");
    buttonElement.disabled = false;
    buttonElement.classList.remove(configValid.formSubmitInactive);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // console.log(errorElement)
  inputElement.classList.add(configValid.formInputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValid.formInputErrorActive);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configValid.formInputTypeError);
  errorElement.classList.remove(configValid.formInputErrorActive);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    // console.log("Поле не валидно")
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // console.log("Валидное поле")
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement, params) => {
  // находим все поля внутри формы
  const inputList = Array.from(
    formElement.querySelectorAll(params.inputSelector)
  );
  // массив из полей ввода
  // console.log(inputList)

  const buttonElement = formElement.querySelector(params.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      // console.log("нажатие на поле ввода")
      isValid(formElement, inputElement);
      // toggleButtonState(inputList, params);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  // массив форм
  // console.log(formList)
  formList.forEach((formElement) => {
    // console.log(formElement)
    setEventListeners(formElement, params);
  });
};
