import { fetchTasks } from "@domain/task/taskService";
import { TaskStoreState, useTaskDispatch } from "@domain/task/taskStore";
import { ConnectedTaskList } from "@ui/taskList/connectedTaskList";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const InboxScreen: React.FC = () => {
	const dispatch = useTaskDispatch();
	// We're retrieving the error field from updated store
	const { error } = useSelector((state: TaskStoreState) => state.taskbox);
	// The useEffect triggers the data fetching when the component is muted
	useEffect(() => {
		dispatch(fetchTasks());
	}, []);

	if (error) {
		return (
			<div className="page lists-show">
				<div className="wrapper-message">
					<span className="icon-face-sad" />
					<p className="title-message">Oh no!</p>
					<p className="subtitle-message">Something went wrong</p>
				</div>
			</div>
		);
	}
	return (
		<div className="page lists-show">
			<nav>
				<h1 className="title-page">Taskbox</h1>
			</nav>
			<ConnectedTaskList />
		</div>
	);
};
