(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,r,o,c){var u=e.querySelector(".card").cloneNode(!0),p=u.querySelector(".card__delete-button"),a=u.querySelector(".card__like-button"),d=u.querySelector(".card__image");return u.querySelector(".card__image").src=n,u.querySelector(".card__image").alt=t,u.querySelector(".card__title").textContent=t,p.addEventListener("click",r),a.addEventListener("click",o),d.addEventListener("click",(function(){return c(n,t)})),u}function n(e){e.target.closest(".places__item").remove()}function r(e){e.target.classList.add("card__like-button_is-active")}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u),document.addEventListener("click",p)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u),document.removeEventListener("click",p)}function u(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function p(e){var t=e.target;!0===t.classList.contains("popup")&&c(t)}var a=document.querySelector(".places__list"),d=document.querySelector(".popup_type_new-card"),i=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_image"),s=document.querySelectorAll(".popup");function _(e,t){o(l),l.querySelector("img").src=e,l.querySelector(".popup__caption").textContent=t,l.querySelector("img").alt=t}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var o=e.name,c=e.link;a.append(t(o,c,n,r,_))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){return o(i)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){return o(d)}));for(var m=function(e){s[e].querySelector(".popup__close").addEventListener("click",(function(){return c(s[e])}))},v=0;v<s.length;v++)m(v);var y=i.querySelector(".popup__form"),f=document.querySelector(".profile__title"),k=document.querySelector(".profile__description");y.name.value=f.textContent,y.description.value=k.textContent,y.addEventListener("submit",(function(e){e.preventDefault(),f.textContent=y.name.value,k.textContent=y.description.value,c(i)})),i.querySelector(".popup__close").addEventListener("click",(function(){""===y.name.value&&(y.name.value=f.textContent),""===y.description.value&&(y.description.value=k.textContent)}));var q=d.querySelector(".popup__form");q.addEventListener("submit",(function(e){e.preventDefault();var o=q.querySelector(".popup__input_type_card-name"),u=q.querySelector(".popup__input_type_url");a.prepend(t(o.value,u.value,n,r,_)),c(d),o.value="",u.value=""}))})();