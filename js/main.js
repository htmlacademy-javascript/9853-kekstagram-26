import {generatePosts} from './data.js';
import {renderPosts, bindPostClickEvent} from './render.js';
import {renderFullScreen} from './renderFullScreen.js';

const posts = generatePosts();
renderPosts(posts);

bindPostClickEvent((postId) => {
  const selectedPost = posts.find((post) => post.id === +postId);
  renderFullScreen(selectedPost);
});
