const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('./utils');

const PORT = process.env.PORT || 3000;


module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.jsx'],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    resolve,
    plugins: [
        new HTMLWebpackPlugin({ template: './src/index.html' }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        port: PORT,
        historyApiFallback: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:8090/',
                secure: false,
                changeOrigin: true,
                autoRewrite: true,
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[name]__[local]--[hash:base64:5]',
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
    },
    devtool: 'source-map'
};