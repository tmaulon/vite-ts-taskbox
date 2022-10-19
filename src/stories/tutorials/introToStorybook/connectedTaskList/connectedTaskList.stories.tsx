import { ITask, TaskState } from "@domain/task/task";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TaskboxStatus, TaskStoreState } from "@domain/task/taskStore";
import * as TaskStories from "@library/tutorials/introToStorybook/task/task.stories";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ConnectedTaskList } from "@ui/taskList/connectedTaskList";
import { Provider } from "react-redux";

// A super-simple mock of the state of the store
export const MockedState: TaskStoreState["taskbox"] = {
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
	status: TaskboxStatus.IDLE,
	error: null,
};

// A super-simple mock of a redux store
const Mockstore = ({
	taskboxState,
	children,
}: {
	taskboxState: TaskStoreState["taskbox"];
	children?: React.ReactNode;
}) => (
	<Provider
		store={configureStore({
			reducer: {
				taskbox: createSlice({
					name: "taskbox",
					initialState: taskboxState,
					reducers: {
						updateTaskState: (state, action) => {
							const { id, newTaskState } = action.payload;
							const task = state.tasks.findIndex((task) => task.id === id);
							if (task >= 0) {
								state.tasks[task].state = newTaskState;
							}
						},
					},
				}).reducer,
			},
		})}
	>
		{children}
	</Provider>
);

export default {
	component: ConnectedTaskList,
	title: "Tutorials/IntroToStorybook/ConnectedTaskList",
	decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
	excludeStories: /.*MockedState$/,
} as ComponentMeta<typeof ConnectedTaskList>;

const Template: ComponentStory<typeof ConnectedTaskList> = () => (
	<ConnectedTaskList />
);

export const DefaultConnectedTaskList = Template.bind({});
DefaultConnectedTaskList.decorators = [
	(story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
];

export const ConnectedTaskListWithPinnedTasks = Template.bind({});
ConnectedTaskListWithPinnedTasks.decorators = [
	(story) => {
		const pinnedtasks = [
			...MockedState.tasks.slice(0, 5),
			{ id: "6", title: "Task 6 (pinned)", state: TaskState.TASK_PINNED },
		];

		return (
			<Mockstore
				taskboxState={{
					...MockedState,
					tasks: pinnedtasks,
				}}
			>
				{story()}
			</Mockstore>
		);
	},
];

export const ConnectedaskListWithArchivedTasks = Template.bind({});
ConnectedaskListWithArchivedTasks.decorators = [
	(story) => {
		const archivedtasks = [
			...MockedState.tasks.slice(0, 5),
			{ id: "6", title: "Task 6 (archived)", state: TaskState.TASK_ARCHIVED },
		];

		return (
			<Mockstore
				taskboxState={{
					...MockedState,
					tasks: archivedtasks,
				}}
			>
				{story()}
			</Mockstore>
		);
	},
];

export const ConnectedTaskListWithAllTypesOfTaskState = Template.bind({});
ConnectedTaskListWithAllTypesOfTaskState.decorators = [
	(story) => {
		const pinnedtasks = [
			...MockedState.tasks.slice(0, 4),
			{ id: "6", title: "Task 6 (pinned)", state: TaskState.TASK_PINNED },
			{ id: "6", title: "Task 6 (archived)", state: TaskState.TASK_ARCHIVED },
		];

		return (
			<Mockstore
				taskboxState={{
					...MockedState,
					tasks: pinnedtasks,
				}}
			>
				{story()}
			</Mockstore>
		);
	},
];

export const ConnectedTaskListLoading = Template.bind({});
ConnectedTaskListLoading.decorators = [
	(story) => (
		<Mockstore
			taskboxState={{
				...MockedState,
				status: TaskboxStatus.LOADING,
			}}
		>
			{story()}
		</Mockstore>
	),
];

export const ConnectedTaskListEmpty = Template.bind({});
ConnectedTaskListEmpty.decorators = [
	(story) => (
		<Mockstore
			taskboxState={{
				...MockedState,
				tasks: [],
			}}
		>
			{story()}
		</Mockstore>
	),
];
