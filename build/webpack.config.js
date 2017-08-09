var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        'framework': path.resolve(__dirname, '../src/framework.js'),
        'vuebridge-sessionsnackbar' : path.resolve(__dirname, '../src/mixins/vuebridge-sessionsnackbar.js'),
        'vue-resource-request-activity' : path.resolve(__dirname, '../src/plugins/vue-resource-request-activity.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].js',
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
    resolve: {
        alias: {
            "moment": "moment"
        }
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
        //new webpack.IgnorePlugin(/moment$/),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            include: /\.djs$/,
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