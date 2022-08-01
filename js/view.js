const SHOWN_COMMENTS_AMOUNT = 5;

const fullScreenPicture = document.querySelector('.big-picture');
const socialComments = fullScreenPicture.querySelector('.social__comments');
const socialCommentCount = fullScreenPicture.querySelector('.social__comment-count');
const uploadComments = fullScreenPicture.querySelector('.social__comments-loader');
const closeButton = fullScreenPicture.querySelector('.big-picture__cancel');

const getCommentsAmount = (value) => {
  socialCommentCount.childNodes[0].textContent = `${value} из `;
};

const hideExtraComments = (comments) => {
  const extraComments = comments.slice(SHOWN_COMMENTS_AMOUNT);
  extraComments.forEach((extraComment) => {
    extraComment.classList.add('hidden');
  });
};

const getMoreComments = (comments) => {
  const commentsAmount = comments.length;

  if(commentsAmount <= SHOWN_COMMENTS_AMOUNT) {
    getCommentsAmount(commentsAmount);
    uploadComments.classList.add('hidden');
    return;
  }

  getCommentsAmount(SHOWN_COMMENTS_AMOUNT);

  let shownCommentsAmount = SHOWN_COMMENTS_AMOUNT;
  return function() {
    const availableAmount = commentsAmount - shownCommentsAmount;
    const newCommentsAmount = shownCommentsAmount + Math.min(SHOWN_COMMENTS_AMOUNT, availableAmount);

    const commentsToShow = comments.slice(shownCommentsAmount, newCommentsAmount);
    commentsToShow.forEach((comment) => {
      comment.classList.remove('hidden');
    });

    if (availableAmount <= SHOWN_COMMENTS_AMOUNT) {
      shownCommentsAmount += availableAmount;
      getCommentsAmount(shownCommentsAmount);
      uploadComments.classList.add('hidden');
      return;
    }

    shownCommentsAmount += SHOWN_COMMENTS_AMOUNT;
    getCommentsAmount(shownCommentsAmount);
  };
};

const showAllComments = (comments) => {
  const fragment = document.createDocumentFragment();
  socialComments.innerHTML = '';
  comments.forEach((item, index) => {
    const commentator = {
      avatar: item.avatar,
      name: item.name,
      message: item.message
    };
    const commentElement = document.createElement('li');
    const imageElement = document.createElement('img');
    const textElement = document.createElement('p');
    commentElement.classList.add('social__comment');
    if (index >=SHOWN_COMMENTS_AMOUNT) {
      commentElement.classList.add('hidden');
    }
    imageElement.classList.add('social__picture');
    imageElement.setAttribute('src', commentator.avatar);
    imageElement.setAttribute('alt', commentator.name);
    textElement.classList.add('social__text');
    textElement.textContent = commentator.message;
    commentElement.append(imageElement);
    commentElement.append(textElement);
    fragment.append(commentElement);
  });
  socialComments.append(fragment);

};

const close = () => {
  fullScreenPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', close);
  window.removeEventListener('keydown', close);
};

const escapeKeydown = (evt) => {
  if(evt.key === 'Escape'){
    close();
  }
};

const view = (post) => {
  fullScreenPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fullScreenPicture.querySelector('.big-picture__img').querySelector('img').src = post.url;
  fullScreenPicture.querySelector('.likes-count').textContent = post.likes;
  fullScreenPicture.querySelector('.comments-count').textContent = post.comments.length;
  fullScreenPicture.querySelector('.social__caption').textContent = post.description;

  if (post.comments.length > SHOWN_COMMENTS_AMOUNT) {
    uploadComments.classList.remove('hidden');
  }

  showAllComments(post.comments);

  const allComments = Array.from(socialComments.querySelectorAll('li'));
  hideExtraComments(allComments);
  uploadComments.onclick = getMoreComments(allComments);

  closeButton.addEventListener('click', close);
  window.addEventListener('keydown', escapeKeydown);
};

export {view};

