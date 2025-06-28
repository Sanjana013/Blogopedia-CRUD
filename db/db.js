const mongoose = require("mongoose")

const connection = async()=> {
    // console.log("db connected")
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("MongoDB connected Successfully"))
    .catch(()=> console.log("Error Occured while connecting to DB"))
}

module.exports = connection