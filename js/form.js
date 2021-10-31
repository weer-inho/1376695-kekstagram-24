import {isEscapeKey} from './utils.js';

const regExp = new RegExp(/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/);
const loadForm = document.querySelector('#upload-file');
const submitButton = document.querySelector('.img-upload__submit');
const imgUploadForm = document.querySelector('.img-upload__overlay');
const fieldsetLoadForm = document.querySelector('.img-upload__text');
const hashtagInput = document.querySelector('.text__hashtags');
const body = document.querySelector('body');
const closeButton = document.querySelector('.img-upload__cancel');

loadForm.addEventListener('change', () => {
  imgUploadForm.classList.remove('hidden');
  body.classList.add('modal-open');
  checkLoadForm();

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
