/* A simple redux store/actions/reducer implementation.
 * A true app would be more complex and separated into different files.
 */
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ITask, TaskState } from "./task";
import { fetchTasks } from "./taskService";
/*
 * The initial state of our store when the app loads.
 * Usually, you would fetch this from a server. Let's not worry about that now
 */
export enum TaskboxStatus {
	IDLE = "IDLE",
	LOADING = "LOADING",
	SUCCEEDED = "SUCCEEDED",
	FAILED = "FAILED",
}
export type Taskbox = {
	tasks: ITask[];
	status: TaskboxStatus;
	error: string | null;
};
export type TaskStoreState = {
	taskbox: Taskbox;
};

const defaultTasks: ITask[] = [
	{ id: "1", title: "Something", state: TaskState.TASK_INBOX },
	{ id: "2", title: "Something more", state: TaskState.TASK_INBOX },
	{ id: "3", title: "Something else", state: TaskState.TASK_INBOX },
	{ id: "4", title: "Something again", state: TaskState.TASK_INBOX },
];

const TaskBoxData: Taskbox = {
	tasks: defaultTasks,
	status: TaskboxStatus.IDLE,
	error: null,
};

/*
 * The store is created here.
 * You can read more about Redux Toolkit's slices in the docs:
 * https://redux-toolkit.js.org/api/createSlice
 */
const TasksSlice = createSlice({
	name: "taskbox",
	initialState: TaskBoxData,
	reducers: {
		updateTaskState: (state, action) => {
			const { id, newTaskState } = action.payload;
			const task = state.tasks.findIndex((task) => task.id === id);
			if (task >= 0) {
				state.tasks[task].state = newTaskState;
			}
		},
	},
	/*
	 * Extends the reducer for the async actions
	 * You can read more about it at https://redux-toolkit.js.org/api/createAsyncThunk
	 */
	extraReducers(builder) {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.status = TaskboxStatus.LOADING;
				state.error = null;
				state.tasks = [];
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.status = TaskboxStatus.SUCCEEDED;
				state.error = null;
				// Add any fetched tasks to the array
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state) => {
				state.status = TaskboxStatus.FAILED;
				state.error = "Something went wrong";
				state.tasks = [];
			});
	},
});

// The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

/*
 * Our app's store configuration goes here.
 * Read more about Redux's configureStore in the docs:
 * https://redux-toolkit.js.org/api/configureStore
 */
const taskStore = configureStore({
	reducer: {
		taskbox: TasksSlice.reducer,
	},
});

export type TaskDispatch = typeof taskStore.dispatch;
export const useTaskDispatch: () => TaskDispatch = useDispatch;

export default taskStore;
