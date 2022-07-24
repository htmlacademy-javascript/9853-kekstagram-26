import {generatePhotos} from './data.js';

const pictureBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function renderPhotos() {
  const pictures = document.createDocumentFragment();
  const photos = generatePhotos();
  for (let i = 0; i < photos.length; i++) {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photos[i].url;
    picture.querySelector('.picture__likes').textContent = photos[i].likes;
    picture.querySelector('.picture__comments').textContent = photos[i].comments.length;

    pictures.appendChild(picture);
  }

  pictureBlock.appendChild(pictures);
}

export {renderPhotos};

