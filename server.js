/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // In order to connect to Database
const express = require('express') // import express
const morgan = require('morgan') //import morgan
const methodOverride = require('method-override')
const path = require('path')
const NewGameRouter = require("./controllers/juego")
// const ElementRouter = require("./controllers/intentory")
const UserRouter = require("./controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Template Engine
/////////////////////////////////////////////////
const app = require('liquid-express-views')(express(), {
	root: [path.resolve(__dirname, 'views/')],
})

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan('tiny')) //logging
app.use(methodOverride('_method')) // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })) // parse urlencoded request bodies
app.use(express.static('public')) // serve files from public statically
// middleware to setup session
app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({ mongoUrl: process.env.ARIEL_PROGRAMERS_CLUB_MONGODB_URI }),
		saveUninitialized: true,
		resave: false,
	})
)

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use('/juegos', NewGameRouter) // send all "/avatar" routes to the avatar router
// app.use('/elements', ElementRouter) // send all "/element" routes to the element router
app.use('/user', UserRouter) // send all "/user" routes to the user router



/// Root Route ///

app.get('/', (req, res) => {
	res.render('signup/login.liquid')
})


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
// const port = 3000
// //app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
// app.listen((process.env.PORT || port), () => console.log(`Now Listening on port ${port}`))

app.listen(process.env.PORT || 3000, function () {
	console.log(
		'Express server listening on port %d in %s mode',
		this.address().port,
		app.settings.env
	)
})