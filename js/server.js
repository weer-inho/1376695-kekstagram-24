import {renderPhotos} from './render.js';
import {shuffleArray} from './utils.js';

const imgFilterSection = document.querySelector('.img-filters');

function renderServerPhotos() {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      // init(data);
      renderPhotos(data);
      imgFilterSection.classList.remove('img-filters--inactive');
    });
}

function renderRandomServerPhotos() {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      // init(data);
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
      // init(data);
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
