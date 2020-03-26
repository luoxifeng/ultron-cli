import R from 'ramda';
import { ICreateOptions } from '@/typings/index';
import { Subject } from 'rxjs';
import chalk from 'chalk';

const stringify = R.curry(JSON.stringify)(R.__, null, 4);

export const StepActions = [
  /**
   * 第一步：
   * 用户选择使用的框架
   */
  {
    name: 'template',
    skip: (options: ICreateOptions) => {
      return options.template;
    },
    action: (next) => {
      next({
        type: 'list',
        name: 'template',
        message: '请选择你要使用的框架（暂时只支持Vue, React）',
        choices: [
          {
            checked: false,
            name: 'Use Vue',
            value: 'vue'
          },
          {
            checked: false,
            name: 'Use React',
            value: 'react'
          }
        ]
      });
    }
  },
  /**
   * 是否启用ts
   */
  {
    name: 'typescript',
    skip: (options: ICreateOptions) => {
      return options.typescript;
    },
    action: next => {
      next({
        type: 'confirm',
        name: 'typescript',
        message: '请问是否启用ts在你的项目中进行类型检查？'
      });
    }
  },
  /**
   * 最后一步：
   * 用户确认之前的选择
   */
  {
    name: 'userconfirm',
    action: (next, options: ICreateOptions) => {
      // 打印用户在创建过程中所有的选择, 由用户确认
      const userSelect = R.pipe<ICreateOptions, string, string>(
        stringify,
        chalk.cyan
      )(options);

      console.log();
      console.log(chalk.cyan('-↓-↓-↓-↓-↓-↓-↓-↓-以下是你选择的项目配置-↓-↓-↓-↓-↓-↓-↓-↓-'));
      console.log(chalk.cyan(userSelect));
      console.log(chalk.cyan('-↑-↑-↑-↑-↑-↑-↑-↑-以上是你选择的项目配置-↑-↑-↑-↑-↑-↑-↑-↑-'));
      console.log();

      next({
        type: 'confirm',
        name: 'userconfirm',
        message: `是否确定使用上述项目配置${chalk.yellow('(选否会重走询问流程)')}?`
      });
    }
  }
];


const execStepCreatorFactory = (steps = []) => (
  prompts$: Subject<any>,
  options: ICreateOptions,
  next: () => void
) => (stepIndex: number) => {
  const step = steps[stepIndex];
  if (step) {
    /**
     * 如果配置了跳过条件，
     * 并且满足了跳过条件
     */
    if (step.skip && step.skip(options)) {
      return next();
    }

    if (R.is(Function, step.action)) {
      return step.action(prompts$.next.bind(prompts$), options);
    }

    prompts$.next(step.action);
  } else {
    prompts$.complete();
  }
};

export const execStepCreator = execStepCreatorFactory(StepActions);
