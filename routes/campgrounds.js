const express = require("express");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const { isLoggedIn } = require("../middleware");
const { validateCampgropund } = require("../middleware");
const { isAuthor } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const { storage } = require("../cloudinary");
const multer = require("multer");

const upload = multer({ storage });
const router = express.Router();

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("img"),
    validateCampgropund,
    catchAsync(campgrounds.addCampground)
  );
// .post(upload.array("img"), (req, res) => {
//   console.log(req.body, req.files);
//   res.send("It Worked");
// });
router.get("/new", isLoggedIn, campgrounds.renderForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("img"),
    validateCampgropund,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.showEditForm)
);

module.exports = router;
