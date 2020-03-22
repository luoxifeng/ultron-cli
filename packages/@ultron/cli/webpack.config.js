
const Config = require('webpack-chain');
const path = require('path');
const config = new Config();

config
    .mode('development')
    .target('node')
    .watch(true)
    .devtool('none')
    .entry('ultron')
    .add('./src/index.js')
    .end()
    .output
    // .libraryTarget('node')
    .path(path.resolve(__dirname, './bin'))
    .filename('[name].js')
    .de
    ;

module.exports = config.toConfig();