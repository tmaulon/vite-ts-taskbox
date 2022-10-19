import { ITask, TaskState } from "@domain/task/task";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import * as TaskStories from "@library/tutorials/introToStorybook/task/task.stories";
import { TaskList, TaskListProps } from "@ui/taskList/taskList";

export default {
	component: TaskList,
	title: "Tutorials/IntroToStorybook/TaskList",
	decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
} as ComponentMeta<typeof TaskList>;

const Template: ComponentStory<typeof TaskList> = (args) => (
	<TaskList {...args} />
);

const defaultTaskListArgs: TaskListProps = {
	loading: false,
	tasks: [
		{
			...(TaskStories.DefaultTask.args?.task as ITask),
			id: "1",
			title: "Task 1",
		},
		{
			...(TaskStories.DefaultTask.args?.task as ITask),
			id: "2",
			title: "Task 2",
		},
		{
			...(TaskStories.DefaultTask.args?.task as ITask),
			id: "3",
			title: "Task 3",
		},
		{
			...(TaskStories.DefaultTask.args?.task as ITask),
			id: "4",
			title: "Task 4",
		},
		{
			...(TaskStories.DefaultTask.args?.task as ITask),
			id: "5",
			title: "Task 5",
		},
		{
			...(TaskStories.DefaultTask.args?.task as ITask),
			id: "6",
			title: "Task 6",
		},
	],
};

export const DefaultTaskList = Template.bind({});
DefaultTaskList.args = {
	...defaultTaskListArgs,
};

export const TaskListWithPinnedTasks = Template.bind({});
TaskListWithPinnedTasks.args = {
	...defaultTaskListArgs,
	tasks: [
		...defaultTaskListArgs.tasks.slice(0, 5),
		{ id: "6", title: "Task 6 (pinned)", state: TaskState.TASK_PINNED },
	],
};

export const TaskListWithArchivedTasks = Template.bind({});
TaskListWithArchivedTasks.args = {
	...defaultTaskListArgs,
	tasks: [
		...defaultTaskListArgs.tasks.slice(0, 5),
		{ id: "6", title: "Task 6 (archived)", state: TaskState.TASK_ARCHIVED },
	],
};

export const TaskListWithAllTypesOfTaskState = Template.bind({});
TaskListWithAllTypesOfTaskState.args = {
	...defaultTaskListArgs,
	tasks: [
		...defaultTaskListArgs.tasks.slice(0, 4),
		{ id: "6", title: "Task 6 (pinned)", state: TaskState.TASK_PINNED },
		{ id: "6", title: "Task 6 (archived)", state: TaskState.TASK_ARCHIVED },
	],
};

export const TaskListLoading = Template.bind({});
TaskListLoading.args = {
	...defaultTaskListArgs,
	tasks: [],
	loading: true,
};

export const TaskListEmpty = Template.bind({});
TaskListEmpty.args = {
	...defaultTaskListArgs,
	tasks: [],
	loading: false,
};
