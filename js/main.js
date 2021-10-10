const SIZE = 25;

const DESCRIPTIONS = [
  'Интересная фотография',
  'Нужно рассматривать изображение внимательно',
  'Школьный стадион',
  'Спортивная площадка',
  'Картинная галлерея',
  'Кабинет',
  'Зал музея',
];

const NAMES = [
  'Анна',
  'Алексей',
  'Екатерина',
  'Глеб',
  'Злата',
  'Денис',
  'Мария',
  'Иван',
  'Есения',
  'Платон',
];

const COMMENTS = [
  'Ожидала большего',
  'Смотрю по старой памяти',
  'Хороший состав и действие',
  'Как было до и после',
  'Холодновато',
  'Шикарная новинка',
  'Необычно',
  'Категорически не понравилось',
  'Хорошо',
  'Великолепно',
];

function getRandomNumber(min, max)  {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// const checkStringLength = (string, maxLength) => {
//   return string.length <= maxLength;
// };

function getRandomArrayElement(elements) {
  return elements[_.random(0, elements.length - 1)];
}

// const shuffleArray = (array) => {
//   let j;
//   let temp;
//   for(let i = array.length - 1; i > 0; i--){
//     j = Math.floor(Math.random()*(i + 1));
//     temp = array[j];
//     array[j] = array[i];
//     array[i] = temp;
//   };
//   return array;
// };

function generateComment(firstArgument, ix) {
  return {
    id: ix+1,
    avatar: `img/avatar-${ix}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };
}

function getArrayOfComments (quantity) {
  return Array(quantity).fill(null).map(generateComment);
}

function generatePhoto (firstArgument, ix) {
  return {
    id: ix+1,
    url: `photos/{${ix}}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(15, 200),
    comments: getArrayOfComments(getRandomNumber(1,5)),
  };
}

const getArrayOfPhotos = () => Array(SIZE).fill(null).map(generatePhoto);

getArrayOfPhotos();
