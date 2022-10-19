import { ITask, TaskState } from "@domain/task/task";
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { TaskDto } from "./taskDto";

export const fetchTasks: AsyncThunk<ITask[], void, {}> = createAsyncThunk(
	"todos/fetchTodos",
	async () => {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/todos?userId=1"
		);
		const data: TaskDto[] = await response.json();
		const result: ITask[] = data.map((task) => ({
			id: `${task.id}`,
			title: task.title,
			state: task.completed ? TaskState.TASK_ARCHIVED : TaskState.TASK_INBOX,
		}));
		return result;
	}
);
