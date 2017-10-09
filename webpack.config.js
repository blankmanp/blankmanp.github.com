'use strict'
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const config = require('config');

const entries = {};

glob.sync(`${config.pages}/**/*`, {
    nodir: true
})
.filter((f) => {
    return !/node_modules/.test(f);
})
.forEach((f) => {
    const name = path.relative(config.pages, f).replace(/\.js(x)?$/, '');
    entries[name] = f;
});

module.exports = {
    entry: entries,
    output: {
        path: `${config.assets}/pages`,
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ]
    }
}