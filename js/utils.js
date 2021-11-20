import {NAMES, COMMENTS, DESCRIPTIONS} from './data.js';

function getRandomNumber(min, max)  {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomArrayElement(elements) {
  return elements[_.random(0, elements.length - 1)];
}

function generateComment(firstArgument, ix) {
  return {
    id: ix+1,
    avatar: `img/avatar-${ix+1}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };
}

function getArrayOfComments (quantity) {
  return Array(quantity).fill(null).map(generateComment);
}

function generatePhoto (firstArgument, ix) {
  return {
    id: ix+1,
    url: `photos/${ix+1}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(15, 200),
    comments: getArrayOfComments(getRandomNumber(1,20)),
  };
}

function isEscapeKey (evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

function onEscKeyDown (evt, callback)  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onEscKeyDown);
    callback();
  }
}

function shuffleArray (array) {
  return array.sort(() => Math.random() - 0.5);
}

function checkForDuplicates(array) {
  const valuesSoFar = [];
  for (let i = 0; i < array.length; ++i) {
    const value = array[i];
    if (valuesSoFar.indexOf(value) !== -1) {
      return false;
    }
    valuesSoFar.push(value);
  }
  return true;
}

export {
  getRandomNumber,
  getRandomArrayElement,
  generateComment,
  getArrayOfComments,
  generatePhoto,
  isEscapeKey,
  onEscKeyDown,
  shuffleArray,
  checkForDuplicates
};
