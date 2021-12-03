const router = require('../routes/');

module.exports = ( app ) =>{
	app.use("/api/user", router.user );
	// (GET) /api/user ok!
	// (POST) /api/user/register Fail!
	// (POST) /api/user/login Fail!
	// (POST) /api/user/logout Fail!
	app.use("/api/art", router.art );
	app.use("*", (req, res, next) =>
		res.send("<h1> Something went wrong. Try again. :thumbsup: </h1>")
	);
};