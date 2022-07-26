const ALERT_SHOW_TIME = 5000;
const KEY_ESC = 'Escape';
const checkEscapeKeydown = (evt) => evt.key === KEY_ESC;
const getDataError = 'Ошибка получения данных';

const showAlert = (message) => {
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alertError');
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);
  setTimeout(() => {
    alertDiv.remove();
  }, ALERT_SHOW_TIME);
};

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((posts) => onSuccess(posts))
    .catch(() => showAlert(getDataError));
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/kekstagram',{method:'POST', body})
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
};


export {getData, sendData};
