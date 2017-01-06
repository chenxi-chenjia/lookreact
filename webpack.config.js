var webpack = require('webpack');
var uglifyJsPlugin=webpack.optimize.UglifyJsPlugin;
module.exports={
	entry:'./dev/admin.jsx',
	output:{
		path:'./site/public/js',
		filename:'index.js'
	},
	module: {
		loaders:[
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				loader: 'babel-loader?presets[]=es2015&presets[]=react'
			}
		]
	}
	// plugins: [
	// 	new uglifyJsPlugin({
	// 		compress: {
	// 			warnings: false
	// 		}
	// 	})
	// ]
}
