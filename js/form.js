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

function closeModalForm (){
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  loadForm.value = '';
  document.removeEventListener('keydown', handleEscapeKeydown);
}

function handleFileUploadChange(){
  imgUploadOverlay.classList.remove('hidden');
  hashtagInput.value = '';
  commentInput.value = '';
  scaleControlValue.value = '100%';
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.style.transform = 'scale(1)';
  effectsLevel.classList.add('visually-hidden');
  body.classList.add('modal-open');
  checkLoadForm();

  document.addEventListener('keydown', handleEscapeKeydown);

}

function handleEscapeKeydown (evt) {
  onEscKeyDown(evt,()=>{
    const element = evt.target;
    if(!element.matches('.text__hashtags') && !element.matches('.text__description')){
      closeModalForm();
    }
  });
}

loadForm.addEventListener('change',handleFileUploadChange);

closeButton.addEventListener('click', () => closeModalForm());

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

  const button = successElement.querySelector('button');
  let handleSuccessButtonClick = null;
  let handleLocalEscapeKeydown = null;
  const closeSuccessMessage = () => {
    body.removeChild(successElement);
    button.removeEventListener('click', handleSuccessButtonClick);
    document.removeEventListener('keydown', handleLocalEscapeKeydown);
    document.removeEventListener('click', handleRemainingSuccessSpace);
    resetForm();
  };

  function handleRemainingSuccessSpace (evt) {
    if (evt.target === successElement) {
      closeSuccessMessage();
    }
  }

  handleSuccessButtonClick = () => {
    closeSuccessMessage();
  };

  handleLocalEscapeKeydown = (evt) => {
    onEscKeyDown(evt, closeSuccessMessage);
  };

  button.addEventListener('click', handleSuccessButtonClick);
  document.addEventListener('keydown', handleLocalEscapeKeydown);
  document.addEventListener('click', handleRemainingSuccessSpace);
}

function showFailMessage () {
  const failTemplate = body.querySelector('#error');
  const failElement = failTemplate.content.querySelector('section.error').cloneNode(true);
  body.appendChild(failElement);

  const failButton = failElement.querySelector('button');

  let handleFailButtonClick = null;
  let handleLocalEscapeKeydown = null;
  const closeFailMessage = () => {
    body.removeChild(failElement);
    failButton.removeEventListener('click', handleFailButtonClick);
    document.removeEventListener('keydown', handleLocalEscapeKeydown);
    document.removeEventListener('keydown', handleRemainingFailSpace);
    resetForm();
  };

  function handleRemainingFailSpace (evt) {
    if (evt.target === failElement) {
      closeFailMessage();
    }
  }

  handleFailButtonClick = () => {
    closeFailMessage();
  };

  handleLocalEscapeKeydown = (evt) => {
    onEscKeyDown(evt, closeFailMessage);
  };

  failButton.addEventListener('click', handleFailButtonClick);
  document.addEventListener('keydown', handleLocalEscapeKeydown);
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
