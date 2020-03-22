/**
 * 未知的command
 */
const program = require('commander');
const chalk = require('chalk');

program
  .arguments('<command>')
  .action(cmd => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log();
  });