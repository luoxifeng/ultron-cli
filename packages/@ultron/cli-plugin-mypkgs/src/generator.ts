import { GeneratorApi } from '@ultron/cli-types';

export default (api: GeneratorApi) => {

  api.extendPackage({
    dependencies: {
      ramda: '^0.27.0',
      rxjs: '^6.5.4'
    }
    devDependencies: {

    }
  });


};

// module.exports = (api) => {
//   api.ex
// }