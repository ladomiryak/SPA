const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {

    entry : {
        hot: 'webpack-hot-middleware/client',
        app: path.join(__dirname, './src/app').normalize(),
        shared: [
            'axios',
            'babel-polyfill',
            'bluebird',
            'bson-objectid',
            'co',
            'compact-object',
            'deep-copy',
            'deep-equal',
            'email-validator',
            'lodash',
            'lodash.pick',
            'moment',
            'number-to-words',
            'react',
            'react-dom',
            'react-redux',
            'react-restricted-input',
            'react-router',
            'react-router-redux',
            'react-slick',
            'react-textarea-autosize',
            'redux',
            'redux-actions',
            'redux-form',
            'redux-localstorage',
            'redux-logger',
            'redux-saga',
            'redux-thunk',
            'shortid',
            'slick-carousel',
            'uuid',
            'valid-url',
            'validate.js',
            'year-range-regex'
        ]
    },

    output : {
        publicPath : '/',
        path : path.join(__dirname, './build').normalize(),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },

    devtool : 'source-map',

    module : {
        loaders : [
            {
                test : /\.(js|jsx)$/,
                exclude : /(node_modules|bower_components)/,
                loaders : ['babel-loader?cacheDirectory']
            },

            {
                test : /\.json$/,
                exclude : /\/node_modules\//,
                loader : 'json'
            },

            {
                test   : /\.(jpe?g|png|gif|svg|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : 'file-loader'
            },

            {
                test   : /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test   : /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader', 'sass-loader?sourceMap', 'postcss-loader'],
            },
        ],
    },

    resolve : {
        extensions : ['.js', '.jsx'],
        modules : ['src', 'node_modules']
    },

    plugins : [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('shared'),
        new HtmlWebpackPlugin({
            template : './src/index.html',
            inject : 'body'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer]
            }
        })
    ]
};
