const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const app = express();
app.use(express.static("public"));

const dbUrl = process.env.ATLAS_DBURL;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
const methodOverride = require("method-override");
const { required } = require("joi");

app.use(methodOverride("_method"));
main()
  .then((res) => console.log(res,"connection stablish successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}
app.listen("5173", () => {
  console.log("port is listening on port 5173");
});

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

store.on("error",() => console.log(err));
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 3600 * 1000,
    maxAge: 7 * 24 * 3600 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//show sign up form
// app.get("/signup", (req, res) =>{
//   let message= req.flash("error") ;
//    // Message.flash(message,"Error!") ;
//     res.render("users/signup" , {message : message });
// });

// //handling user sign up
// app.post("/signup", passport.local.signup ,function(req,res){
// app.get("/demouser", async (req, res) => {
//   const fake = new User({
//     email: "abc@gmail.com",
//     username: "abuzar",
//   });
//   const data = await User.register(fake, "abu123");
//   res.send(data);
// });

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});
// console.log(process.env.SECRET)
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something happening wrong" } = err;
  res.render("error.ejs", { message });
});
