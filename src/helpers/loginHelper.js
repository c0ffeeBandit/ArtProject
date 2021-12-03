function loginHelper(state) {
	let data = JSON.stringify(state);
	console.log( "Login Helper data:", data );
	let resources = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: data,
	};
	return fetch("http://localhost:9000/api/user/login", resources )
	.then( ( res ) => {
		let result = res.json();
			console.log( "Login helper result:", result );
			return result;
		}
	);
};

export default loginHelper;