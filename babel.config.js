const plugins = [
	'@babel/plugin-syntax-dynamic-import',
	'react-hot-loader/babel',
	[
		'@babel/plugin-transform-runtime',
		{
			regenerator: true
		}
	]
];

if (process.env.mode !== 'production') {
	plugins.push('babel-plugin-typescript-to-proptypes');
}

module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-react',
		[
			'@babel/preset-typescript',
			{
				allowNamespaces: true
			}
		]
	],
	plugins,
	env: {
		production: {
			plugins: ['transform-remove-console']
		},
		staging: {
			plugins: ['transform-remove-console']
		}
	},
	exclude: /node_modules/
};
