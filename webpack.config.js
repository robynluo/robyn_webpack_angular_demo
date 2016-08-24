var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('bundle','bundle.js');

module.exports = {
    entry:{
        index: path.resolve(__dirname, 'app/js/index.js'),
        bundle: [
                    path.resolve(__dirname, 'mc_lib/angular/angular.js'),
                    path.resolve(__dirname, 'mc_lib/angular-route/angular-route.js')
                ],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    },
    resolve: {
        extension: ['', '.js', '.json', '.less']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
        ]
    },
    devServer: {
        hot: true
    },
    plugins: [
        commonsPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new openBrowserWebpackPlugin({ url: 'http://localhost:9090' }),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './app/html/index.html'
        })
    ]
};