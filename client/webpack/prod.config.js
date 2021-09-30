const path = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('./utils');
const publicPath = 'ui.calypso.local';


module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', './src/index.jsx'],
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: `http://${publicPath}/`,
        filename: '[name].[contenthash].js'
    },
    resolve,
    plugins: [
        new HTMLWebpackPlugin({ template: './src/index.html' }),
        new CleanWebpackPlugin(),
        new DefinePlugin({
            PRODUCTION: JSON.stringify(true)
        })
    ],
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[hash:base64:5]',
                            exportLocalsConvention: 'camelCaseOnly'
                        },
                        importLoaders: 1
                    }
                }, 'postcss-loader']
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            }
        ]
    }
};
