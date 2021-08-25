const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;

    // Loops Array and creates an object with all the values
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]); // { process.env.API_KEY: 'osdf02094092309hf'}
        return prev;
    }, {});

    return {
        entry: {
            main: './src/js/controller.js',
            vendor: './src/js/vendor/vendor.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new webpack.DefinePlugin(envKeys),
        ],
        output: {
            assetModuleFilename: 'images/[hash][ext][query]'
        },
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                    options: {
                        sources: {
                            list: [
                                {
                                    tag: 'source',
                                    attribute: 'src',
                                    type: 'src',
                                },
                                {
                                    tag: 'a',
                                    attribute: 'href',
                                    type: 'src',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src',
                                },
                            ],
                        },
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource'
                }
            ],
        },
    }
};

