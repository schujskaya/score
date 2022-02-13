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

subscribeSend.addEventListener('click', sendMail);
subscribeSendGrid.addEventListener('click', sendMail);

let formRequired = subscribeForm.querySelectorAll('.required')
for (let elem of formRequired) {
  elem.addEventListener('input', valid_form__required)
}

function subscribeSendDisabled() {
  subscribeSend.setAttribute('disabled', 'disabled')
  subscribeSend.style.opacity = ''
}

function subscribeSendActive() {
  subscribeSend.removeAttribute('disabled')
  subscribeSend.style.opacity = '1'
}

function succesDisplay() {
  let formSucces = document.querySelector('.subscribe-form__succes');
  formSucces.style.display = 'block';
  setTimeout(function () {
    formSucces.style.display = 'none';
  }, 5000);
}

function valid_form__required(e) {
  let error = []
  for (let elem of formRequired) {
    if (elem.value.trim().length < 1) {
      error.push(elem.id)
    }
  }

  if (error.length == 0 && agree.checked) {
    subscribeSendActive()
  } else if (error.length > 0) {
    subscribeSendDisabled();
  }
}

function sendData() {
  let data = new FormData();

  if (women.checked) {
    data.append('group', women.value);
  }
  if (men.checked) {
    data.append('group', girls.value);
  }
  if (girls.checked) {
    data.append('group', girls.value);
  }
  if (boys.checked) {
    data.append('group', boys.value);
  }
  if (userEmail.value.length > 0) {
    data.append('user_email', userEmail.value);
  }
  if (userEmail2.value.length > 0) {
    data.append('user_email', userEmail2.value);
  }
  if (agree.checked) {
    data.append('agree', agree.value);
  }

  return data;
  delete data;
}

function sendMail(e) {

  e.preventDefault();
  data = sendData();

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
  subscribeForm.reset();
  subscribeSendDisabled();
  succesDisplay();
}

/* subscribeForm END */