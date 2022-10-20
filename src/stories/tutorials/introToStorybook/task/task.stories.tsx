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

const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

export const LongTitle = Template.bind({});
LongTitle.args = {
	task: {
		...defaultTask,
		title: longTitleString,
	},
};
