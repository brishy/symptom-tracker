import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Context, { UserContext } from "./Context";
import Dashboard from "./components/Dashboard";

function App() {
	const userObject = useContext(UserContext);
	return (
			<Routes>
				<Route
					path='/'
					element={<Homepage />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
        <Route
					path='/dashboard'
					element={<Dashboard />}
				/>
			</Routes>
	);
}

export default App;

