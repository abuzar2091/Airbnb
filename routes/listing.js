const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControllers=require("../controllers/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const Listing = require("../models/listing.js");
const upload = multer({ storage })

//show all listing route
router.get(
  "/", wrapAsync(listingControllers.index)
);
// create new listing form
router.get("/new", isLoggedIn, listingControllers.renderNewListingForm);
// show indivisual listing
router.get("/search?",listingControllers.searchListing);
router.get("/category?",listingControllers.categoryWiseListing);
router.get("/:id", listingControllers.showListing);
//   submission of a new listing form
router.post( "/",upload.single("listing[image]"),  validateListing, wrapAsync(listingControllers.createListing)
);

// router.post( "/", upload.single("listing[image]"), (req,res)=>{
//      res.send(req.file);
// })


//update listing form
router.get("/:id/edit", isLoggedIn,isOwner, listingControllers.renderEditForm);
// submission of a updated listing form
router.put("/:id",upload.single("listing[image]"), isLoggedIn,isOwner,listingControllers.updateListing );

//delete listing
router.delete("/:id", isLoggedIn,isOwner, listingControllers.deleteListing);
router.delete("/:id",(req,res)=>{
    
})

module.exports = router;    
