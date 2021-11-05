import {imgUploadForm, imgUploadPreview, effectsLevel} from './form.js';

const sliderElement = imgUploadForm.querySelector('.effect-level__slider');
const effectsList = imgUploadForm.querySelector('.effects__list');


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (...rest) => {
  switch (imgUploadPreview.classList[0]) {
    case 'effects__preview--chrome':
      imgUploadPreview.style.filter = `grayscale(${rest[0]})`;
      break;
    case 'effects__preview--sepia':
      imgUploadPreview.style.filter = `sepia(${rest[0]}%)`;
      break;
    case 'effects__preview--marvin':
      imgUploadPreview.style.filter = `invert(${rest[0]}%)`;
      break;
    case 'effects__preview--phobos':
      imgUploadPreview.style.filter = `blur(${rest[0]}px)`;
      break;
    case 'effects__preview--heat':
      imgUploadPreview.style.filter = `brightness(${rest[0]})`;
      break;
    default:
  }
});

function updateSlider (min, max, step, start) {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
    connect: 'lower',
  });
}

effectsList.addEventListener('click', (evt) => {
  const chosenFilter = evt.target.value;

  switch (chosenFilter) {
    case 'none':
      imgUploadPreview.classList = '';
      imgUploadPreview.style.filter = 'none';
      effectsLevel.classList.add('visually-hidden');
      break;
    case 'chrome':
      updateSlider(0, 1, 0.1, 1);
      imgUploadPreview.classList = '';
      imgUploadPreview.classList.add('effects__preview--chrome');
      imgUploadPreview.style.filter = 'grayscale(1)';
      effectsLevel.classList.remove('visually-hidden');
      break;
    case 'sepia':
      updateSlider(0, 100, 1, 100);
      imgUploadPreview.classList = '';
      imgUploadPreview.classList.add('effects__preview--sepia');
      imgUploadPreview.style.filter = 'sepia(100%)';
      effectsLevel.classList.remove('visually-hidden');
      break;
    case 'marvin':
      updateSlider(0, 100, 1, 100);
      imgUploadPreview.classList = '';
      imgUploadPreview.classList.add('effects__preview--marvin');
      imgUploadPreview.style.filter = 'invert(100%)';
      effectsLevel.classList.remove('visually-hidden');
      break;
    case 'phobos':
      updateSlider(0, 3, 0.1, 3);
      imgUploadPreview.classList = '';
      imgUploadPreview.classList.add('effects__preview--phobos');
      imgUploadPreview.style.filter = 'blur(3px)';
      effectsLevel.classList.remove('visually-hidden');
      break;
    case 'heat':
      updateSlider(0, 3, 0.1, 3);
      imgUploadPreview.classList = '';
      imgUploadPreview.classList.add('effects__preview--heat');
      imgUploadPreview.style.filter = 'brightness(3)';
      effectsLevel.classList.remove('visually-hidden');
      break;
    default:
  }
});
