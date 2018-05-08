let webpack = require('webpack');
let path = require('path');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let inProdution = (process.env.NODE_ENV === 'production');

module.exports = {
	entry: {
		app: [
			'./src/js/app.js',
			'./src/sass/app.scss'
		]
	},
	output: {
		filename: './js/[name].js',
		path: path.resolve(__dirname, './public')
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {url: false}
						},
						'sass-loader'
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('./css/[name].css'),
		new webpack.LoaderOptionsPlugin({
			minimize: inProdution
		})
	]
};

if(inProdution){
	module.exports.plugins.push(
		 new UglifyJsPlugin()
	);
};
