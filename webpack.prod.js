const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "[name].[contenthash].bundle.css"}),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, // 3. Extract CSS into Files
                    { 
                        loader: 'css-loader', // 2. Turns CSS into CommonJS
                        options: { sourceMap: true } 
                    },
                    { 
                        loader: 'sass-loader', // 1. Turns Sass to CSS
                        options: { sourceMap: true } 
                    },
                ],
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // new TerserPlugin(),
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
    // performance: {
    //     maxAssetSize: 40000000,
    //     hints: false,
    // }
});