function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(1, 9);

function validateLength(value, max) {
  return value.length <= max;
}
validateLength('text', 140);

