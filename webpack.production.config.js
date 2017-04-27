const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = {

    entry : {
        app: './src/app',
        shared: webpackConfig.entry.shared
    },

    output : {
        path : __dirname + '/build',
        publicPath : '',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },

    module : {
        loaders : [
            {
                test : /\.(js|jsx)?$/,
                exclude : /(node_modules|bower_components)/,
                loader : 'babel-loader'
            },
            {
                test : /\.css/,
                loader : 'style-loader!css-loader'
            },
            {
                test : /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)/,
                exclude : /\/node_modules\//,
                loader : 'file-loader?name=[path][name].[ext]'
            },
            {
                test : /\.json$/,
                exclude : /\/node_modules\//,
                loader : 'json-loader'
            }
        ]
    },

    resolve : {
        extensions : ['.js', '.jsx'],
        modules : ['src', 'node_modules']
    },

    plugins : [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin('shared'),
        new webpack.optimize.UglifyJsPlugin({
            compress : {
                warnings : false,
                drop_console : true,
                unsafe : true
            }
        }),
        new HtmlWebpackPlugin({
            template : './src/index.html',
            inject : 'body'
        })
    ]
};
