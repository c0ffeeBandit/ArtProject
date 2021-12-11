function getProfileImg(user = "") {
  console.log( "getProfileImg for", user )
	// let url = "http://localhost:9000/api/art/";
	let userURL = 'http://localhost:9000/api/user/';
	return fetch(userURL)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			// console.log( "getProfileImg(got from api/art)", data );
      for( const person of data ){
        // console.log( "person in data", person );
        // console.log("user", user, "person._id", person._id);
        if( user === person._id ){
          // console.log( "user", user, "=== person._id", person._id );
          return person.image;
        }
      }
      // return false;
		});
}
export default getProfileImg;
