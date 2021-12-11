import React from "react";
import Nav from "./Nav";
import App from "../App";

class LoginCheck extends React.Component {
	constructor( props ) {
		super( props );
		let cookies = document.cookie.split("; "); // ["cookiename= value",'cookiename= value']
		console.log( "loginCheck constructor says", document.cookie );
		let login = "";
		let user = {
			username: "",
			artCount: 0,
			id: "",
		};

		if (cookies.length > 1) {
			login = cookies.find((cookie) => {
				return cookie.includes("x-auth-token");
			});
			user = cookies.find((cookie) => {
				return cookie.includes("user");
			});
			console.log("loginCheck login",login)
			console.log("loginCheck user ( pre process )",user);
			login = login.split("=")[1];
			user = JSON.parse(user.split("=")[1]);
		}

		this.state = {
			loggedin: login ? true : false,
			username: user.username,
			artCount: user.artCount,
			token: login,
			id: user.id,
		};
		this.updateLogin = this.updateLogin.bind(this);
		this.addArt = this.addArt.bind(this);
	}
	addArt(){
		// console.log("added one art stub");
		this.setState((prevState) => {
			return {
				artCount: prevState.artCount + 1,
			};
		});
	};
	updateLogin(logInfo) {
		let user;
		if (logInfo) {
			user = logInfo;
		}
		this.setState(() => {
			if (user) {
				return {
					loggedin: user.loggedin ? true : false,
					username: user.username,
					artCount: user.artCount,
					token: user.loggedin,
					id: user.id,
				};
			} else {
				return {
					loggedin: false,
					username: "",
					artCount: 0,
					token: "",
					id: "",
				};
			}
		});
	}
	render() {
		// console.log(this.state);
		return (
			<div>
				<Nav loggedin={this.state.loggedin} />
				<App
					user={this.state}
					updateLogin={this.updateLogin}
					addArt={this.addArt} // TODO Fix me?
				/>
			</div>
			// <p> site state obj bork </p>
		);
	}
}
export default LoginCheck;