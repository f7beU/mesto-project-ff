// включение валидации вызовом enableValidation
// все настройки передаются при вызове

export const clearValidation = (formElement, params) => {
  const inputList = Array.from(
    formElement.querySelectorAll(params.inputSelector)
  );
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, params);
    // console.log(inputElement)
  });
  toggleButtonState(inputList, buttonElement, params);
  //до этого работает
  // const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  // errorElement.textContent = ""
};

const hasInvalidInput = (inputList) => {
  // console.log(inputList)
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

export const toggleButtonState = (inputList, buttonElement) => {
  // console.log(inputList)
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // console.log("Инпут невалидный");
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add("form__submit_inactive");
  } else {
    // console.log("Инпут валидный");
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove("form__submit_inactive");
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  // console.log(errorElement)
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  // console.log(errorMessage)
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости

const isValid = (formElement, inputElement) => {
  // console.log(inputElement.validity.patternMismatch)
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
    // HTML мы писали в kebab-case, это не опечатка)
    // console.log(inputElement.dataset.errorMessage);
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  // console.log(inputElement)
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    // console.log("Поле не валидно")
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    // console.log("Валидное поле")
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement, params) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(params.inputSelector)
  );
  // console.log(inputList)// массив из полей ввода

  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  // console.log(buttonElement)

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    // console.log(inputElement)
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент

      // console.log("нажатие на поле ввода")
      isValid(formElement, inputElement);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = (params) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  // console.log(formList)// массив форм
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    // console.log(formElement)
    setEventListeners(formElement, params);
  });
};
