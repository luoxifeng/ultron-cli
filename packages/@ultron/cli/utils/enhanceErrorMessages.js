const program = require('commander')
const { RedL }  = require('./color');

module.exports = (methodName, log) => {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return
    }
    this.outputHelp();
    console.log(RedL`  ${log(...args)}`);
    console.log();
    process.exit(1);
  }
}
