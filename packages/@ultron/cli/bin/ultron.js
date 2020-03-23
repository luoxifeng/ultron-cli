#!/usr/bin/env node

const program = require('commander');
const {
  Cyan
} = require('../utils/color');
const { PKG_CFG } = require('../config');
require('../cmd');

program
  .version(`@ultron/cli ${PKG_CFG.version}`)
  .usage('<command> [options]');

program.on('--help', () => {
  console.log();
  console.log(`  Run ${Cyan(' <command> --help')} for detailed usage of given command.`);
  console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

// 启动解析
program.parse(process.argv);

// 没有任何参数，打印帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
