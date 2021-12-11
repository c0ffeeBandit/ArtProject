const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const secret = "TheseAreNotTheDroidsYouAreLookingFor...MoveAlong";

module.exports = (app) => {
	app.use(cors());
	app.use(bodyParser.json({ limit: "5mb" }));
	app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
	app.use(cookieParser(secret));
};
