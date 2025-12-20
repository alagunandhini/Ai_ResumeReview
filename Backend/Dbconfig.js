const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/interviewDB")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Error:", err));
};

module.exports = connectDB;
