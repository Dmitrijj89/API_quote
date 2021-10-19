const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const JS_DIR = path.resolve( __dirname, './src/index.js');

module.exports = {
    entry: {
        main: JS_DIR
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'script.js',
        
    },
    mode: "options.mode",
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
        rules: [
            {
                test: /\.(sass|css)$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: true
                            },
                             sourceMap: true,
                         }
                    }, 
                    {
                        loader: 'sass-loader',
                        options: {sourceMap: true}
                    }
                ],
            },
        ],
    }
}