import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { withDesign } from "storybook-addon-designs";
import "../src/index.css";

const customViewports = {
	kindleFire2: {
		name: "Kindle Fire 2",
		styles: {
			width: "600px",
			height: "963px",
		},
	},
	kindleFireHD: {
		name: "Kindle Fire HD",
		styles: {
			width: "533px",
			height: "801px",
		},
	},
};

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	viewport: {
		viewports: { ...INITIAL_VIEWPORTS, ...customViewports },
	},
};

initialize();

export const decorators = [mswDecorator, withDesign];
