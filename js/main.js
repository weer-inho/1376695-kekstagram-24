/* global _:readonly */
import {renderServerPhotos,renderRandomServerPhotos, renderMostCommentServerPhotos} from './server.js';
import './popup.js';
import './form.js';
import './scale.js';

const body = document.querySelector('body');
const filterForm = body.querySelector('.img-filters__form');
const picturesContainer = body.querySelector('.pictures.container');

function deletePhotos () {
  const picturesLinks = picturesContainer.querySelectorAll('a.picture');
  picturesLinks.forEach((picture) => {
    picture.remove()
  })
}

function imgFilterHandler () {
  filterForm.addEventListener('click', (evt) => {
    deletePhotos()

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
  })
}

renderServerPhotos();
imgFilterHandler()
