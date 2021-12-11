import Gallery from "./Gallery";
import getProfileImg from "../helpers/getProfileImg";

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

function Profile( props ) {
	// console.log( "Profile says props ", props, props.user.id );
	let image = "";
	// image = await getProfileImg( props.user.id );
	// .then( data => {
	// 	// console.log( data );
	// 	image = data;
	// 	return data;
	// });
	// console.log("Profile found a profile image of", image);
	if (!image) {
		image = "./img/profile.png";
	}
	return (
		<main className="Profile">
			<img src={image} alt="ProfilePicture" />
			<div className="personal-info">
				<p>
					<span>Username: </span>
					{props.username}
				</p>
				<p>
					<button
						onClick={() => {
							logout().then((data) => {
								console.log(data);
								document.cookie = `x-auth-token=`;
								document.cookie = `user={"username":"","artCount":0}`;
								props.updateLogin({
									loggedin: false,
									username: "",
									artCount: 0,
								});
							});
						}}
					>
						Logout
					</button>
				</p>
			</div>
			<h2>Last images you've shared:</h2>
			<Gallery user="" limit="3" />
		</main>
	);
}

export default Profile;