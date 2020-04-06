import { EventEmitter } from 'events';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { resolve, join } from 'path';
import fs from 'fs-extra';
import {
  chalk,
  execa,
  semver,
  clearConsole,
  hasYarn,
  hasPnpm3OrLater,
  logWithSpinner,
  stopSpinner,
  log
} from '@vue/cli-shared-utils';
import { ICreateOptions } from '@/typings/index';
import { writeFile } from '../../utils';

export default class Creator extends EventEmitter {

  private opts: ICreateOptions;

  private name: string;

  constructor(opts: ICreateOptions) {
    super();
    this.opts = opts;
    this.name = this.opts.appName;
  }

  public async create() {
    const { name } = this;
    const context = resolve(process.cwd(), name);
    logWithSpinner(`✨`, `Creating project in ${chalk.yellow(context)}.`);
    this.emit('creation', { event: 'creating' });

    // 组装 package.json 配置
    const pkg = {
      name,
      version: '0.1.0',
      private: true,
      devDependencies: {
      },
      // ...resolvePkg(context)
    };

    // 写入 package.json
    await writeFile(context, 'package.json', JSON.stringify(pkg, null, 2));


    stopSpinner();
    log(`⚙\u{fe0f}  Installing deps. This might take a while...`);
    log();
    const plugins = await this.resolvePlugins();
    



  }

  private async resolvePlugins() {
    const load = file => require(`../../plugins/cli-plugin-eslint/${file}`);
    const rawPlugins = ['eslint'];

    const plugins: any[] = [];
    for (const id of rawPlugins) {
      const apply = load(`${id}/generator`) || (() => { });
      // if (options.prompts) {
      //   const prompts = loadModule(`${id}/prompts`, this.context)
      //   if (prompts) {
      //     log()
      //     log(`${chalk.cyan(options._isPreset ? `Preset options:` : id)}`)
      //     options = await inquirer.prompt(prompts)
      //   }
      // }
      plugins.push({ id, apply });
    }
    return plugins;
  }

}
