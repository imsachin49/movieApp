import mongoose, { Mongoose } from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error In Connecting to DB"+error);
    }
}

export default connectDB;
