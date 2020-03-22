#!/usr/bin/env node


const program = require('commander');
const chalk = require('chalk');
// require('../cmd');
import '../cmd/index.js';

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason, promise);
});

program
  .version(`@ultron/cli ${require('../package').version}`)
  .usage('<command> [options]');

program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(` <command> --help`)} for detailed usage of given command.`)
  console.log()
});

program.commands.forEach(c => c.on('--help', () => console.log(1111)))

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}