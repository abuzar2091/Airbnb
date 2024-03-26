const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
const reviewControllers=require("../controllers/review.js")

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewControllers.createReview)
);

router.delete("/:reviewId", isLoggedIn, isAuthor, reviewControllers.deletingReview);

module.exports = router;
