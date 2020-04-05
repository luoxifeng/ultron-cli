const getOpts = require('./config/eslintOpts');
const getDeps = require('./config/eslintDeps');


module.exports = (api, { }) => {
  const eslintConfig = getOpts(api);
  const devDependencies = getDeps(api);


  const pkg = {
    eslintConfig,
    devDependencies
  };

  api.extendPackage(pkg);

  // api.
};
