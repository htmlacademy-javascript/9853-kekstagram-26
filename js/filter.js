import {debounce, getRandomPositiveInteger} from './util.js';
import {renderPosts} from './render.js';

const RandomPictures = {
  MIN_ID: 0,
  MAX_ID: 24,
  MAX_COUNT: 10
};
const RERENDER_DELAY = 500;

const pictureBlock = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters');
const filtersForm = filters.querySelector('.img-filters__form');
const filterButton = filters.querySelectorAll('.img-filters__button');

const showFilterPosts = () => {
  filters.classList.remove('img-filters--inactive');
  filters.classList.add('img-filters--active');
};

const enableFilterPosts = () => {
  filterButton.forEach((button) => {
    button.disabled = false;
  });
};

const filterPostsDefault = (userPosts) => userPosts;
const filterPostsDiscuss = (userPosts) => userPosts.slice().sort((commentA, commentB) => commentB.comments.length - commentA.comments.length);
const filterPostsRandom = (posts) => posts.slice().sort((item) => item.id -  getRandomPositiveInteger(RandomPictures.MIN_ID, RandomPictures.MAX_ID)).slice(RandomPictures.MIN_ID, RandomPictures.MAX_COUNT);

const changeFilterClassName = (filterName) => {
  document.querySelectorAll('.img-filters__button')
    .forEach((element) => element.classList.remove('img-filters__button--active'));
  document.querySelector(`#${filterName}`).classList.add('img-filters__button--active');
};

const clearOldPosts = () => {
  const posts = pictureBlock.querySelectorAll('.picture');

  posts.forEach((post) => {
    post.remove();
  });
};

const postFilterChange = debounce((evt, userPosts) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const filter = evt.target.id;

  clearOldPosts();

  switch (filter) {
    case 'filter-discussed':
      changeFilterClassName(filter);
      renderPosts(filterPostsDiscuss(userPosts));
      break;
    case 'filter-random':
      changeFilterClassName(filter);
      renderPosts(filterPostsRandom(userPosts));
      break;
    case 'filter-default':
      changeFilterClassName(filter);
      renderPosts(filterPostsDefault(userPosts));
      break;
  }
}, RERENDER_DELAY);

const initPostsFilter = (userPosts) => {
  filtersForm.addEventListener('click', (evt) => postFilterChange(evt, userPosts));
  showFilterPosts();
  enableFilterPosts();
};

export {initPostsFilter};
