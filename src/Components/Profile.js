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
			<h2>Last 3 Gallery on your wall</h2>
			<Gallery user={props.user} limit="3" />
		</main>
	);
}

export default Profile;
