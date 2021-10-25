import {photos} from './render.js';

const popup = document.querySelector('.big-picture');
const closeButton = popup.querySelector('.big-picture__cancel');
const pictures = document.querySelectorAll('a.picture');
const body = document.querySelector('body');

function onEscKeyDown (evt)  {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    popup.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscKeyDown);
  }
}

closeButton.addEventListener('click', () => {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
});

function photoListHandler (evt) {
  const target = evt.target;
  const isTargetCorrect = target.classList.contains('picture__img');

  if (!isTargetCorrect) {
    return false;
  }

  document.addEventListener('keydown', onEscKeyDown);

  body.classList.add('modal-open');

  const photoId = target.closest('.picture').id;

  const bigPicture = popup.querySelector('.big-picture__img img');
  bigPicture.src = photos[photoId-1].url;

  const likesCount = popup.querySelector('.likes-count');
  likesCount.textContent = photos[photoId-1].likes;

  const description = popup.querySelector('.social__caption');
  description.textContent = photos[photoId-1].description;

  const commentsCount = popup.querySelector('.comments-count');
  commentsCount.textContent = photos[photoId-1].comments.length;

  const socialCommentCount = popup.querySelector('.social__comment-count');
  const commentsLoader = popup.querySelector('.comments-loader');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  const commentsList = document.createDocumentFragment();
  const commentTemplate = popup.querySelector('.social__comment');
  photos[photoId-1].comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsList.appendChild(commentElement);
  });

  const socialComments = popup.querySelector('.social__comments');
  socialComments.textContent = '';
  socialComments.appendChild(commentsList);
}

pictures.forEach((picture) => {
  picture.addEventListener('click', (evt) => {
    popup.classList.remove('hidden');
    photoListHandler(evt);
  });
});
