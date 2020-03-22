/**
 * 创建项目
 * 
 */
const program = require('commander');
const chalk = require('chalk');

program
  .command('create <app-name>')
  .description('create a new project powered by ultron-cli-service')
  .action((name, cmd) => {
    console.log(chalk.cyan('欢迎使用 Ultron(奥创) 创建你的 WebApp......'));
    console.log();
    const options = cleanArgs(cmd)

    // if (minimist(process.argv.slice(3))._.length > 1) {
    //   console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.'))
    // }
    // // --git makes commander to default git to true
    // if (process.argv.includes('-g') || process.argv.includes('--git')) {
    //   options.forceGit = true
    // }
    // require('../lib/create')(name, options)
    // process.exit(1);
  });