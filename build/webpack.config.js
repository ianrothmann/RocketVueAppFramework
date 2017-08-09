var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/framework.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'framework.js',
        library: 'rocketvueappframework',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        moment: 'moment',
        'vee-validate': 'vee-validate',
        'vue-loader': 'vue-loader',
        'css-loader': 'css-loader',
        vue: 'vue',
        vuedraggable: 'vuedraggable',
        vuetify: 'vuetify',

    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, ]
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.IgnorePlugin(/moment$/),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            include: /\.js$/,
            compress: {
                warnings: false
            }
        })
    ],
    performance: {
        hints: false
    },
    devtool: 'source-map'
}