import { Provider } from "react-redux";

import taskStore from "@domain/task/taskStore";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
	fireEvent,
	waitFor,
	waitForElementToBeRemoved,
	within,
} from "@storybook/testing-library";
import { InboxScreen } from "@ui/inboxScreen/inboxScreen";
import { rest } from "msw";
import { MockedState } from "../connectedTaskList/connectedTaskList.stories";

export default {
	component: InboxScreen,
	title: "Tutorials/IntroToStorybook/InboxScreen",
	decorators: [(story) => <Provider store={taskStore}>{story()}</Provider>],
} as ComponentMeta<typeof InboxScreen>;

const Template: ComponentStory<typeof InboxScreen> = () => <InboxScreen />;

export const Default = Template.bind({});
Default.parameters = {
	msw: {
		handlers: [
			rest.get(
				"https://jsonplaceholder.typicode.com/todos?userId=1",
				(req, res, ctx) => {
					return res(ctx.json(MockedState.tasks));
				}
			),
		],
	},
};

Default.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	// Waits for the component to transition from the loading state
	await waitForElementToBeRemoved(await canvas.findByTestId("loading"));
	// Waits for the component to be updated based on the store
	await waitFor(async () => {
		// Simulates pinning the first task
		await fireEvent.click(canvas.getByLabelText("pinTask-1"));
		// Simulates pinning the third task
		await fireEvent.click(canvas.getByLabelText("pinTask-3"));
	});
};

export const Error = Template.bind({});
Error.parameters = {
	msw: {
		handlers: [
			rest.get(
				"https://jsonplaceholder.typicode.com/todos?userId=1",
				(req, res, ctx) => {
					return res(ctx.status(403));
				}
			),
		],
	},
};
