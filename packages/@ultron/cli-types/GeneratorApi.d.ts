import { PackageJson } from './common';

export interface GeneratorApiModel {

  extendPackage(pkg?: PackageJson): void;

}
