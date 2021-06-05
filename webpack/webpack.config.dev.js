import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
	mode: 'development',
	devtool: 'cheap-source-map',
	devServer: {
		host: '0.0.0.0',
		port: 3000,
		hot: true,
		disableHostCheck: true,
		historyApiFallback: true,
		progress: true,
		publicPath: '/',
		open: true
	}
});
