/**
 * 未知的command
 */
import program from 'commander';
import { RedL, YellowL, Yellow } from '../utils/color';
import enhanceErrorMessages from '../utils/enhanceErrorMessages';

program
  .arguments('<command>')
  .action(cmd => {
    program.outputHelp();
    console.log(RedL`  Unknown command ${YellowL`${cmd}.`}`);
    console.log();
  });

enhanceErrorMessages('missingArgument', argName => {
  return `Missing required argument ${YellowL`<${argName}>`}.`
})

enhanceErrorMessages('unknownOption', optionName => {
  return `Unknown option ${Yellow(optionName)}.`
})

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return `Missing required argument for option ${Yellow(option.flags)}` + (
    flag ? `, got ${Yellow(flag)}` : ``
  )
})


