const { Subject } = require('rxjs');
const { mergeMap, map } = require('rxjs/operators');
const inquirer = require('inquirer');
const chalk = require('chalk');
const {
  error,
  stopSpinner,
  exit,
  logWithSpinner
} = require('@vue/cli-shared-utils');

const sub$ = new Subject();

function create(name, options) {
  return sub$.pipe(
    mergeMap(() => {
      return inquirer.prompt([
        {
          name: 'ok',
          type: 'confirm',
          message: `Generate project in current directory?`
        }
      ]);
    }),
    map(({ ok }) => {
      options.ll = ok; 
      return options;
    }),
  );
}

module.exports = (name, options) => {
  const create$ = create(name, options);
  create$.subscribe(
    res => {
      stopSpinner();
      console.log(res);
      console.log(chalk.green('创建成功'));
    },
    (err) => {
      console.log(chalk.green('创建失败'));
      stopSpinner(false) // do not persist
      error(err);
    },
  );
  create$.next({
    name, options
  })
}