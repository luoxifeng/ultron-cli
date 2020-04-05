/**
 * 创建询问流程
 */
import { Subject } from 'rxjs';
// import { mergeMap, map, catchError, retry } from 'rxjs/operators';
// import { resolve } from 'path';
// import fs from 'fs-extra';
import inquirer, { Answers } from 'inquirer';
import chalk from 'chalk';
// import {
//   // execa,
//   // semver,

//   clearConsole,

//   // hasYarn,
//   // hasPnpm3OrLater
// } from '@vue/cli-shared-utils';
// import R from 'ramda';
// import {
//   error,
//   stopSpinner,
//   exit,
//   logWithSpinner
// } from '@vue/cli-shared-utils';
import { ICreateOptions } from '@/typings/index';
import { execStepCreator } from './_createStepActions';
import Create from './Create';

let retryCount = 0;
const formatAnswer = ({ name, answer }: Answers) => {
  return {
    [name]: answer
  };
};

export default function create(options: ICreateOptions) {
  function start() {
    let stepIndex = 0;
    const prompts$ = new Subject<any>();
    const next = () => {
      stepIndex++;
      execStep(stepIndex);
    };
    const execStep = execStepCreator({
      subject$: prompts$,
      options,
      next,
      retryCount
    });
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
                const { appName } = options;
                Object.assign(options = {} as any, { appName });
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
          new Create(options);
        }
      );
    /**
     * 执行第一步
     */
    execStep(stepIndex);
  }
  // 启动流程
  start();
}
