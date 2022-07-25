const fullScreenPicture = document.querySelector('.big-picture');
const socialComments = fullScreenPicture.querySelector('.social__comments');
const closeButton = fullScreenPicture.querySelector('.big-picture__cancel');

const close = () => {
  fullScreenPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', close);
  window.removeEventListener('keydown', close);
};

const showComments = (comments) => {
  let allComments = '';
  comments.forEach((comment) => {
    allComments +=
      `<li class="social__comment">
       <img
          class="social__picture"
          src="${comment.avatar}"
          alt="${comment.name}"
          width="35" height="35">
       <p class="social__text">${comment.message}</p>
      </li>`;
  });
  socialComments.innerHTML = allComments;
};

const escapeKeydown = (evt) => {
  if(evt.key === 'Escape'){
    close();
  }
};

const renderFullScreen = (post) => {
  fullScreenPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fullScreenPicture.querySelector('.big-picture__img').querySelector('img').src = post.url;
  fullScreenPicture.querySelector('.likes-count').textContent = post.likes;
  fullScreenPicture.querySelector('.comments-count').textContent = post.comments.length;
  fullScreenPicture.querySelector('.social__caption').textContent = post.description;
  fullScreenPicture.querySelector('.social__comment-count').classList.add('hidden');
  fullScreenPicture.querySelector('.comments-loader').classList.add('hidden');

  showComments(post.comments);

  closeButton.addEventListener('click', close);
  window.addEventListener('keydown', escapeKeydown );
};

export {renderFullScreen};
