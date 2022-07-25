const pictureBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPosts = (posts) => {
  const pictures = document.createDocumentFragment();

  posts.forEach((post) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = post.url;
    picture.querySelector('.picture__likes').textContent = post.likes;
    picture.querySelector('.picture__comments').textContent = post.comments.length;

    picture.dataset.postId = post.id;
    pictures.appendChild(picture);
  });

  pictureBlock.appendChild(pictures);
};

const bindPostClickEvent = (callback) => {
  pictureBlock.addEventListener('click', (e) => {
    const picture = e.target.closest('.picture');
    if (picture) {
      callback(picture.dataset.postId);
    }
  });
};

export {renderPosts, bindPostClickEvent};
