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
}

Zad.version = '__VERSION__';

export default Zad;
