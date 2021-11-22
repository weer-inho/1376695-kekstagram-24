import {renderPhotos} from './render.js';
import {shuffleArray} from './utils.js';

const imgFilterSection = document.querySelector('.img-filters');

function showErrorLoadMessage () {
  const errorLoadMessage = document.querySelector('section.error');
  errorLoadMessage.classList.remove('hidden');
  setTimeout(() => errorLoadMessage.classList.add('hidden'), 5000);
}

function renderServerPhotos() {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      renderPhotos(data);
      imgFilterSection.classList.remove('img-filters--inactive');
    })
    .catch(showErrorLoadMessage);
}

function renderRandomServerPhotos() {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      renderPhotos(
        shuffleArray(data).slice(0,10),
      );
      imgFilterSection.classList.remove('img-filters--inactive');
    });
}

function renderMostCommentServerPhotos() {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      renderPhotos(
        data.sort((a, b) => {
          if (a.comments.length > b.comments.length) {return -1;}
          if (a.comments.length < b.comments.length) {return 1;}
          return 0;
        }),
      );
      imgFilterSection.classList.remove('img-filters--inactive');
    });
}

export {
  renderServerPhotos,
  renderRandomServerPhotos,
  renderMostCommentServerPhotos
};
