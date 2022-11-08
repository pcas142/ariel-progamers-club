//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection");

////////////////////////////////////////////////
// Define Model   THIS USER MODEL IS STRICTLY FOR AUTHENTICATION FOR USER SIGNUP AND LOGIN
//        THESE ARE THE FIELDS TO TYPE THINGS INTO
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
    },
});

// make User model
const User = model("User", userSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = User;