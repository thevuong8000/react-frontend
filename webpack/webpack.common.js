/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable guard-for-in */
const webpack = require('webpack');
const path = require('path');

const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractText = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

const isProd = process.env.mode === 'production';

console.log(`Building: ${process.env.mode}`);

// Read .env files
const dotenv = require('dotenv');
const paths = require('./paths.js');

const configFile = {
	global: fs.readFileSync(path.resolve(__dirname, '../.env')),
	development: fs.readFileSync(path.resolve(__dirname, '../.env.development')),
	production: fs.readFileSync(path.resolve(__dirname, '../.env.production'))
};

const envConfig = {
	...dotenv.parse(configFile[process.env.mode]),
	...dotenv.parse(configFile.global)
};

const configs = {};

// Inject .env into process.env object
for (const k in envConfig) {
	configs[`process.env.${k}`] = JSON.stringify(envConfig[k]);
}

const publicPath = '/';

module.exports = {
	entry: {
		main: path.resolve(__dirname, '../src/index.jsx')
	},
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: isProd ? 'js/[name].[hash:8].js' : 'js/[name].js',
		chunkFilename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].chunk.js',
		publicPath
	},
	plugins: [
		new MiniCssExtractText({
			filename: isProd ? `css/[name].[contenthash:8].css` : 'css/[name].css'
		}),
		new webpack.DefinePlugin({
			_DEV_: !isProd,
			...configs
		}),
		new webpack.ProvidePlugin({
			React: 'react'
		}),
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, '../template/index.ejs'),
			filename: 'index.html',
			favicon: path.resolve(__dirname, '../public/favicon.ico'),
			templateParameters: {
				buildString: envConfig.BUILD_NUMBER
			},
			publicPath
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					context: path.resolve(__dirname, '../public'),
					from: '**/*',
					to: './'
				}
			]
		}),
		new Analyzer({
			openAnalyzer: false,
			analyzerMode: 'static'
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
		alias: paths,
		symlinks: false
	},
	module: {
		rules: [
			{
				test: /\.(ejs|html)$/,
				use: {
					loader: 'ejs-loader',
					options: {
						esModule: false
					}
				}
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true
					}
				}
			},
			{
				test: /\.(ico|jpg|jpeg|png|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 1000,
						name: 'static/[name].[hash:8].[ext]',
						publicPath
					}
				}
			},
			{
				test: /\.svg$/,
				use: {
					loader: 'svg-url-loader',
					options: {
						limit: 1000,
						name: 'static/[name].[hash:8].[ext]',
						fallback: 'file-loader'
					}
				}
			},
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: MiniCssExtractText.loader
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: !isProd,
							modules: {
								auto: (resourcePath) => resourcePath.endsWith('.module.scss'),
								localIdentName: isProd ? '[hash:8]' : '[name]__[local]--[hash:8]'
							},
							importLoaders: 1
						}
					},
					'sass-loader'
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					name: 'vendor',
					test: /node-modules/
				}
			}
		}
	}
};
