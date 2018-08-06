let webpack = require('webpack');
let path = require('path');
let glob = require('glob');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let MinifyPlugin = require("babel-minify-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let PurifyCSSPlugin = require('purifycss-webpack');

const prodMode = (process.env.NODE_ENV === 'production');

module.exports = {
    mode: 'production',
    entry: {
        index: [
            './src/js/index.js',
            './src/scss/index.scss'
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|pdf|woff|woff2|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }
                    },
                    {
                        //optimize img size
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    optimization: {
        minimizer: [
            // only available in final prod
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: prodMode
        })
    ]
};

if (prodMode) {
    module.exports.optimization.minimizer.push(
        new OptimizeCssAssetsPlugin(),
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        })
    );
    /*module.exports.plugins.push(
        new MinifyPlugin()
    )*/
}

