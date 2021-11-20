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
    check: (arg) => arg.length === 0,
  },
  {
    customValidity: false,
    check: (arg) => arg,
  },
  {
    customValidity: `Нельзя указать больше ${Hashtag.AMOUNT} хэш-тегов`,
    check: (arg) => arg.length > Hashtag.AMOUNT,
  },
  {
    customValidity: 'Хэштег должен начинаться с символа решетки',
    check: (arg) => arg.some((value) => value[0] !== Hashtag.GRID),
  },
  {
    customValidity: 'Хэштег не может состоять только из одной решётки',
    check: (arg) => arg.some((value) => value.length < Hashtag.MIN_SIZE),
  },
  {
    customValidity: `Максимальная длина одного хэштега ${Hashtag.MAX_SIZE} символов, включая решётку`,
    check: (arg) => arg.some((value) => value.length > Hashtag.MAX_SIZE),
  },
  {
    customValidity: 'Один и тот же хэштег не может быть использован дважды',
    check: (arg) => arg.some((value, index, arr) => arr.indexOf(value) !== index),
  },
];

export {SIZE, NAMES, COMMENTS, DESCRIPTIONS, Hashtag, objectForChecking};
