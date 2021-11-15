import {renderPhotos} from './render.js';
import {init} from './utils.js';
import './popup.js';
import './form.js';
import './scale.js';

function renderServerPhotos() {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      init(data);
      renderPhotos(data);
    });
}

renderServerPhotos();
