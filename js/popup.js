import {onEscKeyDown} from './utils.js';

const body = document.querySelector('body');
const popup = document.querySelector('.big-picture');
const closeButton = popup.querySelector('.big-picture__cancel');
const socialComments = popup.querySelector('.social__comments');
const commentsList = document.createDocumentFragment();

function photoListHandler (pictures, array) {
  pictures.forEach((picture) => {
    picture.addEventListener('click', (evt) => {
      popup.classList.remove('hidden');
      findChosenPhoto(evt, array);
    });
  });
}

function closePopupButton () {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closePopupButton);
}

function renderPopup (photo) {
  document.addEventListener('keydown', (evt) => {
    onEscKeyDown(evt, () => {
      popup.classList.add('hidden');
      body.classList.remove('modal-open');
    });
  });
  closeButton.addEventListener('click', closePopupButton);
  body.classList.add('modal-open');

  popup.querySelector('.big-picture__img img').src = photo.url;
  popup.querySelector('.likes-count').textContent = photo.likes;
  popup.querySelector('.social__caption').textContent = photo.description;
  popup.querySelector('.comments-count').textContent = photo.comments.length;

  renderCommentSection(photo.comments);
}

function renderComment (comment) {
  const commentTemplate = popup.querySelector('.social__comment');
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  commentsList.appendChild(commentElement);
}

function renderCommentsArray(array) {
  array.forEach((element) => renderComment(element));
}

function renderCommentSection(array) {
  const socialCommentCount = popup.querySelector('.social__comment-count');
  const commentsLoader = popup.querySelector('.comments-loader');

  let currentCommentCount = 5;
  if (array.length > currentCommentCount) {
    socialCommentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');

    const currentComments = array.slice(0, currentCommentCount);
    renderCommentsArray(currentComments);

    commentsLoader.addEventListener('click', () => {
      const nextCommentCount = 5 + currentCommentCount;
      const nextComments = array.slice(currentCommentCount, nextCommentCount);
      currentCommentCount = nextCommentCount;
      popup.querySelector('.current-comments-count').textContent = currentCommentCount;
      renderCommentsArray(nextComments);
      socialComments.appendChild(commentsList);

      if (array.length <= currentCommentCount) {
        // socialCommentCount.classList.add('hidden');
        commentsLoader.classList.add('hidden');
      }
    });
  } else {
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    renderCommentsArray(array);
  }

  socialComments.textContent = '';
  socialComments.appendChild(commentsList);
}

function findChosenPhoto (evt, array) {
  const target = evt.target;
  const isTargetCorrect = target.classList.contains('picture__img');

  if (!isTargetCorrect) {
    return false;
  }

  const photoId = target.closest('.picture').id;
  const currentPhoto = array.find((element) => Number(element.id) === Number(photoId));

  renderPopup(currentPhoto);
}

export {photoListHandler};
