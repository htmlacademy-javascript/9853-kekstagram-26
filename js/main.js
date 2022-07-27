
import {renderPosts} from './render.js';
import {initPostsFilter} from './filter.js';
import {getData} from './api.js';
import './create.js';

getData((posts) => {
  renderPosts(posts);
  initPostsFilter(posts);
});
