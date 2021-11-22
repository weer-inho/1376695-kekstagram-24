import {onEscKeyDown} from './utils.js';
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

function cloneMessage(name){
  return document.querySelector(name).content.firstElementChild.cloneNode(true);
}

function manageMessage(cloned){
  closeModalForm();
  body.appendChild(cloned);

  function closeMessage () {
    body.removeChild(cloned);
    document.removeEventListener('keydown', handleLocalEscapeKeydown);
    document.removeEventListener('click', handleAnyMouseClick);
    resetForm();
  }

  function handleAnyMouseClick () {
    closeMessage();
  }

  function handleLocalEscapeKeydown (evt) {
    onEscKeyDown(evt, closeMessage);
  }

  document.addEventListener('keydown', handleLocalEscapeKeydown);
  document.addEventListener('click', handleAnyMouseClick);
}

function showSuccessMessage () {
  manageMessage(cloneMessage('#success'));
}

function showFailMessage () {
  manageMessage(cloneMessage('#error'));
}

function handleFormSubmit (evt){
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
      if (!response.ok) {
        throw new Error();
      }
      showSuccessMessage();
    })
    .catch(showFailMessage);
}

imgUploadForm.addEventListener('submit', handleFormSubmit);
scaleControlSmaller.addEventListener('click', scaleControlSmallerClickHandler);
scaleControlBigger.addEventListener('click', scaleControlBiggerClickHandler);
loadForm.addEventListener('change',handleFileUploadChange);
closeButton.addEventListener('click', () => closeModalForm());

export {imgUploadOverlay, imgUploadPreview, effectsLevel};
