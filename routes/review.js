const express = require("express");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");
const { reviewSchema } = require("../schema");

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const Campground = require("../models/campground");
const Review = require("../models/review");
const { authorize } = require("passport");
const reviews = require("../controllers/reviews");
const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.addReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
