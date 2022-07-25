import {checkStringLength} from './util.js';

const MAX_COMMENT_LENGTH = 140;
const RE_HASHTAG = /(^#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?)((\b\s#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?){1,4})?$/;

const uploadForm = document.querySelector('.img-upload__form');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const uploadFileButton = uploadForm.querySelector('.img-upload__input');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const postHashtag = uploadForm.querySelector('.text__hashtags');
const postDescription = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text-error'
});

const commentError = `Комментарий не должен быть длиннее ${MAX_COMMENT_LENGTH} символов`;
const commentValidator = (value) => checkStringLength(value, MAX_COMMENT_LENGTH);
pristine.addValidator(postDescription, commentValidator, commentError);

const hashtagError = 'Поле имеет неверный формат';
const hashtagValidator = (value) =>  RE_HASHTAG.test(value);
pristine.addValidator(postHashtag, hashtagValidator, hashtagError);

const duplicateHashtagError = 'Хештеги не должны быть одинаковыми';
const duplicateHashtagValidator = (value) => {
  if(!value) {
    return true;
  }
  const hashtags = value.replace(/ +/,' ').trim().toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};
pristine.addValidator(postHashtag, duplicateHashtagValidator, duplicateHashtagError);

uploadForm.addEventListener('submit',(evt) => {
  const valid = pristine.validate();
  if(!valid) {
    evt.preventDefault();
  }
});

const close = () => {
  editForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
};

const escapeKeydown = (evt) => {
  if(evt.key === 'Escape'){
    close();
  }
};

const createPost = () => {
  uploadFileButton.addEventListener('change', () => {
    editForm.classList.remove('hidden');
    document.body.classList.add('modal-open');

    closeFormButton.addEventListener('click', close);
    window.addEventListener('keydown', escapeKeydown);
  });
};

export { createPost };
