const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
// Connect to the database

main()
  .then((res) => console.log("connection stablish successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/AirBnb");
}

const categories = ["Trending", "Single Rooms", "Mountain", "Farm", "Castle", "Camping", "Amazing Pools", "Igloos"];


const initDB = async() => {
    await Listing.deleteMany({});
   
    initData.data=initData.data.map((obj)=>{
      const randomIndex = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[randomIndex];
      return {...obj,
        owner:'65fe7cde6aae9d4f7d6b8e85',
        category: randomCategory}} )

     await Listing.insertMany(initData.data);
};
initDB();
