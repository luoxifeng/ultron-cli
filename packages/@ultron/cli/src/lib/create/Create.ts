import { EventEmitter } from 'events';
import { ICreateOptions } from '@/typings/index';
import {
  chalk,
  execa,
  semver,

  clearConsole,

  hasYarn,
  hasPnpm3OrLater
} from '@vue/cli-shared-utils';

export default class Create extends EventEmitter {

  static create(opts: ICreateOptions) {
    return new Create(opts);
  }

  private opts: ICreateOptions;

  private appName = this.opts.appName;

  constructor(opts: ICreateOptions) {
    super();
    this.create();
    this.opts = opts;
  }

  private create() {

  }

}
