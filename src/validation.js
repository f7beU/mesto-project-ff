// включение валидации вызовом enableValidation
// все настройки передаются при вызове

export const clearValidation = (formElement, params) => {
  const inputList = Array.from(
    formElement.querySelectorAll(params.inputSelector)
  );
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  inputList.forEach((inputElement) => {
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
    buttonElement.classList.add("form__submit_inactive");
  } else {
    // console.log("Инпут валидный");
    buttonElement.disabled = false;
    buttonElement.classList.remove("form__submit_inactive");
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // console.log(errorElement)
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
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
  // Находим все поля внутри формы
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
