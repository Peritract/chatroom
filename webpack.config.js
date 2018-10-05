const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
	  'client': './src/scripts/client.js',
	  'server': './src/scripts/server.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]-bundle.js'
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
		filename: "index.html",
		template: './src/templates/index.html',
		favicon: './src/assets/octo.ico',
		excludeChunks: ['server']
	})
  ],
  target: 'node',
  module: {
      rules: [
		  {
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
			  loader: "babel-loader"
			}
		  },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       }
      ]
    },
}