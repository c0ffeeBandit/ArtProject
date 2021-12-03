const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const ArtSchema = new Schema(
	{
		creator: {
			type: ObjectId,
			ref: "User",
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		name: {
			type: String,
		},
		description: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = new Model( 'Art', ArtSchema );