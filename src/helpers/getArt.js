function getArt( limit = 0, user = "" ){
	// fetch art from database
	// conditionally limit by user or by limit, or both!
	limit = Number( limit );
	let url = 'http://localhost:9000/api/art/';
	// let userURL = 'http://localhost:9000/api/user/';
	return fetch( url )
	.then( ( res ) => {
		return res.json();
	})
	.then( ( data ) => {
		// console.log( "getArt(got from api/art)", data );
		return data;
		// if ( user !== "") {
		// 	// Filter for username ( if given )
		// 	// this may be dead code as 'gallery for user not implemented'
		// 	console.log( "getArt was told to filter for only", user );
		// 	return fetch(userURL)
		// 		.then((res) => res.json())
		// 		.then((users) => {
		// 			console.log( "getArt.fetched(users)", users);
		// 			let creations = data.map( ( art ) => {
		// 				let name = users.find( ( user ) => {
		// 					console.log( "getArt.testing( user._id === art.creator )", user._id, "===", art.creator );
		// 					return user._id === art.creator;
		// 				})
		// 				console.log( "Get art name:", name );
		// 				// return {
		// 				// 	_id:name.art._id,
		// 				// 	creator:name.art.username,
		// 				// 	description:art.description,
		// 				// 	image:art.image
		// 				// }
		// 				return name;
		// 			});

		// 			// creations.reverse();
		// 			if ( limit > 0 ){
		// 				// only filters and returns if there was a limit
		// 				console.log("getArt(in limit)", users);
		// 				console.log( "User Creations", creations );
		// 				creations = creations.filter( ( art ) => {
		// 					return art.author === user;
		// 				}).slice( 0, limit );
		// 			}
		// 			// if no limit, just return
		// 			return data;
		// 		});
		// }
	})
}
export default getArt;