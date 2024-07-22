const { cloudinary } = require("../cloudConfig");
const Listing = require("../models/listing");

module.exports.index = async (req, res, next) => {
  const listings = await Listing.find({});
  res.render("listings/index.ejs", { listings });
};
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  console.log(listing);
  if (!listing) {
    req.flash("error", "Listing you are Requesting does not exist!");
    res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.renderNewListingForm = (req, res) => {
  res.render("listings/new.ejs");
};
module.exports.createListing = async (req, res, next) => {
  const url = req.file.path;
  const filename = req.file.filename;
  const newlisting = new Listing(req.body.listing);
  console.log(newlisting);
  newlisting.owner = req.user._id;
  newlisting.image = { url, filename };
  await newlisting.save();
  req.flash("success", "New Listing Created!");
  res.redirect(`/listings`);
};
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you are Requesting does not exist!");
    res.redirect("/listings");
  }
  let originalUrl = listing.image.url;
  originalUrl = originalUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing, originalUrl });
};
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const updatedlisting = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    updatedlisting.image = { url, filename };
    await updatedlisting.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  let imageUrl = listing.image.url;
  const url = imageUrl.split("/");
  const publicId = url[url.length - 2] + "/" + url[url.length - 1].slice(0, -4);

   await cloudinary.uploader.destroy(publicId).then((res)=>console.log(res));
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect(`/listings`);

  
};

module.exports.searchListing = async (req, res) => {
  let { destination } = req.query;
  destination = destination
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  let listings = await Listing.find({ country: destination });
  if (!listings.length) {
    req.flash(
      "error",
      "Requested Destination is not available, Search Right Destination"
    );
    return res.redirect("/listings");
  }
  res.render("listings/search.ejs", { listings });
};
module.exports.categoryWiseListing = async (req, res) => {
  let { category } = req.query;
  
  let listings = category!==""?await Listing.find({ category }):await Listing.find({ });
  if (!listings.length) {
    req.flash("error", "Now, No Listing is Available of this Category");
    return res.redirect("/listings");
  }
  //res.send(listings)
  res.render("listings/search.ejs", { listings });
};
