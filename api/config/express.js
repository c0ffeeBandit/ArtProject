const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const secret = "TheseAreNotTheDroidsYouAreLookingFor...MoveAlong";

module.exports = (app) => {
	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser(secret));
};
