(()=>{"use strict";var e="https://nomoreparties.co/v1/wff-cohort-34/",t="b0b783e3-a04a-4d7a-8e2d-c81e111c59a3";function n(e){return console.log(e.ok),e.json()}function o(){return fetch(e+"users/me",{headers:{authorization:"b0b783e3-a04a-4d7a-8e2d-c81e111c59a3"}}).then((function(e){return n(e)}))}function r(){return fetch(e+"cards",{headers:{authorization:t}}).then((function(e){return n(e)}))}function c(o){return fetch(e+"cards/likes/"+o,{method:"PUT",headers:{authorization:t,"Content-Type":"application/json"}}).then((function(e){return n(e)}))}var i=document.querySelector("#card-template").content;function a(o,r,a,u,l,s,d,p,f){var _=i.querySelector(".card").cloneNode(!0),m=_.querySelector(".card__delete-button"),v=_.querySelector(".card__like-button"),y=_.querySelector(".card__image");return _.querySelector(".card__image").src=r,_.querySelector(".card__image").alt=o,_.querySelector(".card__title").textContent=o,d!==s&&(m.style.display="none"),function(e,t,n){e.forEach((function(e){e.name===n&&t.classList.add("card__like-button_is-active")}))}(f,v,s),_.querySelector(".likes__counter").textContent=a,m.addEventListener("click",u),m.addEventListener("click",(function(){return(o=p,fetch(e+"cards/"+o,{method:"DELETE",headers:{authorization:t,"Content-Type":"application/json"}}).then((function(e){return n(e)}))).then(console.log("Успешно удалено")).catch((function(e){console.log("Возникла проблема с DELETE-запросом:",e.message)}));var o})),v.addEventListener("click",(function(o){var r;v.classList.contains("card__like-button_is-active")?(console.log("Лайк присутствует"),(r=p,fetch(e+"cards/likes/"+r,{method:"DELETE",headers:{authorization:t,"Content-Type":"application/json"}}).then((function(e){return n(e)}))).then((function(e){console.log("Снимаю лайк"),_.querySelector(".likes__counter").textContent=e.likes.length,o.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log("Возникла проблема с DELETE-запросом:",e.message)}))):(console.log("Лайк отсутствует"),c(p).then((function(e){console.log("Ставлю лайк"),_.querySelector(".likes__counter").textContent=e.likes.length,o.target.classList.toggle("card__like-button_is-active"),v.removeEventListener("click",c)})).catch((function(e){console.log("Возникла проблема с PUT-запросом:",e.message)})))})),y.addEventListener("click",(function(){return l(r,o)})),_}function u(e){e.target.closest(".places__item").remove()}function l(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",d),document.addEventListener("click",p)}function s(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d),document.removeEventListener("click",p)}function d(e){"Escape"===e.key&&s(document.querySelector(".popup_is-opened"))}function p(e){var t=e.target;!0===t.classList.contains("popup")&&s(t)}var f="form__submit_inactive",_="form__input_type_error",m="form__input-error_active",v=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(f)):(t.disabled=!0,t.classList.add(f))},y=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(_),n.classList.remove(m),n.textContent=""};function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var S=document.querySelector(".places__list"),g=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_image"),E=document.querySelectorAll(".popup"),k=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),C=document.querySelector(".profile__image"),T={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},x="",A="",j=[],w="";function z(e,t){l(b),b.querySelector("img").src=e,b.querySelector(".popup__caption").textContent=t,b.querySelector("img").alt=t}Promise.all([o,r]).then((function(e){var t,n,c=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,i,a=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(a.push(o.value),a.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw r}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}());c[0],c[1],o().then((function(e){k.textContent=e.name,L.textContent=e.about,C.src=e.avatar,x=e.name})).catch((function(e){console.log("Что-то пошло не так: ",e)})),r().then((function(e){e.forEach((function(e){var t=e.likes.length;A=e.owner.name,j=e.likes,w=e._id,S.append(a(e.name,e.link,t,u,z,x,A,w,j))}))})).catch((function(e){console.log("Ошибка. Запрос не выполнен: ",e)}))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){return l(q)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){return l(g)}));for(var O=function(e){E[e].querySelector(".popup__close").addEventListener("click",(function(){return s(E[e])}))},P=0;P<E.length;P++)O(P);var D=q.querySelector(".popup__form"),B=document.querySelector(".popup_type_new-avatar");C.addEventListener("click",(function(){return l(B)}));var M=B.querySelector(".popup__form");B.querySelector(".popup__button").addEventListener("click",(function(){return(o=M.link.value,fetch(e+"users/me/avatar",{method:"PATCH",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({avatar:o})}).then((function(e){return n(e)}))).then((function(e){C.src=e.avatar})).catch((function(e){console.log("Возникла проблема с PATCH-запросом:",e.message)}));var o})),D.name.value=k.textContent,D.description.value=L.textContent,D.addEventListener("submit",(function(o){var r,c;o.preventDefault(),k.textContent=D.name.value,L.textContent=D.description.value,(r=D.name.value,c=D.description.value,fetch(e+"users/me",{method:"PATCH",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({name:r,about:c})}).then((function(e){return n(e)}))).catch((function(e){console.log("Ошибка. Запрос не выполнен: ",e)})),s(q)})),q.querySelector(".popup__close").addEventListener("click",(function(){""===D.name.value&&(D.name.value=k.textContent),""===D.description.value&&(D.description.value=L.textContent)}));var N=g.querySelector(".popup__form");N.addEventListener("submit",(function(o){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(t){y(e,t)})),v(n,o)}(N,T),o.preventDefault();var r,c,i=N.querySelector(".popup__input_type_card-name"),l=N.querySelector(".popup__input_type_url"),d=N.querySelector(".likes__counter");S.prepend(a(i.value,l.value,d,u,z,x,A,w,j)),(r=i.value,c=l.value,fetch(e+"cards",{method:"POST",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({name:r,link:c})}).then((function(e){return n(e)}))).catch((function(e){console.log("Ошибка. Запрос не выполнен: ",e)})),s(g),i.value="",l.value=""})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);v(n,o),n.forEach((function(t){t.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?y(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(_),o.textContent=n,o.classList.add(m)}(e,t,t.validationMessage)})(e,t),v(n,o)}))}))}(t,e)}))}(T)})();