import {getRandomPositiveInteger,checkStringLength} from './util.js';

const names = ['Александр', 'Максим', 'Михаил', 'Марк', 'Иван', 'Артем', 'Лев', 'Дмитрий', 'Матвей', 'Даниил', 'София', 'Анна', 'Мария', 'Алиса', 'Ева', 'Виктория', 'Полина', 'Варвара', 'Александра', 'Анастасия'];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


function generatePosts() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    const photo = {
      id: i,
      url: `photos/${  i  }.jpg`,
      description: 'Generated Photo',
      likes: getRandomPositiveInteger(15, 200),
      comments: generateComments()
    };

    photos.push(photo);
  }
  return photos;
}


function generateComments()
{
  const comments = [];

  for (let i = 0; i <= getRandomPositiveInteger(0,10); i++) {

    let id = 0;
    let isIdExists = false;

    do {
      id = getRandomPositiveInteger(1,1000);
      for (let j = 0; j < comments.length; j++) {
        isIdExists = comments[j].id === id;
      }

    } while (isIdExists);

    const message = messages[getRandomPositiveInteger(0,5)];

    const comment = {
      id: id,
      avatar: `img/avatar-${  [getRandomPositiveInteger(1,6)]  }.svg`,
      message: checkStringLength (message, 1000) ? message  : '',
      name:  names[getRandomPositiveInteger(0, 10)]
    };

    comments.push(comment);
  }

  return comments;
}

export {generatePosts};
