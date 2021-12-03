function sendArt( item, activeUser ) {
	let artURL = "http://localhost:9000/api/art/";
	let userURL = "http://localhost:9000/api/user/";
	return fetch(userURL)
		.then((res) => res.json())
		.then((users) => {
			let user = users.find((user) => {
				return user.username === activeUser.username;
			});
			// console.log(user);
			// console.log(item);
			let data = {
				creator: user._id,
				name: item.name,
				description: item.description,
				image: item.image,
			};
			// console.log(data);
			let resources = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + activeUser.token,
				},
				body: JSON.stringify(data),
			};
			return fetch(artURL, resources).then((res) => res.json());
		});
}
export default sendArt;
