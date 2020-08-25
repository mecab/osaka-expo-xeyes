var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'development',
    entry: {
        index: './assets/js/index.ts'
    },
    output: {
        path: __dirname + '/builtAssets',
        publicPath: '/assets/',
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: './views',
        publicPath: '/assets/'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: [['@babel/preset-env', {
                        targets: {
                            browsers: ['last 2 versions']
                        },
                        useBuiltIns: 'usage',
                        modules: 'commonjs',
                        corejs: 3
                    }]],
                    plugins: [
                        ['babel-plugin-transform-builtin-extend', {
                            globals: ['Error']
                        }]
                    ]
                    /*plugins: [
                        'transform-runtime',
                        { regenerator: true }
                    ]*/
                }
            },
            {
                test: /\.ts?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts-loader',
            },
            {
                test: /\.css$/,
                loader: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader' ]
            },
            {
                test: /\.scss$/,
                loader: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ]
            },
            {
                test: /\.(jpg|gif|png)$/,
                loader: "file-loader?name=img/[name].[ext]"
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=fonts/[name]-[hash].[ext]&limit=10000&minetype=application/font-woff" },
            { test: /\.(otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=fonts/[name]-[hash].[ext]" }
            /*{
             test: /\.(eot|svg|ttf|woff2?)(\?.*)?$/,
             loader: "file?name=builtAssets/fonts/[name].[ext]"
             }*/
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'assets/img/', to: 'img' }
            ]
        }),
        new MiniCssExtractPlugin({ filename: "css/[name].css" })
    ]
};
