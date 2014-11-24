var webpack = require("webpack");

module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    node: {
        fs: "empty"
    },
    module: {
        loaders: [
            { test: /\.json/, loader: "json-loader" }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.UglifyJsPlugin()
    ]
};