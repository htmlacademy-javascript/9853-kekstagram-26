import {renderPosts, bindPostClickEvent} from './render.js';
import {renderFullScreen} from './renderFullScreen.js';
import {createPost} from './createPost.js';
import {getData} from './api.js';

getData((posts) => {
  renderPosts(posts);
  bindPostClickEvent((postId) => {
    const selectedPost = posts.find((post) => post.id === +postId);
    renderFullScreen(selectedPost);
  });
});

createPost();
