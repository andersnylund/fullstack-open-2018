import { configure, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter(), });

let savedItems = {};

const localStorageMock = {
  setItem: (key, item) => {
    // console.log(`localStorageMock setItem: ${item}`);
    savedItems[key] = item;
  },
  getItem: (key) => {
    // console.log(`localStorageMock getItem: ${savedItems[key]}`);
    return savedItems[key];
  },
  clear: savedItems = {},
};

window.localStorage = localStorageMock;