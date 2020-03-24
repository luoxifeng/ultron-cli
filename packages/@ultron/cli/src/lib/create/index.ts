import { Subject } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import chalk from 'chalk';
import {
  error,
  stopSpinner,
  exit,
  logWithSpinner,
} from '@vue/cli-shared-utils';

const sub$ = new Subject<any>();

function create(name, options: any) {
  return sub$.pipe(
    mergeMap(() => {
      return inquirer.prompt([
        {
          name: 'ok',
          type: 'confirm',
          message: 'Generate project in current directory?'
        }
      ]);
    }),
    mergeMap(({ ok }) => {
      options.ll = ok;
      logWithSpinner('正在为你拉取项目模板。。。');
      console.log(fs);
      return 
      // fs.copy('../../templates/react', `./${name}`) ||
      [{}];
    }),
  );
}

export default (name, options) => {
  const create$ = create(name, options);
  create$.subscribe(
    res => {
      stopSpinner();
      console.log(res);
      console.log(chalk.green('创建成功'));
    },
    (err) => {
      console.log(chalk.green('创建失败'));
      stopSpinner(false); // do not persist
      error(err);
    },
  );
  sub$.next({
    name, options
  });
};
