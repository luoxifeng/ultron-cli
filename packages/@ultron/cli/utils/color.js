const chalk = require('chalk');

const _ = module.exports;

const wrapper = (colorFun) => (pieces, ...others) => {
  let res = colorFun(pieces[0]);

  others.forEach((t, i) => {
    res += colorFun(t + pieces[i + 1]);
  });

  return res;
};

_.Red = chalk.red;

_.RedL = wrapper(_.Red);

_.Cyan = chalk.cyan;

_.CyanL = wrapper(_.Cyan);

_.Green = chalk.green;

_.GreenL = wrapper(_.Green);

_.Yellow = chalk.yellow;

_.YellowL = wrapper(_.Yellow);

