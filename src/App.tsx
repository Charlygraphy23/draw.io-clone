import "./styles/App.scss";
import Home from "./page/home";
import Provider from "./store";

function App() {
	return (
		<Provider>
			<Home />
		</Provider>
	);
}

export default App;
