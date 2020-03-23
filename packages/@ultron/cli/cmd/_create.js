/**
 * 创建项目
 */
const program = require('commander');
const minimist = require('minimist');
const {
  RedL,
  GreenL,
  CyanL,
  Yellow,
  YellowL
} = require('../utils/color');
const { CLI_LOGO } = require('../config');

program
  .command('create <app-name>')
  .description(GreenL`create a new project powered by ultron-cli-service`)
  .action((name, cmd) => {
    const options = cleanArgs(cmd);
    const appType = YellowL`${options.react ? ' React ' : ''}`;
    console.log(CyanL`${CLI_LOGO}`);
    console.log(GreenL`Ultron(奥创) 正在为你创建${appType}项目: ${YellowL`${name}`} ...`);
    console.log();

    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(Yellow`Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.`)
    }
  
    require('../lib/create')(name, options);
  })
  .option('-r, --react', 'create React App');


function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}