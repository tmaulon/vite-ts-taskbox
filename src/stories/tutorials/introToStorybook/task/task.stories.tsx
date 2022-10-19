import { ITask, TaskState } from "@domain/task/task";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Task } from "@ui/task/task";

export default {
	component: Task,
	title: "Tutorials/IntroToStorybook/Task",
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

const defaultTask: ITask = {
	id: "1",
	title: "Test task",
	state: TaskState.TASK_INBOX,
};

export const DefaultTask = Template.bind({});
DefaultTask.args = {
	task: defaultTask,
};

export const PinnedTask = Template.bind({});
PinnedTask.args = {
	task: {
		...defaultTask,
		state: TaskState.TASK_PINNED,
	},
};

export const ArchivedTask = Template.bind({});
ArchivedTask.args = {
	task: {
		...defaultTask,
		state: TaskState.TASK_ARCHIVED,
	},
};
