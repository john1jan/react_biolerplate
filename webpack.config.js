const ManifestPlugin = require('webpack-manifest-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


let debug = true;

if (process.env.NODE_ENV == "stage" || process.env.NODE_ENV == "preProd" || process.env.NODE_ENV == "production") {
    debug = false;
}

console.log("webpack debug", debug);
console.log("webpack process.env.NODE_ENV", process.env.NODE_ENV);


const vendorPackages = [
    'jquery',
    'lodash',
    'axios',
    'radium',
    'react-dropzone',
    'react-laser-beam',
    'react-progressbar.js',
    'smoothscroll-polyfill',
    'superagent',
    'react-document-meta',
    path.join(__dirname, 'src/static/js', 'extra.js'),


];

module.exports = {
    devtool: debug ? 'inline-sourcemap' : null,
    entry: {
        bundle: path.join(__dirname, 'src', 'client.js'),
        vendor: vendorPackages
    },
    devServer: {
        inline: true,
        port: 3333,
        contentBase: "src/static/",
        historyApiFallback: {
            index: '/index-static.html'
        }
    },
    output: {
        path: path.join(__dirname, 'src', 'static', 'js'),
        publicPath: "/js/",
        filename: '[name]-[chunkhash:8].js'
    },
    module: {
        loaders: [{
            test: path.join(__dirname, 'src'),
            loader: ['babel-loader'],
            query: {
                cacheDirectory: 'babel_cache',
                presets: ['react', 'es2015']
            }
        }]
    },
    plugins: [

        new CleanWebpackPlugin(['src/static/js'], {
            root: __dirname,
            verbose: true,
            dry: false,
            exclude: ['extra.js', 'readme.txt']
        }),


        new ManifestPlugin({
            fileName: 'build-manifest.json'
        }),

        new CommonsChunkPlugin({
            name: 'common',
            filename: 'commons-[hash:8].js',
            chunks: ['bundle', 'vendor']
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),


        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),

        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ].concat(debug ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: true,
            sourcemap: false,
            beautify: false,
            dead_code: true
        })
    ])

}
