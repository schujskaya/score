/* main-slider for index.html START */

let slideIndex = 1;
showSlides(slideIndex);

function nextSlide() {
  showSlides(slideIndex += 1);
  makeTimer();
}

function previousSlide() {
  showSlides(slideIndex -= 1);
  makeTimer();
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  makeTimer();
}

function showSlides(n) {
  let slides = document.querySelectorAll(".main-slider__item");

  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }

  for (let slide of slides) {
    slide.style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

let timer = 0;
makeTimer();

function makeTimer() {
  clearInterval(timer);
  timer = setInterval(function () {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
}

/* main-slider for index.html END */

/* subscribeForm START */

let formSend = document.querySelectorAll('.send');
for (let elem of formSend) {
  elem.addEventListener('click', sendMail);
}

document.oninput = function (event) {
  let inputsValid = [];
  let formEvent = event.target.closest('form');
  let sendEvent = formEvent.querySelector('.send');
  let formInput = formEvent.querySelectorAll('input');
  for (let elem of formInput) {
    if (elem.type == "email") {
      SendToggle(validateEmail, inputsValid, sendEvent, formEvent);
    }
    if (elem.type == "agree") {
      SendToggle(validateAgree, inputsValid, sendEvent, formEvent);
    }
  }
}

function SendToggle(functionName, inputsValid, sendEvent, formEvent) {
  if (functionName(formEvent) == false) {
    inputsValid.push(false);
  }
  if (inputsValid.every(function (x) { return x == true; })) {
    buttonActive(sendEvent);
  } else {
    buttonDisabled(sendEvent);
  }
}

let inputEmail = document.querySelectorAll('.email');
for (let elem of inputEmail) {
  elem.onblur = function () {
    formName = elem.closest('form');
    if (!validateEmail(formName)) {
      succesDisplay(formName, 'Error e-mail');
    }
  }
}

function validateEmail(e) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let emailValue = e.querySelector('.email');
  return reg.test(emailValue.value);
}

function validateAgree(e) {
  let agreeValue = e.querySelector('.agree');
  return agree.checked;
}

function buttonDisabled(e) {
  e.setAttribute('disabled', 'disabled');
  e.style.opacity = '';
}

function buttonActive(e) {
  e.removeAttribute('disabled');
  e.style.opacity = '1';
}

function succesDisplay(e, a) {
  let formSucces = e.querySelector('.subscribe-form__succes');
  formSucces.innerHTML = a;
  setTimeout(function () {
    formSucces.innerHTML = '';
  }, 5000);
}

function sendMail(e) {
  e.preventDefault();
  let buttonName = e.currentTarget;
  let formName = buttonName.closest('form');
  let data = new FormData();
  switch (formName.id) {
    case 'subscribeForm':
      if (women.checked) {
        data.append('women', women.value);
      }
      if (men.checked) {
        data.append('men', men.value);
      }
      if (girls.checked) {
        data.append('girls', girls.value);
      }
      if (boys.checked) {
        data.append('boys', boys.value);
      }
      if (userEmail.value.length > 0) {
        data.append('user_email', userEmail.value);
      }
      if (agree.checked) {
        data.append('agree', agree.value);
      }

    case 'subscribeFormGrid':
      if (userEmailGrid.value.length > 0) {
        data.append('user_email_grid', userEmailGrid.value);
      }
  }

  fetch('mail.php',
    {
      method: "POST",
      body: data
    })
    .then(response => {
      if (response.status !== 200) {
        return Promise.reject();
      }
      return response.json();
    })
    .then(function (data) {
      console.log(JSON.stringify(data));
    })
    .catch(() => console.log('Error'));
  formName.reset();
  buttonDisabled(buttonName);
  succesDisplay(formName, "Form sent successfully!");
}

/* subscribeForm END */

document.addEventListener('click', function (event) {
  let id = event.target.dataset.toggleId;
  if (!id) return;
  event.target.classList.toggle("hidden");

  let elem = document.getElementById(id);
  elem.hidden = !elem.hidden;
});