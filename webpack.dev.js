const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common(), {
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
        host: '192.168.1.138', //'192.168.1.76'
        liveReload: true,
        open: true,
        disableHostCheck: true,
        watchContentBase: true,
        port: 5000,
        
        // openPage: 'http://localhost:8080',
        // host: '0.0.0.0',
        // hot: true,
        // hotOnly: true,
        // useLocalIp: true,
        // index: './src/index.html',
    },
});