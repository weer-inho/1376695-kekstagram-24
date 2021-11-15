import {isEscapeKey, onEscKeyDown} from './utils.js';

const regExp = new RegExp(/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/);
const SCALE_CHANGE_STEP = 25;
const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const body = document.querySelector('body');
const loadForm = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const submitButton = imgUploadOverlay.querySelector('.img-upload__submit');
const effectsLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const fieldsetLoadForm = imgUploadOverlay.querySelector('.img-upload__text');
const hashtagInput = imgUploadOverlay.querySelector('.text__hashtags');
const closeButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
const scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');

loadForm.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  scaleControlValue.value = '100%';
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.style.transform = 'scale(1)';
  effectsLevel.classList.add('visually-hidden');
  body.classList.add('modal-open');
  checkLoadForm();

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      imgUploadOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
      loadForm.value = '';
    }
  });
});

closeButton.addEventListener('click', () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  loadForm.value = '';
});

function checkLoadForm () {
  fieldsetLoadForm.addEventListener('change', () => {
    if (!regExp.test(hashtagInput.value)) {
      submitButton.setAttribute('disabled', 'disabled');
    } else {
      submitButton.removeAttribute('disabled', 'disabled');
    }
  });
}

function setNewScale (scaleValue) {
  const newScale = scaleValue / SCALE_MAX_VALUE;

  imgUploadPreview.style.transform = `scale(${newScale})`;
}

function getValue () {
  const value = parseInt(scaleControlValue.value.replace('%', ''), 10);
  return value;
}

function decreaseScaleValue (value) {
  const decreasedValue = value - SCALE_CHANGE_STEP;
  return decreasedValue;
}

function increaseScaleValue (value) {
  const increasedValue = value + SCALE_CHANGE_STEP;
  return increasedValue;
}

function scaleControlSmallerClickHandler () {
  const scaleValue = getValue();

  if (scaleValue > SCALE_MIN_VALUE) {
    const newValue = decreaseScaleValue(scaleValue);
    setNewScale(newValue);
    scaleControlValue.value = `${newValue}%`;
  }
}

function scaleControlBiggerClickHandler () {
  const scaleValue = getValue();

  if (scaleValue < SCALE_MAX_VALUE) {
    const newValue = increaseScaleValue(scaleValue);
    setNewScale(newValue);
    scaleControlValue.value = `${newValue}%`;
  }
}

function onSuccess () {
  const successElement = document.createElement('section');
  successElement.classList.add('success');
  successElement.innerHTML = `
      <div class="success__inner">
        <h2 class="success__title">Изображение успешно загружено</h2>
        <button type="button" class="success__button">Круто!</button>
      </div>`;
  body.appendChild(successElement);

  const successButton = successElement.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    body.removeChild(successElement);
  });
  document.addEventListener('keydown', (evt) => {
    onEscKeyDown(evt);
    body.removeChild(successElement);
  });
}

function onFail () {
  const failElement = document.createElement('section');
  failElement.classList.add('error');
  failElement.innerHTML = `
      <div class="error__inner">
        <h2 class="error__title">Ошибка загрузки файла</h2>
        <button type="button" class="error__button">Загрузить другой файл</button>
      </div>`;
  body.appendChild(failElement);

  const failButton = failElement.querySelector('button');
  failButton.addEventListener('click', () => {
    body.removeChild(failElement);
  });
  document.addEventListener('keydown', (evt) => {
    onEscKeyDown(evt);
    body.removeChild(failElement);
  });
}

function sendData(successFunction, failFunction) {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          successFunction();
        } else {
          failFunction();
        }
      });
    imgUploadOverlay.classList.add('hidden');
  });
}

sendData(onSuccess, onFail);

scaleControlSmaller.addEventListener('click', scaleControlSmallerClickHandler);
scaleControlBigger.addEventListener('click', scaleControlBiggerClickHandler);

export {imgUploadOverlay, imgUploadPreview, effectsLevel};
