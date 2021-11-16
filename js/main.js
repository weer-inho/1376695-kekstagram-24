import {renderServerPhotos,renderRandomServerPhotos, renderMostCommentServerPhotos} from './server.js';
import './popup.js';
import './form.js';
import './scale.js';

const RERENDER_DELAY = 500;
const body = document.querySelector('body');
const filterForm = body.querySelector('.img-filters__form');
const picturesContainer = body.querySelector('.pictures.container');

function deletePhotos () {
  const picturesLinks = picturesContainer.querySelectorAll('a.picture');
  picturesLinks.forEach((picture) => {
    picture.remove();
  });
}

function imgFilterHandler () {
  filterForm.addEventListener('click', _.debounce((evt) => {
    deletePhotos();

    switch (evt.target.id) {
      case 'filter-default':
        renderServerPhotos();
        break;
      case 'filter-random':
        renderRandomServerPhotos();
        break;
      case 'filter-discussed':
        renderMostCommentServerPhotos();
        break;
      default:
    }
  }, RERENDER_DELAY));
}

renderServerPhotos();
imgFilterHandler();
