const configApi = {
  addresServer: "https://nomoreparties.co/v1/wff-cohort-34/",
  keyToken: "b0b783e3-a04a-4d7a-8e2d-c81e111c59a3",
};

// функция проверки ответа сервера
function checkServerResponse(res) {
  console.log(res.status);
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.message);
}

// функция получения данных профиля с сервера
export function getProfileData() {
  return fetch(configApi.addresServer + "users/me", {
    headers: {
      authorization: configApi.keyToken,
    },
  }).then((res) => checkServerResponse(res));
}

// функция открытия карточек с использованием массива с сервера
export function openCard() {
  return fetch(configApi.addresServer + "cards", {
    headers: {
      authorization: configApi.keyToken,
    },
  }).then((res) => checkServerResponse(res));
}

// функция редактирования данных в профиле с отправлением на сервер
export function editProfile(nameNew, descriptionNew) {
  // console.log(nameNew);
  // console.log(descriptionNew);
  return fetch(configApi.addresServer + "users/me", {
    method: "PATCH",
    headers: {
      authorization: configApi.keyToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameNew,
      about: descriptionNew,
    }),
  }).then((res) => checkServerResponse(res));
}

// функция отправки карточки на сервер
export function postNewCard(nameNewPlace, linkNewPlace) {
  return fetch(configApi.addresServer + "cards", {
    method: "POST",
    headers: {
      authorization: configApi.keyToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameNewPlace,
      link: linkNewPlace,
    }),
  }).then((res) => checkServerResponse(res));
}

// функция удаления моей карточки с сервера
export function deleteMeCard(idMeCard) {
  return fetch(configApi.addresServer + "cards/" + idMeCard, {
    method: "DELETE",
    headers: {
      authorization: configApi.keyToken,
      "Content-Type": "application/json",
    },
  }).then((res) => checkServerResponse(res));
}

// функция отправки лайка на сервер
export function cardLikeAdd(idLikeCard) {
  return fetch(configApi.addresServer + "cards/likes/" + idLikeCard, {
    method: "PUT",
    headers: {
      authorization: configApi.keyToken,
      "Content-Type": "application/json",
    },
  }).then((res) => checkServerResponse(res));
}

// функция снятия лайка с сервера
export function cardLikeRemove(idLikeCard) {
  return fetch(configApi.addresServer + "cards/likes/" + idLikeCard, {
    method: "DELETE",
    headers: {
      authorization: configApi.keyToken,
      "Content-Type": "application/json",
    },
  }).then((res) => checkServerResponse(res));
}

// функция изменения фото аватара в профиле
export function editProfileFoto(link) {
  // console.log("Сигнал пришёл")
  // console.log(link);
  return fetch(configApi.addresServer + "users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: configApi.keyToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => checkServerResponse(res));
}
