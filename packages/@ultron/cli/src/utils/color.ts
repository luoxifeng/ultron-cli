import chalk from 'chalk';

const wrapper = (colorFun) => (pieces, ...others) => {
  let res = colorFun(pieces[0]);

  others.forEach((t, i) => {
    res += colorFun(t + pieces[i + 1]);
  });

  return res;
};

export const Red = chalk.red;

export const RedL = wrapper(Red);

export const Cyan = chalk.cyan;

export const CyanL = wrapper(Cyan);

export const Green = chalk.green;

export const GreenL = wrapper(Green);

export const Yellow = chalk.yellow;

export const YellowL = wrapper(Yellow);
