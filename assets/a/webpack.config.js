const path = require('path'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    webpack = require('webpack');

module.exports = {
    name: 'frontend',
    mode: 'development',
    entry: [
        path.resolve(__dirname, 'src/scss/app.scss'),
        path.resolve(__dirname, 'src/js/app.js'),
    ],
    output: {
        path: path.resolve(__dirname, `build`),
        filename: 'app.[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css',
        }),
    ],
};
