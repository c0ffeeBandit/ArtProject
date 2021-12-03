import Gallery from "./Gallery";

function logout() {
	let cookies = document.cookie.split("; ");
	let token = cookies
		.find((cookie) => {
			return cookie.includes("x-auth-token");
		})
		.split("=")[1];

	console.log(token);
	let resources = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: "",
	};
	return fetch("http://localhost:9000/api/user/logout", resources)
	.then( (res) => {
			// console.log(res.status);
			// console.log(res.body);
			return res.json();
		}
	).then( () => {
		window.location.href = "http://localhost:3000/";
	});
}

function Profile(props) {
			// let cookies = document.cookie.split("; ");
			// if (cookies.length > 1) {
			// 	let login = cookies.find((cookie) => {
			// 		return cookie.includes("x-auth-token");
			// 	});
			// 	let user = cookies.find((cookie) => {
			// 		return cookie.includes("user");
			// 	});
			// 	// console.log("login", login);
			// 	// console.log("user", user);
			// 	login = login.split("=")[1];
			// 	user = JSON.parse(user.split("=")[1]);
			// 	// console.log("login", login);
			// 	// console.log("user", user.username);
			// 	if (user.username && login) {
			// 		// logged in already, no login for you.
			// 		window.location.href = "http://localhost:3000/";
			// 	}
			// }
	return (
		<main className="Profile">
			<img src="./img/profile.png" alt="Profile" />
			<div className="personal-info">
				<p>
					<span>Username: </span>
					{props.username}
				</p>
				<p>
					<span>Gallery: </span>
					{props.numGallery}
				</p>
				<p>
					<button onClick={() => {
						logout().then(data=>{
							console.log(data)
							document.cookie = `x-auth-token=`;
							document.cookie = `user={"username":"","gallery":0}`
							props.updateLogin({
								loggedin: false,
								username: "",
								gallery:0
							})
						})
					}}>Logout</button>
				</p>
			</div>
			<h2>Last 3 images you've shared:</h2>
			<Gallery user={props.user} limit="3" />
		</main>
	);
}

export default Profile;