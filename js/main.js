function getRandomNumber(min, max) {
  if (min > max || min < 0 || max < 0) {
    alert('Вы ввели некорректные значения! Попробуйте еще раз.');
    return;
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
}

function checkStringLength(string, maxLength) {
  if (string.length > maxLength) {
    return false;
  }

  return true;
}

getRandomNumber(10, 50);
checkStringLength('Люблю покушац', 10);
