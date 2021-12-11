import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Register(props) {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [repass, setRePass] = useState("");
	const [error, setError] = useState("");

	function isNewUser(username) {
		const userURL = "http://localhost:9000/api/user/";
		return fetch(userURL)
			.then((res) => res.json())
			.then((users) => {
				let hasUser = users.find((user) => {
					return user.username === username;
				});
				console.log( "isNewUser.hasUser =", hasUser );
				if ( hasUser === undefined ) {
					return true;
				}
				return false;
			});
	}
	function registerUser(username, password, image) {
		console.log("registerUser says", username, password );
		const url = "http://localhost:9000/api/user/register";
		let data = JSON.stringify({
			username,
			password,
			image,
		});
		let resources = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: data,
		};
		return fetch(url, resources)
		.then((res) => res.json());
	}

	const submitHandler = (event) => {
		event.preventDefault();
		let image = "";
		if (password !== repass) {
			setError("Both Passwords must be the same!");
			return;
		}
		isNewUser(username)
		.then((user) => {
			// console.log("isNewUser returned", user);
			if (!user) {
				setError("Username already exists, try again or go to login.");
				return;
			}
			let files = document.getElementById("image").files;
			var reader = new FileReader();
			if ( files.length > 0 ){
				reader.readAsDataURL(files[0]);
				reader.onload = function () {
					image = reader.result;
					// console.log("Register Image data:", image);
					registerUser(username, password, image).then((res) => {
						navigate("/login");
						return;
					});
				};
			}else{ // no image
				registerUser( username, password )
				.then((res) => {
						navigate("/login");
				});
			}
		});
	};
	return (
		<main className="Register">
			<h1>Register Page</h1>
			<form onSubmit={submitHandler}>
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input
						name="username"
						type="text"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="password">Password</label>
					<input
						name="password"
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="repass">Re-Password</label>
					<input
						name="repass"
						type="password"
						value={repass}
						onChange={(e) => {
							setRePass(e.target.value);
						}}
					/>
					<div>{error}</div>
				</div>
				<div className="form-control">
					<label htmlFor="image">Profile picture:</label>
					<br />
					<input
						type="file"
						id="image"
						name="image"
						// accept="image/png, image/PNG, image/jpeg"
					/>
				</div>
				<div className="form-control">
					<button type="submit">Register</button>
				</div>
			</form>
		</main>
	);
};
export default Register;