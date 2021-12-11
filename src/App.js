import Main from "./Components/Main";
import Create from "./Components/Create";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Error from "./Components/Four0Four";
import PrivateRoute from "./Components/PrivateRoute";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

function App( props ){
	const loggedIn = props.user.loggedin;
	// const notLoggedIn = !props.user.loggedin;
	console.log( "Logged in ", loggedIn );
	// console.log( "Not Logged in ", notLoggedIn );
	console.log( "Props ", props );
	return (
		<div className="App Container">
			<Routes>
				<Route path="/" exact element={<Main />} />
				<Route
					path="/create"
					element={
						<PrivateRoute isAuth={loggedIn} path="create" redirectTo="/login">
							<Create user={props.user} addArt={props.addArt} />
						</PrivateRoute>
					}
				/>
				<Route path="/register" element={<Register />} />
				<Route
					path="/login"
					element={<Login updateLogin={props.updateLogin}/>}/>
				<Route
					path="/profile"
					element={
						<PrivateRoute isAuth={loggedIn} path="profile" redirectTo="/login">
							<Profile
								updateLogin={props.updateLogin}
								user={props.user}
								username={props.user.username}
							/>
					  </PrivateRoute> // FOR PROFILE Component numGallery={props.user.posts}
					}
				/>
				<Route path="*" element={<Error path={props.path} />} />
			</Routes>
		</div>
	);
};
export default App;