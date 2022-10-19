export enum TaskState {
	TASK_INBOX = "TASK_INBOX",
	TASK_PINNED = "TASK_PINNED",
	TASK_ARCHIVED = "TASK_ARCHIVED",
}

export interface ITask {
	id: string;
	title: string;
	state: TaskState;
}
