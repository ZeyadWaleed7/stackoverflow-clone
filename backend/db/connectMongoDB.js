import mongoose from "mongoose";

const connectMongodb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${con.connection.host}`);
    }

    catch (error) {
        console.error(`Error connecting to mongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectMongodb;