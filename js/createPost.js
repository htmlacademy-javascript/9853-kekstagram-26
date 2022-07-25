import {checkStringLength} from './util.js';

let currentEffect;

const MAX_COMMENT_LENGTH = 140;
const RE_HASHTAG = /(^#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?)((\b\s#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?){1,4})?$/;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const FILTER_TYPE = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const FILTER_CSS_VALUE = {
  [FILTER_TYPE.CHROME]: 'grayscale',
  [FILTER_TYPE.SEPIA]: 'sepia',
  [FILTER_TYPE.MARVIN]: 'invert',
  [FILTER_TYPE.PHOBOS]: 'blur',
  [FILTER_TYPE.HEAT]: 'brightness',
};

const uploadForm = document.querySelector('.img-upload__form');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const uploadFileButton = uploadForm.querySelector('.img-upload__input');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const postHashtag = uploadForm.querySelector('.text__hashtags');
const postDescription = uploadForm.querySelector('.text__description');
const uploadScale = uploadForm.querySelector('.img-upload__scale');
const uploadPreview = uploadForm.querySelector('.img-upload__preview').querySelector('img');
const uploadEffectLevel = uploadForm.querySelector('.img-upload__effect-level');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const effectsList = uploadForm.querySelector('.effects__list');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');

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

uploadScale.addEventListener('click',(evt) => {
  const scaleSmaller = evt.target.closest('.scale__control--smaller');
  const scaleBigger = evt.target.closest('.scale__control--bigger');

  let scaleControlValue = +(scaleControl.value).replace('%','');

  if(scaleSmaller && scaleControlValue > MIN_SCALE_VALUE){
    scaleControlValue -= SCALE_STEP;
    uploadPreview.style.transform = `scale(${(scaleControlValue)/100})`;
    scaleControl.value = `${scaleControlValue}%`;
  }

  if(scaleBigger && scaleControlValue < MAX_SCALE_VALUE){
    scaleControlValue += SCALE_STEP;
    uploadPreview.style.transform = `scale(${(scaleControlValue)/100})`;
    scaleControl.value = `${scaleControlValue}%`;
  }
});

const getUpdateSlider = (
  min = 0,
  max  = 1,
  start = 1,
  step = 1 ,
  unit= '') => ({
  range: {
    min: min,
    max: max
  },
  start: start,
  step: step,
  connect: 'lower',
  format: {
    to: (value) =>  {
      if(Number.isInteger(value)) {
        return `${value.toFixed(0)}${unit}`;
      }
    },
    from: (value) => parseFloat(value.replace(unit,'')),
  }
});

const applyEffectToPost = (effectClass, effect) => {
  currentEffect = effect;

  uploadPreview.classList.add(effectClass);
  uploadEffectLevel.classList.remove('hidden');
  uploadPreview.style.filter = `${effect}(${effectLevelValue.value})`;
};

const deleteEffectFromPost = () => {
  uploadPreview.classList.add('effects__preview--none');
  uploadEffectLevel.classList.add('hidden');
  uploadPreview.removeAttribute('style');
};

noUiSlider.create(effectLevelSlider,getUpdateSlider());

effectLevelSlider.noUiSlider.on('update', () => {
  const level = effectLevelSlider.noUiSlider.get();
  uploadPreview.style.filter = `${currentEffect}(${level})`;
});

const applySelectedEffect = (evt) => {
  uploadPreview.classList.value = null;

  switch (evt.target.value) {
    case FILTER_TYPE.NONE:
      deleteEffectFromPost();
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider());
      break;
    case FILTER_TYPE.CHROME:
      applyEffectToPost('effects__preview--chrome',FILTER_CSS_VALUE.chrome);
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider());
      break;
    case FILTER_TYPE.SEPIA:
      applyEffectToPost('effects__preview--sepia',FILTER_CSS_VALUE.sepia);
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider());
      break;
    case FILTER_TYPE.MARVIN:
      applyEffectToPost('effects__preview--marvin',FILTER_CSS_VALUE.marvin);
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(0,100,100,1,'%'));
      break;
    case FILTER_TYPE.PHOBOS:
      applyEffectToPost('effects__preview--phobos',FILTER_CSS_VALUE.phobos);
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(0,3,3,0.1,'px'));
      break;
    case FILTER_TYPE.HEAT:
      applyEffectToPost('effects__preview--heat',FILTER_CSS_VALUE.heat);
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(1,3,3,0.1));
      break;
  }
};

const createPost = () => {
  uploadFileButton.addEventListener('change', () => {
    editForm.classList.remove('hidden');
    document.body.classList.add('modal-open');

    effectsList.addEventListener('change',applySelectedEffect);
    uploadEffectLevel.classList.add('hidden');

    closeFormButton.addEventListener('click', close);
    window.addEventListener('keydown', escapeKeydown);
  });
};

export { createPost };
