const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const db = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Db connected to ${db.connection.host}`);
    }
    catch(e){
        console.error(e);
        process.exit(1);
    }
};

module.exports = connectDB;