import {renderServerPhotos,renderRandomServerPhotos, renderMostCommentServerPhotos} from './server.js';
import './popup.js';
import './form.js';
import './scale.js';

const RERENDER_DELAY = 500;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const body = document.querySelector('body');
const fileChooser = body.querySelector('.img-upload__input');
const preview = body.querySelector('.img-upload__preview img');
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

function loadPhoto () {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
}

loadPhoto();
renderServerPhotos();
imgFilterHandler();
