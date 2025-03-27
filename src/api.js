//функция открытия профиля с использованием данных с сервера
export function openProfileData() {
  return (
    fetch("https://nomoreparties.co/v1/wff-cohort-34/users/me", {
      headers: {
        authorization: "b0b783e3-a04a-4d7a-8e2d-c81e111c59a3",
      },
    })
      .then((res) => {
        return res.json();
      })
      // .then((data) => {
      //   // console.log(data)
      //   // console.log(data.name)
      //   // dataProfile = data
      //   nameInput.textContent = data.name
      //   // console.log(data.about)
      //   jobInput.textContent = data.about
      //   // console.log(data.avatar)
      //   imageProfileFoto.src = data.avatar
      // })
      .catch((err) => {
        console.log("Что-то пошло не так: ", err);
      })
  );
}

//функция открытия карточек с использованием массива с сервера
export function openCard() {
  return (
    fetch("https://nomoreparties.co/v1/wff-cohort-34/cards", {
      headers: {
        authorization: "b0b783e3-a04a-4d7a-8e2d-c81e111c59a3",
      },
    })
      .then((res) => {
        return res.json();
      })
      // .then((data) => {
      //     // console.log(data);

      //     // console.log("Что-то пришло с сервера")
      //     data.forEach(el => {
      //       // console.log(el.name)
      //       // console.log(el.link)
      //       // console.log(el.likes.length)
      //       const cardLike = el.likes.length
      //       // console.log(el.likes)
      //       // console.log(cardLike)
      //       placesList.append(createCard(
      //         el.name,
      //         el.link,
      //         cardLike,
      //         deleteCard,
      //         likeCardButton,
      //         popupOpenImageModal
      //       ))
      //     })
      // })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      })
  );
}

//функция редактирования данных в профиле с отправлением на сервер
export function editProfile(nameNew, descriptionNew) {
  console.log(nameNew);
  console.log(descriptionNew);
  fetch("https://nomoreparties.co/v1/wff-cohort-34/users/me", {
    method: "PATCH",
    headers: {
      authorization: "b0b783e3-a04a-4d7a-8e2d-c81e111c59a3",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameNew,
      about: descriptionNew,
    }),
  }).then((res) => {
    // console.log(res.ok);
    console.log(res.json());
  });
}

//функция отправки карточки на сервер
export function createNewCard(nameNewPlace, linkNewPlace) {
  fetch("https://nomoreparties.co/v1/wff-cohort-34/cards", {
    method: "POST",
    headers: {
      authorization: "b0b783e3-a04a-4d7a-8e2d-c81e111c59a3",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameNewPlace,
      link: linkNewPlace,
    }),
  }).then((res) => {
    // console.log(res.ok);
    console.log(res.json());
    // console.log(result)
  });
  // .catch((err) => {
  //   console.log('Ошибка. Запрос не выполнен: ', err);
  // });
}

//функция удаления моей карточки с сервера
export function deleteMeCard(idMeCard) {
  fetch("https://nomoreparties.co/v1/wff-cohort-34/cards/" + idMeCard, {
    method: "DELETE",
    headers: {
      authorization: "b0b783e3-a04a-4d7a-8e2d-c81e111c59a3",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({
    //   name: nameNewPlace,
    //   link: linkNewPlace
    // })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Сетевой ответ не был успешным");
      }
      console.log("Ресурс успешно удалён");
    })
    .catch((error) => {
      console.error("Возникла проблема с DELETE-запросом:", error.message);
    });
}

//функция отправки лайка на сервер
export function cardLikeAdd(idLikeCard) {
  return (
  fetch("https://nomoreparties.co/v1/wff-cohort-34/cards/likes/" + idLikeCard, {
    method: "PUT",
    headers: {
      authorization: "b0b783e3-a04a-4d7a-8e2d-c81e111c59a3",
      "Content-Type": "application/json",
    },
  })
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error("Сетевой ответ не был успешным");
    //   }
    //   console.log("Лайк поставлен");
    //   return response.json();
    // })
    // .then((data) => {
    //   console.log(data.likes.length);
    // })
    // .catch((error) => {
    //   console.error("Возникла проблема с PUT-запросом:", error.message);
    // });
  )
}

//функция снятия лайка с сервера
export function cardLikeRemove(idLikeCard) {
  return (
    fetch("https://nomoreparties.co/v1/wff-cohort-34/cards/likes/" + idLikeCard, {
      method: "DELETE",
      headers: {
        authorization: "b0b783e3-a04a-4d7a-8e2d-c81e111c59a3",
        "Content-Type": "application/json",
      },
    })
      // .then((response) => {
      //   if (!response.ok) {
      //     throw new Error("Сетевой ответ не был успешным");
      //   }
      //   console.log("Лайк поставлен");
      //   return response.json();
      // })
      // .then((data) => {
      //   console.log(data.likes.length);
      // })
      // .catch((error) => {
      //   console.error("Возникла проблема с PUT-запросом:", error.message);
      // });
    )
}