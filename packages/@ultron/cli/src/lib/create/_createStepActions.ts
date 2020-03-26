import R from 'ramda';
import { ICreateOptions, IExecStepOption } from '@/typings/index';
import chalk from 'chalk';

const stringify = R.curry(JSON.stringify)(R.__, null, 4);
const formatUserSelect = (userSelectStr = '') => {
  return userSelectStr
    .replace(/("template":\s"vue",?)/igm, '$1 //你选择的框架是Vue')
    .replace(/("template":\s"react",?)/igm, '$1 //你选择的框架是React')
    .replace(/("typescript":\strue,?)/igm, '$1 //你启用了ts类型支持')
    .replace(/("typescript":\sfalse,?)/igm, '$1 //你禁用了ts类型支持');
};

export const StepActions = [
  {
    name: 'appName',
    skip: ({ options }: IExecStepOption) => {
      return options.template;
    },
    action: ({ next }: IExecStepOption) => {
      next({
        type: 'input',
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
      const userSelect = R.pipe<ICreateOptions, string, string, string>(
        stringify,
        formatUserSelect,
        chalk.cyan
      )(options);

      console.log();
      console.log(chalk.cyan('-↓-↓-↓-↓-↓-↓-↓-↓-以下是你选择的项目配置-↓-↓-↓-↓-↓-↓-↓-↓-'));
      console.log(userSelect);
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



const execStepCreatorFactory = (steps = []) => (opts: IExecStepOption) => (stepIndex: number) => {
  const { subject$ } = opts;
  const step = steps[stepIndex];
  if (step) {
    /**
     * 如果配置了跳过条件，
     * 并且满足了跳过条件
     */
    if (step.skip && step.skip(opts)) {
      return opts.next();
    }

    if (R.is(Function, step.action)) {
      return step.action({
        ...opts,
        next: subject$.next.bind(subject$)
      });
    }

    subject$.next(step.action);
  } else {
    subject$.complete();
  }
};

export const execStepCreator = execStepCreatorFactory(StepActions);
