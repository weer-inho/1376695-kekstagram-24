import {SIZE} from './data.js';
import {generatePhoto} from './utils.js';

const getArrayOfPhotos = () => Array(SIZE).fill(null).map(generatePhoto);

getArrayOfPhotos();
