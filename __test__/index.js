const colors = require('colors');

console.log(colors.red.red);

const xchain = (target = {}, fileds = [], fun = () => {}) => {

  const props = fileds.reduce((acc, key) => {
    acc[key] = {
      get() {

      }
    }
    return acc;
  }, {});

  Object.defineProperties(target, props);
}

const t = xchain({}, ['a', 'b'], function () {

});

t.a.b(11);

t.b.a(11);
