import {NAMES, COMMENTS, DESCRIPTIONS, SIZE} from './data.js';

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

let photos = null;

function createArrayOfPhotos() {
  return Array(SIZE).fill(null).map(generatePhoto);
}

function getArrayOfPhotos () {
  if (photos === null) {
    photos = createArrayOfPhotos();
    throw new Error('photos еще не инициализированы');
  }

  return photos;
}

function init(aPhotos) {
  photos = aPhotos;
}

function isEscapeKey (evt) {
  return evt.key === 'Escape';
  // document.removeEventListener('keydown', isEscapeKey);
}

function onEscKeyDown (evt)  {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    document.removeEventListener('keydown', onEscKeyDown);
  }
}

function shuffleArray (array) {
  return array.sort(() => Math.random() - 0.5);
}

export {
  getRandomNumber,
  getRandomArrayElement,
  generateComment,
  getArrayOfComments,
  generatePhoto,
  getArrayOfPhotos,
  isEscapeKey,
  onEscKeyDown,
  shuffleArray,
  init
};
