const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'cheap-source-map',
	devServer: {
		host: '0.0.0.0',
		port: 3000,
		hot: true,
		disableHostCheck: true,
		historyApiFallback: true,
		progress: true,
		publicPath: '/'
	}
});
