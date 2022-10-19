import taskStore from "@domain/task/taskStore";
import { InboxScreen } from "@ui/inboxScreen/inboxScreen";
import { Provider } from "react-redux";
import "./App.css";

function App() {
	return (
		<Provider store={taskStore}>
			<InboxScreen />
		</Provider>
	);
}

export default App;
