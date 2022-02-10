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
  let slides = document.getElementsByClassName("main-slider__item");

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

/* subscribe_form START */

window.addEventListener('load', () => {

  let subscribe__button = document.getElementById('subscribe-send');
  if (subscribe__button) {
    subscribe__button.addEventListener('click', send_mail);
  }

  let form__required = document.querySelectorAll('#subscribe_form .required')
  for (let i = 0; i < form__required.length; i++) {
    form__required[i].addEventListener('input', valid_form__required)
  }

  function valid_form__required(e) {
    let error = []
    let inp = document.querySelectorAll('#subscribe_form .required')      
    for (let i = 0; i < inp.length; i++) {
      if (inp[i].value.trim().length < 1) {
        error.push(inp[i].id)
      }
    }

    if (error.length == 0 && document.getElementById('agree').checked) {
      subscribe__button.removeAttribute('disabled')
      subscribe__button.style.opacity = '1'
    } else if (error.length > 0) {
      subscribe__button.setAttribute('disabled', 'disabled')
      subscribe__button.style.opacity = ''
    }
  }

  function send_mail(e) {
    e.preventDefault();

    let women = "";
    if (document.getElementById('women').checked) {
      women = document.getElementById('women').value;
    }
    let men = "";
    if (document.getElementById('men').checked) {
      men = document.getElementById('men').value;
    }
    let girls = "";
    if (document.getElementById('girls').checked) {
      girls = document.getElementById('girls').value;
    }
    let boys = "";
    if (document.getElementById('boys').checked) {
      boys = document.getElementById('boys').value;
    }
    let user_email = document.getElementById('user_email').value;
    let agree = document.getElementById('agree').value;
    document.getElementById('subscribe_form').reset();
    subscribe__button.setAttribute('disabled', 'disabled')
    subscribe__button.style.opacity = ''
    document.querySelector('.subscribe-form__succes').style.display = 'block';
    setTimeout(function () {
      document.querySelector('.subscribe-form__succes').style.display = 'none';
    }, 5000);

    let data = new FormData();
    data.append('women', women);
    data.append('men', men);
    data.append('girls', girls);
    data.append('boys', boys);
    data.append('user_email', user_email);
    data.append('agree', agree);

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
  }

})

/* subscribe_form END */