import React from "react";
import { Link } from "react-router-dom";
import loginHelper from "../helpers/loginHelper";

class Login extends React.Component {
	constructor( props ){
		super( props );
		this.state = {
			username:'',
			password:''
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	};
	changeHandler( event ){ // make data show in controlled form entries
		console.log( "Login " + event.target );
		if ( event.target.name === "username" ){
			this.setState({ username: event.target.value });	
		}else if( event.target.name === "password" ){
			this.setState({ password: event.target.value });
		};
	};
	submitHandler( event ){
		event.preventDefault();
		loginHelper( this.state )
		.then( ( data ) =>{
			console.log( "this.state:", this.state );
			console.log( "Login.loginHeler(this.state) -> data:", data );
			document.cookie = `x-auth-token=` + data.token;
			document.cookie = `user={"username":"${data.user.username}","id":"${data.user._id}","artCount":"${data.user.art.length}"}`; 
			console.log( "data.user.art", data.user.art );
			this.props.updateLogin({
				loggedin: data.token,
				username: data.user.username,
				artCount: data.user.art.length,
				id: data.user._id,
			});
			return true;
		});
	};
	
	render() {
		const { username, password } = this.state;
		let cookies = document.cookie.split("; ");
		if (cookies.length > 1) {
			let login = cookies.find((cookie) => {
				return cookie.includes("x-auth-token");
			});
			let user = cookies.find((cookie) => {
				return cookie.includes("user");
			});
			// console.log("login", login);
			// console.log("user", user);
			login = login.split("=")[1];
			user = JSON.parse(user.split("=")[1]);
			// console.log("login", login);
			// console.log("user", user.username);
			if ( user.username && login ){ // logged in already, no login for you.
				window.location.href = "http://localhost:3000/";
			}
		}
		return (
			<main className="Login">
				<h1>Login Page</h1>
				<form onSubmit={this.submitHandler}>
					<div className="form-control">
						<label htmlFor="username">Username</label>
						<input
							name="username"
							type="text"
							value={username}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="password">Password</label>
						<input
							name="password"
							type="password"
							value={password}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="form-control">
						<button type="submit">Login</button>
					</div>
					<p>
						Not already a user? <Link to="/register">Register here.</Link>
					</p>
				</form>
			</main>
		);
	};
};
export default Login;