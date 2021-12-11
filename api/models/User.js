const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 11;

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			require: true,
		},
		image: {
			type: String,
		},
		art: [{ type: ObjectId, ref: "Art" }],
	},
	{ timestamps: true }
);

userSchema.pre("save", function (next) {
	if (this.isModified("password")) {
		bcrypt.genSalt(saltRounds, (err, salt) => {
			bcrypt.hash(this.password, salt, (err, hash) => {
				// yum, salted hash ...
				if (err) {
					next(err);
					return;
				}
				this.password = hash;
				next();
			});
		});
		return;
	};
	next();
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
};

module.exports = new Model('User', userSchema);