const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedsHelper");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://localhost:27017/CampYelp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfulyy!");
  })
  .catch((err) => {
    console.log("Somethng Went Wrong!");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 50) + 1;
    const camp = new Campground({
      author: "61363e9314d91a2afc02210e",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // img: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat deleniti ",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      imgs: [
        {
          url: "https://res.cloudinary.com/dgzmpqtvb/image/upload/v1631425022/YelpCamp/epxugtpvubuehe22abz3.jpg",
          filename: "YelpCamp/qzswo9iursnskvaqetly",
        },
        {
          url: "https://res.cloudinary.com/dgzmpqtvb/image/upload/v1631425016/YelpCamp/qzswo9iursnskvaqetly.jpg",
          filename: "YelpCamp/epxugtpvubuehe22abz3",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
