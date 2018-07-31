let webpack = require('webpack');
let path = require('path');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let MinifyPlugin = require("babel-minify-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
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

