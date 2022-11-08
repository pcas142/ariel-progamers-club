/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require('./connection') // imported from connections' export

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////

// const Schema = mongoose.Schema
// const model = mongoose.model
// is equal to :

// This short hand is called destructuring and it's creating two variables to pull schema and model from mongoose at the same time.
const { Schema, model } = mongoose

// make Avatars Schema
const juegosSchema = new Schema({
	station: { type: Number, required: true, min: 1, max: 7 },
	duration: { type: Number, required: true, min: 30, max: 240 },
	price: { type: Number, required: true },
	date: {type: Date},
	dateString: {type: String},
	timeString: {type: String}
},
{
	timestamps: true
}

)

// make model
const Juego = model('juego', juegosSchema)


///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////

module.exports = Juego