const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 250; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "65fc8f13424c6d98909ac34f",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat, sint? Nostrum exercitationem dolor ut, libero minus deleniti temporibus. Repellendus esse aliquid incidunt molestiae enim architecto exercitationem nam animi laudantium dicta!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude, 
          cities[random1000].latitude
        ]
    },
      images: [
        {
          "url": "https://res.cloudinary.com/dxmskrbmt/image/upload/v1711563780/YelpCamp/ilv4ahzhpbz3ekmwhdhm.jpg",
          "filename": "YelpCamp/ilv4ahzhpbz3ekmwhdhm",
        },
        {
          "url": "https://res.cloudinary.com/dxmskrbmt/image/upload/v1711563781/YelpCamp/qsdtly2teqwwmvkmazmy.jpg",
          "filename": "YelpCamp/qsdtly2teqwwmvkmazmy",
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
