#!/usr/bin/env node

import program from 'commander';
import { Cyan } from '../utils/color';
import { PKG_CFG } from '../config';
import '../cmd';

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
