import { TaskState } from "@domain/task/task";
import {
	TaskboxStatus,
	TaskStoreState,
	updateTaskState,
} from "@domain/task/taskStore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskList } from "./taskList";

export const ConnectedTaskList: React.FC = ({}) => {
	const tasks = useSelector((state: TaskStoreState) => {
		const orderedTasks = [
			...state.taskbox.tasks.filter((t) => t.state === TaskState.TASK_PINNED),
			...state.taskbox.tasks.filter((t) => t.state === TaskState.TASK_INBOX),
			...state.taskbox.tasks.filter((t) => t.state === TaskState.TASK_ARCHIVED),
		];

		const filteredTasks = orderedTasks.filter(
			(t) => t.state !== TaskState.TASK_ARCHIVED
		);
		return filteredTasks;
	});

	const { status } = useSelector((state: TaskStoreState) => state.taskbox);

	const dispatch = useDispatch();

	const pinTask = (taskId: string) => {
		dispatch(
			updateTaskState({ id: taskId, newTaskState: TaskState.TASK_PINNED })
		);
	};
	const archiveTask = (taskId: string) => {
		dispatch(
			updateTaskState({ id: taskId, newTaskState: TaskState.TASK_ARCHIVED })
		);
	};

	return (
		<TaskList
			loading={status === TaskboxStatus.LOADING}
			tasks={tasks}
			onArchiveTask={archiveTask}
			onPinTask={pinTask}
		/>
	);
};
