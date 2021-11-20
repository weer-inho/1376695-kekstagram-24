import {objectForChecking} from './data.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashTagsInput = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const getArrayWithoutVoids = (array) =>
  array.reduce((acc, value) => value === '' ? acc : [...acc, value], []);

function getArrayOfHashtags (hashtags) {
  const arrayOfHashtags = hashtags.split(' ').map(((value) => value.toLowerCase()));
  return getArrayWithoutVoids(arrayOfHashtags);
}

const getCheckAction = (arg) => objectForChecking.find(({check}) => check(arg));

const updateValidity = (...fields) => {
  fields.forEach((field) => {
    field.addEventListener('input', () => {
      field.setCustomValidity('');
    });
  });
};

function analyzeHashtags (value) {
  const hashTags = getArrayOfHashtags(value);
  const {customValidity} = getCheckAction(hashTags);
  if (customValidity) {
    hashTagsInput.setCustomValidity(customValidity);
  } else {
    hashTagsInput.setCustomValidity('');
  }
}

export function checkLoadForm () {
  updateValidity(hashTagsInput, commentField);

  submitButton.addEventListener('click', () => {
    analyzeHashtags(hashTagsInput.value);
  });

  uploadForm.addEventListener('invalid', (evt) => {
    evt.target.style.border = '2px solid #ff0000';
  }, true);

  uploadForm.addEventListener('input', (evt) => {
    evt.target.style.border = '';
  });
}

