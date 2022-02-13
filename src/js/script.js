/* main-slider for index.html START */

//const { data } = require("autoprefixer");

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

subscribeSend.addEventListener('click', sendMail);
subscribeSendGrid.addEventListener('click', sendMail);

let formInput = subscribeForm.querySelectorAll('input');
for (let elem of formInput) {
  elem.oninput = function () {
    if (validateEmail(subscribeForm) && validateAgree(subscribeForm)) {
      buttonActive(subscribeSend);
    } else {
      buttonDisabled(subscribeSend);
    }
  }
}
let formInputGrid = subscribeFormGrid.querySelectorAll('input');
for (let elem of formInputGrid) {
  elem.oninput = function () {
    if (validateEmail(subscribeFormGrid)) {
      buttonActive(subscribeSendGrid);
    } else {
      buttonDisabled(subscribeSendGrid);
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

function succesDisplay(e) {
  let formSucces = e.querySelector('.subscribe-form__succes');
  formSucces.style.display = 'block';
  setTimeout(function () {
    formSucces.style.display = 'none';
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
  succesDisplay(formName);
}

/* subscribeForm END */