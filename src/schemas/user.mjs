import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	email: {
		type: mongoose.Schema.Types.String,
		required: true,
		unique: true,
	},
	password: {
		type: mongoose.Schema.Types.String,
		required: true,
	},
	location: {
		type: mongoose.Schema.Types.String,
		required: false,

	},
	occupation: {
		type: mongoose.Schema.Types.String,
		required: false,

	}
});

export const User = mongoose.model("User", UserSchema);
