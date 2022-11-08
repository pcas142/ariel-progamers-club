////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const Juego = require('../models/juego')

/////////////////////////////////////////
// Create Router (This used to be app.path)
/////////////////////////////////////////
const router = express.Router(); // helps connect each of our paths to our router.

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////

// AUTHORIZATION Middleware   // 
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user");
  }
});

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

/// AVATARS Index route ///   Starting Page/home page for Avatars
router.get('/todosjuegos', async (req, res) => {
	const juegos = await Juego.find({})
	// find all the juegos
	res.render('../views/juegos/index.liquid', { juegos })
})

// // USER - CREATE YOUR OWN AVATAR index route // this shows the logged in user's created juego
// router.get('/my-juegos', async (req, res) => {
// 	const juegos = await Juego.find({ username: req.session.username })
// 	// find all the juegos
// 	res.render('../views/juegos/index-user-juegos.liquid', { juegos })
// })

// AVATARS show route for last 10 juegos
router.get('/juegosdehoy', (req, res) => {
	today = new Date()
	var todaysDate = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
	// find the particular element from the database
	Juego.find({dateString: {$eq: todaysDate}})
		.then((juegos) => {
			// render the template with the data from the database
			res.render('./juegos/index.liquid', { juegos })
		})
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// NEW route  MY FAVORITE PART -TAKES YOU TO THE PAGE WHERE YOU CREATE NEW AVATAR
router.get('/nuevo', (req, res) => {
	res.render('../views/juegos/new.liquid');
})


// CREATE route //  MY FAVORITE PART - THIS CREATES -THE ACTION- OF POSTING THE CREATED AVATAR TO THE DATABASE WHICH IS THEN SHOWN TO THE SHOW PAGE
router.post('/', (req, res) => {
	today = new Date()
	var todaysDate = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes()

	req.body.date = today
	req.body.dateString = todaysDate
	req.body.timeString = time

	// create the new juego
	Juego.create(req.body)
		.then((juego) => {
			// redirect user to index page if successfully created item
			res.redirect('/juegos/juegosdehoy')
		})
		// send error as json
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// // SHOW IS THE ROUTE FOR THE AVATARS THE USER CREATED - WHERE THE LINK TAKES YOU
// router.get('/my-juegos/:id', (req, res) => {
// 	// get the id from params
// 	const id = req.params.id

// 	// find the particular element from the database
// 	Juego.findById(id)
// 		.then((juego) => {
// 			// render the template with the data from the database
// 			res.render('./juegos/show-user-juegos.liquid', { juego })
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 			res.json({ error })
// 		})
// })


////// EDIT ROUTE/////

// router.get("/my-juegos/:id/edit", (req, res) => {
//   // get the id from params
//   const id = req.params.id;
//   // get the fruit from the database
//   Juego.findById(id)
//     .then((juegos) => {
//       // render edit page and send fruit data
//       res.render('./juegos/edit.liquid', { juegos })
//     })
//     // send error as json
//     .catch((error) => {
//       console.log(error);
//       res.json({ error });
//     });
// });

// //update route
// router.put('/my-juegos/:id', (req, res) => {
// 	// get the id from params
// 	const id = req.params.id

// 	// update the juego
// 	Juego.findByIdAndUpdate(id, req.body, { new: true })
// 		.then((juego) => {
// 			// redirect to main page after updating
// 			res.redirect('/')
// 		})
// 		// send error as json
// 		.catch((error) => {
// 			console.log(error)
// 			res.json({ error })
// 		})
// })

// //destroy route
// router.delete('/my-juegos/:id', (req, res) => {
// 	// get the id from params
// 	const id = req.params.id
// 	// delete the juego
// 	Juego.findByIdAndRemove(id)
// 		.then((juegos) => {
// 			// redirect to main page after deleting
// 			res.redirect('/juegos')
// 		})
// 		// send error as json
// 		.catch((error) => {
// 			console.log(error)
// 			res.json({ error })
// 		})
// })

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router
