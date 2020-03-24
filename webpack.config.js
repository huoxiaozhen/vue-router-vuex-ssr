'use strict'
//'path'是nodeJs里面的基本包
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
	target: 'web',
	// path.join是把后面两个路径拼接起来，__dirname是此当前文件(webpack.config.js)所在的路径(根路径)
	entry: path.join(__dirname, 'src/index.js'),
	output: {
		filename: 'bundle.[hash:8].js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
			},
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options:{
							limit: 1024,
							name: '[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"'
			}
		}),
		new HTMLPlugin()
	]
}

if (isDev) {
	config.module.rules.push({
		test: /\.styl$/,
		use: [
			'style-loader',
			'css-loader',
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: true
				}
			},
			'stylus-loader'
		]
	})
	config.devtool = '#cheap-module-eval-source-map'
	config.devServer = {
		port: 8000,
		host: '0.0.0.0',
		overlay: {
			// 编译中出错了直接在页面上显示错误
			errors: true
		},
		// 项目启动时自动打开浏览器
		open: true,
		// 修改某个组件时不会刷新整个页面，只刷新组件
		hot: true
	}
	config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
	config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
	config.output.filename = '[name].[chunkhash:8].js'
	config.module.rules.push(
		{
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      })
    },
	)
	config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config