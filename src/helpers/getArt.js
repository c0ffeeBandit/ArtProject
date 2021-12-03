function getArt( limit = 0, user = "" ){
	limit = Number( limit );
	let url = 'http://localhost:9000/api/art/';
	let userURL = 'http://localhost:9000/api/user/';
	return fetch( url )
	.then( ( res ) => {
		return res.json();
	})
	.then( ( data ) => {
		return fetch( userURL )
		.then( ( res ) => res.json() )
		.then( ( users ) => {
			let creations = data.map( ( art ) => {
				let name = users.find( ( user ) => {
					return user._id === art.creator;
				})
				return {
					id:art._id,
					creator:name.username,
					description:art.description
				}
			});
			// creations.reverse();
			if( limit > 0 ){ // only filters and returns if there was a limit
				console.log( "User Creations", creations );
				console.log( "Username", user );
				creations = creations.filter( ( art ) => {
					return art.author === user; 
				}).slice( 0, limit );
			}
			// if no limit, just return
			return creations; 
		});
	})
}
export default getArt;