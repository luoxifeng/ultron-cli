import program from 'commander';
import { RedL } from './color';

export default (methodName, log) => {
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
