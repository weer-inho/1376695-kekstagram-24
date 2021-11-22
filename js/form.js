import {isEscapeKey, onEscKeyDown} from './utils.js';
import {checkLoadForm} from './form-validation.js';

const SCALE_CHANGE_STEP = 25;
const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const body = document.querySelector('body');
const loadForm = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const effectsLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const hashtagInput = imgUploadOverlay.querySelector('.text__hashtags');
const commentInput = imgUploadOverlay.querySelector('.text__description');
const closeButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
const scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');

function escapeFromForm (evt) {
  if (isEscapeKey(evt)) {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    loadForm.value = '';
  }
}

loadForm.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  hashtagInput.value = '';
  commentInput.value = '';
  scaleControlValue.value = '100%';
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.style.transform = 'scale(1)';
  effectsLevel.classList.add('visually-hidden');
  body.classList.add('modal-open');
  checkLoadForm();

  document.addEventListener('keydown', escapeFromForm);
});

hashtagInput.onfocus = function () {
  document.removeEventListener('keydown', escapeFromForm);
};

hashtagInput.onblur = function () {
  document.addEventListener('keydown', escapeFromForm);
};

commentInput.onfocus = function () {
  document.removeEventListener('keydown', escapeFromForm);
};

commentInput.onblur = function () {
  document.addEventListener('keydown', escapeFromForm);
};

closeButton.addEventListener('click', () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  loadForm.value = '';
});

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

function resetForm(){
  imgUploadForm.reset();
}

function showSuccessMessage () {
  const successTemplate = body.querySelector('#success');
  const successElement = successTemplate.content.querySelector('section.success').cloneNode(true);
  body.appendChild(successElement);

  const successButton = successElement.querySelector('.success__button');
  let handleMouse = null;
  let handleEscape = null;
  const closeSuccessMessage = () => {
    body.removeChild(successElement);
    successButton.removeEventListener('click', handleMouse);
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('keydown', handleRemainingSuccessSpace);
    resetForm();
  };

  function handleRemainingSuccessSpace (evt) {
    if (evt.target === successElement) {
      closeSuccessMessage();
    }
  }

  handleMouse = () => {
    closeSuccessMessage();
  };

  handleEscape = (evt) => {
    onEscKeyDown(evt, closeSuccessMessage);
  };

  successButton.addEventListener('click', handleMouse);
  document.addEventListener('keydown', handleEscape);
  document.addEventListener('click', handleRemainingSuccessSpace);
}

function showFailMessage () {
  const failTemplate = body.querySelector('#error');
  const failElement = failTemplate.content.querySelector('section.error').cloneNode(true);
  body.appendChild(failElement);

  const failButton = failElement.querySelector('button');

  let handleMouse = null;
  let handleEscape = null;
  const closeFailMessage = () => {
    body.removeChild(failElement);
    failButton.removeEventListener('click', handleMouse);
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('keydown', handleRemainingFailSpace);
    resetForm();
  };

  function handleRemainingFailSpace (evt) {
    if (evt.target === failElement) {
      closeFailMessage();
    }
  }

  handleMouse = () => {
    closeFailMessage();
  };

  handleEscape = (evt) => {
    onEscKeyDown(evt, closeFailMessage);
  };

  failButton.addEventListener('click', handleMouse);
  document.addEventListener('keydown', handleEscape);
  document.addEventListener('click', handleRemainingFailSpace);
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
      })
      .catch(failFunction);
    imgUploadOverlay.classList.add('hidden');
  });
}

sendData(showSuccessMessage, showFailMessage);

scaleControlSmaller.addEventListener('click', scaleControlSmallerClickHandler);
scaleControlBigger.addEventListener('click', scaleControlBiggerClickHandler);

export {imgUploadOverlay, imgUploadPreview, effectsLevel};
