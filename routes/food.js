///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const bcrypt = require("bcryptjs");
const User = require("../models/User")
const auth = require("./authmiddleware")
///////////////////////////////
// Router Specific Middleware
////////////////////////////////
// Middleware to check if userId is in sessions and create req.user
router.use(auth)
// Auth Middleware Function to check if user authorized for route


///////////////////////////////
// Router Routes
////////////////////////////////
router.get("/user", async (req, res) => {
   const user =await User.findById(req.session.user.id)
   const foods = user.dish.push(req.body)
   user.save()
   res.redirect("back")
})


// Export Router
////////////////////////////////
module.exports = router