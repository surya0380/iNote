const mongoose = require("mongoose");
const mongoURI= "mongodb://localhost:27017/inote?directConnection=true"

const connectTomongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connect to mongoose successfully")
    })
}

module.exports= connectTomongo;