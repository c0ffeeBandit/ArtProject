function logoutHelper(){
		// console.log( data );
		let resources = {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
            //   "Authorization": "NO"
			},
			
		  }
		return fetch("http://localhost:9000/api/user/logout", resources ).then( ( res ) => {
			console.log( res.status );
			return res.json();
		})
}
export default logoutHelper;