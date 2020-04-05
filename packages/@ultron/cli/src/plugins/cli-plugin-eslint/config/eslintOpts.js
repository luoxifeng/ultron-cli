module.exports = () => {

  const config = {
    root: true,
    env: { node: true },
    parser: 'babel-eslint',
    extends: [
      'airbnb'
    ],
    parserOptions: {
      ecmaVersion: 2020
    },
    rules: {
      'no-console': format(`process.env.NODE_ENV === 'production' ? 'warn' : 'off'`),
      'no-debugger': format(`process.env.NODE_ENV === 'production' ? 'warn' : 'off'`)
    }
  };

  return config;
};

function format(str) {
  const fn = () => {};
  fn.__expression = str;
  return fn;
}
