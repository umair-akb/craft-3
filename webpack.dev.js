const path = require('path');
const settings = require('./webpack.settings.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public/dist/',
        // filename: 'bundle.js'
    },
    devServer: {
        https: settings.devServer.https,
        host: settings.devServer.host,
        port: settings.devServer.port,
        contentBase: path.join(__dirname, settings.paths.templates),
        disableHostCheck: true,
        watchContentBase: true,
        headers: { "Access-Control-Allow-Origin": "*" }
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.jsx', '.scss', '.vue'],
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.(vue)$/,
                use: [
                    { loader: 'vue-loader' }
                ],
                include: []
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' }
                ]
            },
            {
                test: /\.(css|scss|pcss)$/,
                exclude: /node_modules/,
                // include: [
                //     path.resolve(__dirname, 'src', 'scss')
                // ],
                use: [
                    { loader: 'vue-style-loader' }, 
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options: { sourceMap: true } }, 
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        new ManifestPlugin(
            {
                fileName: settings.manifest.fileName,
                basePath: settings.manifest.basePath,
                map: (file) => {
                    file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
                    return file;
                },
            }
        ),
    ]
};