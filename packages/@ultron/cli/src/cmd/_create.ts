/**
 * 创建项目
 */
import program from 'commander';
import minimist from 'minimist';
import { ICreateOptions } from '../../typings';
import {
  GreenL,
  CyanL,
  Yellow,
  YellowL
} from '../utils/color';
import { CLI_LOGO } from '../config';
import create from '../lib/create';


// function camelize(str) {
//   return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
// }

// function cleanArgs(cmd) {
//   const args = {};
//   cmd.options.forEach(o => {
//     const key = camelize(o.long.replace(/^--/, ''));
//     // if an option is not present and Command has a method with the same name
//     // it should not be copied
//     if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
//       args[key] = cmd[key];
//     }
//   });
//   return args;
// }


program
  .command('create <app-name>')
  .description(GreenL`create a new project powered by ultron-cli-service`)
  .option('-tpl, --template <type>', 'config project template vue or react (配置项目使用的库，目前支持Vue， React)')
  .option('-ts, --typescript', 'use Typescript (配置项目是否使用ts')
  .action((appName, cmd) => {
    const options: ICreateOptions = Object.assign(cmd.opts() as any, { appName });
    let appType = YellowL`${options.template === 'react' ? 'React' : 'Vue'}`;
    appType += options.typescript ? ' + Typescript' : '';
    // console.log(cmd.opts(), cmd.options);
    // console.log(CyanL`${CLI_LOGO}`);
    console.log(GreenL`Ultron(奥创) 正在为你创建 ${appType} 项目: ${YellowL`${appName}`} ...`);
    console.log();

    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(Yellow`Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.`);
    }

    create(appName, options);
  });
