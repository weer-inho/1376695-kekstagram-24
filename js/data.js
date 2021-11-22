const Hashtag = {
  GRID: '#',
  MIN_SIZE: 2,
  MAX_SIZE: 20,
  AMOUNT: 5,
  REGULAR_EXPRESSION: new RegExp(/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/),
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
    checkValue: (testedHashtag) => testedHashtag.some((value, index, hashtags) => hashtags.indexOf(value) !== index),
  },
  {
    customValidity: 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
    checkValue: (testedHashtag) => testedHashtag.some((value) => !Hashtag.REGULAR_EXPRESSION.test(value)),
  },
  {
    customValidity: false,
    checkValue: (testedHashtag) => testedHashtag,
  },
];

export {Hashtag, objectForChecking};
