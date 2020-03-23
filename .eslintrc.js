module.exports = {
  extends: [
    "airbnb"
  ],
  plugins: [
    
  ],
  env: {
    // "jest": true
  },
  globals: {
    // name: 'off'
  },
  rules: {
    "no-console": process.env.NODE_ENV === 'production' ? 1 : 0,
    "arrow-parens": 0
  }
}