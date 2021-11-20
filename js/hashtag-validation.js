// const MAX_HASHTAG_COUNT = 5;
// const MAX_HASHTAG_LENGTH = 20;
// const MIN_HASHTAG_LENGTH = 2;
// const MESSAGE_1 = 'хэш-тег начинается с символа # (решётка)';
// const MESSAGE_2 = 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д';
// const MESSAGE_3 = 'хеш-тег не может состоять только из одной решётки';
// const MESSAGE_4 = 'максимальная длина одного хэш-тега 20 символов, включая решётку';
// const MESSAGE_5 = 'один и тот же хэш-тег не может быть использован дважды';
// const REGULAR_EXPRESSION = '^#[A-Za-zА-Яа-яЁё0-9]{1,19}$';
// const regExp = new RegExp(REGULAR_EXPRESSION);

// function applyRules(element) {
//   if (element[0] !== '#') {
//     return MESSAGE_1;
//   }

//   if (element.length < MIN_HASHTAG_LENGTH) {
//     return MESSAGE_3;
//   }

//   if (element.length > MAX_HASHTAG_LENGTH) {
//     return MESSAGE_4;
//   }

//   if (!regExp.test(element)) {
//     return MESSAGE_2;
//   }
// }

// function inc(current) {
//   if (Number.isFinite(current)) {
//     return current + 1;
//   };

//   return 1;
// }

// function countTags (tagsCount, element) {
//   const upperCaseElement = element.toUpperCase();
//   return {
//     ...tagsCount,
//     [upperCaseElement]: inc(tagsCount[upperCaseElement])
//   }
// }

// function analyzeSingleTag(accumulator, element) {
//   const {tagsCount, message} = accumulator;
//   const newTagsCount = countTags(tagsCount, element);
//   return {
//     tagsCount: newTagsCount,
//     message: `${message} ${applyRules(element)} ${newTagsCount > 1 ? MESSAGE_5 : ''}`,
//   };
// }

// function analyzeTags (values) {
//   const result = values.reduce(analyzeSingleTag, {tagsCount: {}, message: ''});
//   return result.message;
// }

// function hashtagValidationInternal (value) {
//   const values = value.split(' ');
//   if (values.length > MAX_HASHTAG_COUNT) {
//     return `Количество хэштегов превышает ${MAX_HASHTAG_COUNT}`;
//   }

//   return analyzeTags(values);
// }

export function hashtagValidation (value) {
  if (typeof value !== 'string' || value === '') {
    return false;
  };

  // hashtagValidationInternal(value)
}
