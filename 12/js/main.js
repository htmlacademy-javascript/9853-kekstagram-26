
import {renderPosts} from './render.js';
import {createPost} from './createPost.js';
import {initPostsFilter} from './filter.js';
import {getData} from './api.js';

getData((posts) => {
  renderPosts(posts);
  initPostsFilter(posts);
});

createPost();


