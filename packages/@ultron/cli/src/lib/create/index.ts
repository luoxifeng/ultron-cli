import { Subject, EMPTY, of, from, Subscription, Subscriber } from 'rxjs';
import { mergeMap, map, catchError, retry } from 'rxjs/operators';
import { resolve } from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import chalk from 'chalk';
import R from 'ramda';
import {
  error,
  stopSpinner,
  exit,
  logWithSpinner,
} from '@vue/cli-shared-utils';
import { ICreateOptions, IAnswer } from '@/typings/index';
import { execStepCreator } from './_createStepActions';

let retryCount = 0;
const formatAnswer = ({ name, answer }: IAnswer) => {
  return {
    [name]: answer
  };
};

export default function create(name, options: ICreateOptions) {
  function start() {
    let stepIndex = 0;
    const prompts$ = new Subject<any>();
    const next = () => {
      stepIndex++;
      execStep(stepIndex);
    };
    const execStep = execStepCreator(prompts$, options, next);
    const prompt = inquirer.createPromptModule();

    prompt(prompts$)
      .ui
      .process
      .subscribe(
        (res) => {
          /**
           * 到最后用户确认，如果用户选择重新选择，需要重新走之前的流程
           */
          if (res.name === 'userconfirm') {
            if (!res.answer) {
              if (retryCount < 3) {
                /* eslint-disable no-param-reassign */
                retryCount++;
                console.log(chalk.yellow(`最大可重试3次, 这是你第 ${retryCount} 次重试`));
                options = {} as any;
                start();
                return;
              }
              console.log(chalk.yellow('很抱歉！你已经达到最大重试次数'));
              console.log(chalk.yellow('接下来将为你启动创建。。。'));
            } else {
              console.log(chalk.yellow('已确认！接下来为你启动创建。。。'));
            }
          }

          /**
           * 扩展用户的选择
           * 然后继续走接下来的步骤
           */
          Object.assign(options, formatAnswer(res));
          next();
        },
        () => {
          console.log(chalk.red('出错'));
        },
        () => {
          console.log(chalk.green('完成'));
        }
      );
    // console.log(subscription)
    // console.log(subscription);
    /**
     * 执行第一步
     */
    execStep(stepIndex);
  }
  // 启动流程
  start();
}

// export default (name, options) => {
//   const create$ = create(name, options);
//   create$.subscribe(
//     res => {
//       stopSpinner();
//       // console.log(res);
//       console.log(chalk.green('创建成功'));
//     },
//     (err) => {
//       console.log(chalk.green('创建失败'));
//       stopSpinner(false); // do not persist
//       error(err);
//     },
//   );
//   sub$.next({
//     name, options
//   });
// };
