const { loadConfigFromFile, mergeConfig } = require("vite");
const path = require("path");
const tsconfigPaths = require("vite-tsconfig-paths");

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-a11y",
		{
			// useless
			name: "@storybook/addon-storysource",
			options: {
				rule: {
					// test: [/\.stories\.jsx?$/], This is default
					include: [path.resolve(__dirname, "../src")], // You can specify directories
				},
				loaderOptions: {
					prettierConfig: {
						singleQuote: false,
						useTabs: true,
						printWidth: 120,
						trailingComma: "all",
						jsxBracketSameLine: true,
					},
				},
			},
		},
		"storybook-addon-designs",
		"storybook-zeplin/register",
	],
	framework: "@storybook/react",
	core: {
		builder: "@storybook/builder-vite",
	},
	features: {
		storyStoreV7: true,
		interactionsDebugger: true,
	},
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) =>
				prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
			compilerOptions: {
				allowSyntheticDefaultImports: false,
				esModuleInterop: false,
			},
		},
	},
	async viteFinal(config, { configType }) {
		const { config: userConfig } = await loadConfigFromFile(
			configType,
			path.resolve(__dirname, "../vite.config.ts")
		);

		return mergeConfig(config, {
			...userConfig,
			// resolve: {
			// 	alias: {
			// 		"@/*": path.resolve("../src/*"),
			// 		"@ui/*": path.resolve("../src/components/*"),
			// 		"@assets/*": path.resolve("../src/assets/*"),
			// 		"@library/*": path.resolve("../src/stories/*"),
			// 	},
			// },
			plugins: [tsconfigPaths.default()],
		});
	},
};
