import _head from 'lodash/head';
import _tail from 'lodash/tail';
import { getQueryString } from './utils/qs';

class Zad {
  constructor(name = 'zad') {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }

  getPath() {
    return getQueryString('host', { name: this.name });
  }

  head() {
    return _head([this.name, 1, 2, 3]);
  }

  tail() {
    return _tail([this.name, 1, 2, 3]);
  }
}

Zad.version = '__VERSION__';

export default Zad;
