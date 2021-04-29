module.exports = {
	babelrcRoots: ["."],
	presets: [["@babel/preset-env"], "@babel/preset-react"],
	plugins: [
		[
			"@babel/plugin-transform-runtime",
			{
				regenerator: true,
			},
		],
		"@babel/plugin-syntax-dynamic-import",
	],
	env: {
		production: {
			plugins: ["transform-remove-console"],
		},
		staging: {
			plugins: ["transform-remove-console"],
		},
	},
	exclude: /node_modules/,
};
