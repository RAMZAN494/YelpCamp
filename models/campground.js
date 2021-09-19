const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

// https://res.cloudinary.com/dgzmpqtvb/image/upload/w_300/v1631253151/YelpCamp/mk01qhadjnrfa0ljkasb.jpg

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const CampSchema = new Schema(
  {
    title: String,
    imgs: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    price: Number,
    description: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

CampSchema.virtual("properties.popUpMarkup").get(function () {
  return `<h5><a href="/campgrounds/${
    this._id
  }">${this.title}</a></h5><p>${this.description.substring(0, 40)}...</p>`;
});

CampSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampSchema);
