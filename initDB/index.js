const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const dbUrl = process.env.ATLAS_DBURL
// Connect to the database
console.log(dbUrl);
main()
  .then((res) => console.log(res,"connections stablish successfully"))
  .catch((err) => console.log(err));

async function main() {
  const connectionInstance = await mongoose.connect(
    dbUrl
  );
  console.log(
    `MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
  );
}

const categories = ["Trending", "Single Rooms", "Mountain", "Farm", "Castle", "Camping", "Amazing Pools", "Igloos"];


const initDB = async() => {
    await Listing.deleteMany({});
   
    initData.data=initData.data.map((obj)=>{
      const randomIndex = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[randomIndex];
      return {...obj,
        owner:'6602166457ffc8dfc7898f63',
        category: randomCategory}} )

     await Listing.insertMany(initData.data);
};
initDB();
