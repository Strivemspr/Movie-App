const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader", // 3. Injects Styles into DOM
                    "css-loader", // 2. Turns CSS into CommonJS
                    "sass-loader", // 1. Turns Sass to CSS
                ],
            },
        ]
    },
    devServer: {
        // hot: true,
        // hotOnly: true,
        liveReload: true,
        host: '0.0.0.0',
        open: true,
        // index: './src/index.html',
        openPage: 'http://localhost:8080',
        disableHostCheck: true,
        watchContentBase: true,
    },
});