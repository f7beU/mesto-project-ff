// включение валидации вызовом enableValidation
// все настройки передаются при вызове

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

export const toggleButtonState = (inputList, buttonElement, params) => {
  // если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList, params)) {
    // console.log("Инпут невалидный");
    buttonElement.disabled = true;
    buttonElement.classList.add(params.formSubmitInactive);
  } else {
    // console.log("Инпут валидный");
    buttonElement.disabled = false;
    buttonElement.classList.remove(params.formSubmitInactive);
  }
};

const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // console.log(errorElement)
  inputElement.classList.add(params.formInputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.formInputErrorActive);
};

const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(params.formInputTypeError);
  errorElement.classList.remove(params.formInputErrorActive);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, params) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    // console.log("Поле не валидно")
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      params
    );
  } else {
    // console.log("Валидное поле")
    hideInputError(formElement, inputElement, params);
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

  toggleButtonState(inputList, buttonElement, params);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      // console.log("нажатие на поле ввода")
      isValid(formElement, inputElement, params);
      // toggleButtonState(inputList, params);
      toggleButtonState(inputList, buttonElement, params);
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
