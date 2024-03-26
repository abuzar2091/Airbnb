const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview=async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    newReview.author = res.locals.currUser._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log(newReview);
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
  }
  module.exports.deletingReview=async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  }