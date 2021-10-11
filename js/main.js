import {SIZE} from './data.js';
import {getRandomNumber, getRandomArrayElement, generateComment, getArrayOfComments, generatePhoto} from './utils.js'

const getArrayOfPhotos = () => Array(SIZE).fill(null).map(generatePhoto);

getArrayOfPhotos()
