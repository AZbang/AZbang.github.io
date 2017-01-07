'use strict'

const webpack = require("webpack");
const NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {
	entry: "./src/app.js",
	output: {
		path: './dist',
		filename: "app.js",
	},
	watch: NODE_ENV == "dev",
	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: NODE_ENV == "dev" ? "source-map" : null,

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: "babel"
		}]	
	},

	devServer: {
		host: 'localhost',
		port: 8080,
		contentBase: __dirname + '/dist'
	}
};

if(NODE_ENV == "production") {
	module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
		warnings: false,
		drop_console: true,
		unsafe: true

	}))
}