import { ITask, TaskState } from "@domain/task/task";
import { Task } from "@ui/task/task";
import React from "react";

export interface TaskListProps {
	loading: boolean;
	tasks: ITask[];
	onPinTask?: (taskId: string) => void;
	onArchiveTask?: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
	loading,
	tasks,
	onArchiveTask,
	onPinTask,
}) => {
	if (loading) {
		return (
			<div className="list-items" data-testid="loading" key={"loading"}>
				{[...Array(6)].map((_, index) => (
					<div className="loading-item" key={index}>
						<span className="glow-checkbox" />
						<span className="glow-text">
							<span>Loading</span> <span>cool</span> <span>state</span>
						</span>
					</div>
				))}
			</div>
		);
	}

	if (tasks.length === 0) {
		return (
			<div className="list-items" key={"empty"} data-testid="empty">
				<div className="wrapper-message">
					<span className="icon-check" />
					<p className="title-message">You have no tasks</p>
					<p className="subtitle-message">Sit back and relax</p>
				</div>
			</div>
		);
	}

	return (
		<div className="list-items">
			{[
				...tasks.filter((t) => t.state === TaskState.TASK_PINNED),
				...tasks.filter((t) => t.state === TaskState.TASK_INBOX),
				...tasks.filter((t) => t.state === TaskState.TASK_ARCHIVED),
			].map((task) => (
				<Task
					key={task.id}
					task={task}
					onArchiveTask={onArchiveTask}
					onPinTask={onPinTask}
				/>
			))}
		</div>
	);
};
