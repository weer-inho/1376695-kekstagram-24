import {objectForChecking} from './data.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const getArrayWithoutVoids = (array) =>
  array.reduce((accumulator, value) => value === '' ? accumulator : [...accumulator, value], []);

const checkForAnError = (testedHashtag) => objectForChecking.find(({checkValue}) => checkValue(testedHashtag));

function getHashTagsArray (inputValue)  {
  const arrayOfHashtags = inputValue.split(' ').map(((value) => value.toLowerCase()));
  return getArrayWithoutVoids(arrayOfHashtags);
}

function checkHashTags (hashtagsToCheck)  {
  const hashTags = getHashTagsArray(hashtagsToCheck);
  const {customValidity} = checkForAnError(hashTags);
  if (customValidity) {
    hashTagInput.setCustomValidity(customValidity);
  } else {
    hashTagInput.setCustomValidity('');
  }
}

function deleteValidityMessages  (input) {
  input.addEventListener('input', () => {
    input.setCustomValidity('');
  });
}

export function checkLoadForm () {
  deleteValidityMessages(hashTagInput);

  submitButton.addEventListener('click', () => {
    checkHashTags(hashTagInput.value);
  });

  uploadForm.addEventListener('invalid', (evt) => {
    evt.target.style.border = '3px solid red';
  }, true);

  uploadForm.addEventListener('input', (evt) => {
    evt.target.style.border = '';
  });
}
