const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true
    },
    devtool: 'inline-source-map',
    output: {
        // 设置输出文件夹
        path: path.join(__dirname, 'dist'),
        // 设置公用文件夹路径
        publicPath: '/',
        // 设置输出的js文件的名字规则。
        // [name] 为chunk中的名称
        // [hash] 为webpack生成的哈希值
        filename: "js/[name].[hash].bundle.js"
    },
    module: {
        rules: [
            {test: /\.pug$/, loader: ['raw-loader', 'pug-html-loader']},
            {
                test: /\.scss$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', //生成的html存放路径，相对于path
            template: './src/view/index.pug', //html模板路径
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.HotModuleReplacementPlugin(),

    ]
};