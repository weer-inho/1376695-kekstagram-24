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

const Hashtag = {
  GRID: '#',
  MIN_SIZE: 2,
  MAX_SIZE: 20,
  AMOUNT: 5,
};

const objectForChecking = [
  {
    customValidity: false,
    checkValue: (testedHashtag) => testedHashtag.length === 0,
  },
  {
    customValidity: `Нельзя указать больше ${Hashtag.AMOUNT} хэш-тегов`,
    checkValue: (testedHashtag) => testedHashtag.length > Hashtag.AMOUNT,
  },
  {
    customValidity: 'Хештег должен начинаться с символа #',
    checkValue: (testedHashtag) => testedHashtag.some((value) => value[0] !== Hashtag.GRID),
  },
  {
    customValidity: 'Хештег не может состоять только из одной решётки',
    checkValue: (testedHashtag) => testedHashtag.some((value) => value.length < Hashtag.MIN_SIZE),
  },
  {
    customValidity: `Максимальная длина одного хештега ${Hashtag.MAX_SIZE} символов, включая решётку`,
    checkValue: (testedHashtag) => testedHashtag.some((value) => value.length > Hashtag.MAX_SIZE),
  },
  {
    customValidity: 'Один и тот же хештег не может быть использован дважды',
    checkValue: (testedHashtag) => testedHashtag.some((value, index, arr) => arr.indexOf(value) !== index),
  },
  {
    customValidity: false,
    checkValue: (testedHashtag) => testedHashtag,
  },
];

export {SIZE, NAMES, COMMENTS, DESCRIPTIONS, Hashtag, objectForChecking};
