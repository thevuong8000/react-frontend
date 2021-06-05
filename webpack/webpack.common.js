/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable guard-for-in */
import { DefinePlugin, ProvidePlugin } from 'webpack';
import { resolve as _resolve } from 'path';

import { BundleAnalyzerPlugin as Analyzer } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractText, { loader as _loader } from 'mini-css-extract-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WebpackBar from 'webpackbar';
import { readFileSync } from 'fs';
import { parse } from 'dotenv';
import paths from './paths.js';

const isProd = process.env.mode === 'production';
console.log(`Building: ${process.env.mode}`);

// Read .env files
const configFile = {
	global: readFileSync(_resolve(__dirname, '../.env')),
	development: readFileSync(_resolve(__dirname, '../.env.development')),
	production: readFileSync(_resolve(__dirname, '../.env.production'))
};

const envConfig = {
	...parse(configFile.global),
	...parse(configFile[process.env.mode] || {})
};

const configs = {};

// Inject .env into process.env object
for (const k in envConfig) {
	configs[`process.env.${k}`] = JSON.stringify(envConfig[k]);
}

const publicPath = '/';

export const entry = {
	main: _resolve(__dirname, '../src/index.jsx')
};
export const output = {
	path: _resolve(__dirname, '../build'),
	filename: isProd ? 'js/[name].[hash:8].js' : 'js/[name].js',
	chunkFilename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].chunk.js',
	publicPath
};
export const plugins = [
	new WebpackBar(),
	new MiniCssExtractText({
		filename: isProd ? `css/[name].[contenthash:8].css` : 'css/[name].css'
	}),
	new DefinePlugin({
		_DEV_: !isProd,
		...configs
	}),
	new ProvidePlugin({
		React: 'react'
	}),
	new CleanWebpackPlugin(),
	new HTMLWebpackPlugin({
		template: _resolve(__dirname, '../template/index.ejs'),
		filename: 'index.html',
		favicon: _resolve(__dirname, '../public/favicon.ico'),
		templateParameters: {
			buildString: envConfig.BUILD_NUMBER
		},
		publicPath
	}),
	new CopyWebpackPlugin({
		patterns: [
			{
				context: _resolve(__dirname, '../public'),
				from: '**/*',
				to: './'
			}
		]
	}),
	new Analyzer({
		openAnalyzer: false,
		analyzerMode: 'static'
	})
];
export const resolve = {
	extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
	alias: paths,
	symlinks: false
};
export const module = {
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
			test: /\.(ts|tsx|js|jsx)$/,
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
					limit: false,
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
					loader: _loader,
					options: {
						publicPath
					}
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
};
export const optimization = {
	splitChunks: {
		chunks: 'all',
		cacheGroups: {
			vendor: {
				name: 'vendor',
				test: /node-modules/
			}
		}
	}
};
