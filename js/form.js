import {isEscapeKey} from './utils.js';

const regExp = new RegExp(/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/);
const SCALE_CHANGE_STEP = 25;
const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const body = document.querySelector('body');
const loadForm = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__overlay');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const effectsLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const fieldsetLoadForm = imgUploadForm.querySelector('.img-upload__text');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const closeButton = imgUploadForm.querySelector('.img-upload__cancel');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const scaleFieldset = imgUploadForm.querySelector('.img-upload__scale');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');

loadForm.addEventListener('change', () => {
  imgUploadForm.classList.remove('hidden');
  scaleControlValue.value = '100%';
  effectsLevel.classList.add('visually-hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      imgUploadForm.classList.add('hidden');
      body.classList.remove('modal-open');
      loadForm.value = '';
    }
  });
});

closeButton.addEventListener('click', () => {
  imgUploadForm.classList.add('hidden');
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
  let newScale = scaleValue / SCALE_MAX_VALUE;

  imgUploadPreview.style.transform = 'scale(' + newScale + ')';
};

function getValue () {
  let value = parseInt(scaleControlValue.value.replace('%', ''), 10);
  return value;
};

function decreaseScaleValue (value) {
  let decreasedValue = value - SCALE_CHANGE_STEP;
  return decreasedValue;
};

function increaseScaleValue (value) {
  let increasedValue = value + SCALE_CHANGE_STEP;
  return increasedValue;
};

function scaleControlSmallerClickHandler () {
  let scaleValue = getValue();

  if (scaleValue > SCALE_MIN_VALUE) {
    let newValue = decreaseScaleValue(scaleValue);
    setNewScale(newValue);
    scaleControlValue.value = newValue + '%';
  }
};

function scaleControlBiggerClickHandler () {
  let scaleValue = getValue();

  if (scaleValue < SCALE_MAX_VALUE) {
    let newValue = increaseScaleValue(scaleValue);
    setNewScale(newValue);
    scaleControlValue.value = newValue + '%';
  }
};

scaleControlSmaller.addEventListener('click', scaleControlSmallerClickHandler);
scaleControlBigger.addEventListener('click', scaleControlBiggerClickHandler);

export {imgUploadForm, imgUploadPreview, effectsLevel};
