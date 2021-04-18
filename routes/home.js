///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
///////////////////////////////
// Router Specific Middleware
////////////////////////////////
// Middleware to check if userId is in sessions and create req.user
const addUserToRequest = async (req, res, next) => {
  if (req.session.userId) {
    req.user = await User.findById(req.session.userId);
    next();
  } else {
    next();
  }
};
// Auth Middleware Function to check if user authorized for route
const isAuthorized = (req, res, next) => {
  // check if user session property exists, if not redirect back to login page
  if (req.user) {
    //if user exists, wave them by to go to route handler
    next();
  } else {
    //redirect the not logged in user
    res.redirect("/auth/login");
  }
};

router.use(addUserToRequest);
///////////////////////////////
// Router Routes
////////////////////////////////
router.get("/", (req, res) => {
  res.render("home");
});

//Sign-up route

router.get("/auth/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/auth/signup", async (req, res) => {
  try {
    //generate salt for hashing
    const salt = await bcrypt.genSalt(10);
    //hash the password
    req.body.password = await bcrypt.hash(req.body.password, salt);
    //Create the User
    await User.create(req.body);
    //Redirect to login page
    res.redirect("/auth/login");
  } catch (error) {
    res.json(error);
  }
});

//Login route
router.get("/auth/login", (req, res) => {
  res.render("auth/login");
});

router.post("/auth/login", async (req, res) => {
  try {
    //check if the user exists (make sure to use findOne not find)
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (user) {
      // check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // create user session property
        req.session.userId = user._id;
        //redirect to /goals
        res.redirect("/user");
      } else {
        // send error is password doesn't match
        res.json({ error: "passwords don't match" });
      }
    } else {
      // send error if user doesn't exist
      res.json({ error: "User does not exist" });
    }
  } catch (error) {
    res.json(error);
  }
});

////////////////LOGOUT ROUT
router.get("/auth/logout", (req, res) => {
  //remove the userId property from the session
  req.session.userId = null;
  res.redirect("/");
});

//////////////////USER PAGE THAT FIRST GETS THE USER BY ITS ID AND RENDERS A USER PAGE WITH ITS DISHES

router.get("/user", async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("user", {
    foods: user.dish,
    user: user,
  });
});

////////////////////ADDS A NEW DISH TO THE USER PAGE

router.post("/user", async (req, res) => {
  const user = await User.findById(req.session.userId);
  // console.log(user);
  const foods = user.dish.push(req.body);
  user.save();
  res.redirect("/user");
});

////////////////////////////////UPDATE ROUTER
router.put("/dish/:dishId", async (req, res) => {
  // find the user
  console.log(req.params.dishId)
  await User.findOneAndUpdate({_id:req.session.userId, 'dish._id': req.params.dishId}, {
    "$set":{"dish.$":req.body}
  });
  res.redirect("/user")
});




//////////////////////////////DELETE ROUTER

router.delete("/dish/:dishId", async (req, res) => {
  const id = req.session.userId;
  const user = await User.findById(id);
  let dishItem = null;
  for (dish of user.dish) {
    if (dish._id == req.params.dishId) {
      dishItem = dish;
    }
  }
 dishItem.remove() //mongoose lets you call a delete method directly on the object
 user.save()
 res.redirect("/user")
});




///////////////SHOW ROUTER WHEN USER SELECTS ON A DISH

router.get("/dish/:dishId", async (req, res) => {
  const user = await User.findById(req.session.userId);

  let dishItem = null;
  for (dish of user.dish) {
    if (dish._id == req.params.dishId) {
      dishItem = dish;
    }
  }

  res.render("dish", {
    food: dishItem,
  });
});

///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router;
