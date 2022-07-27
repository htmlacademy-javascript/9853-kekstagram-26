const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

let activeMessage;

const checkEscapeKeydown = (evt) => evt.key === 'Escape';


const showMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.textContent = message;
  div.style.backgroundColor = 'gray';
  div.style.borderRadius = '15px';
  div.style.padding = '10px';
  document.querySelector('.pictures').appendChild(div);
  setTimeout(() => {
    div.remove();
  }, 5000);
};


const closeMessage = () => {
  document.body.removeChild(activeMessage);
  window.removeEventListener('keydown', escapeKeydown, true);
  window.removeEventListener('click', onClickMessageForm);
};

function escapeKeydown(evt) {
  if(checkEscapeKeydown(evt)){
    evt.stopImmediatePropagation();
    closeMessage();
  }
}

function onClickMessageForm (evt) {
  if (evt.target === activeMessage){
    closeMessage();
  }
}


const showSuccessMessage = () => {
  activeMessage = successMessage;
  document.body.appendChild(successMessage);

  successButton.addEventListener('click', closeMessage, { once: true });
  window.addEventListener('keydown', escapeKeydown);
  window.addEventListener('click', onClickMessageForm);
};

const showErrorMessage = () => {
  activeMessage = errorMessage;
  document.body.appendChild(errorMessage);

  errorButton.addEventListener('click', closeMessage, { once:true });
  window.addEventListener('keydown', escapeKeydown);
  window.addEventListener('click', onClickMessageForm);
};


export {showMessage, checkEscapeKeydown, escapeKeydown,  showSuccessMessage,  showErrorMessage };
