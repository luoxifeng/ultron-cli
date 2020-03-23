/**
 * 未知的command
 */
const program = require('commander');
const { RedL, YellowL, Yellow } = require('../utils/color');
const enhanceErrorMessages = require('../utils/enhanceErrorMessages');

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


