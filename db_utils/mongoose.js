import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();
//
const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cloudMongoUrl = `mongodb+srv://${userName}:${password}@cluster0.jt1egxl.mongodb.net/?retryWrites=true&w=majority`

const dbConnect = async () => {
    try {
        await mongoose.connect(cloudMongoUrl, {
            family: 4,
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default dbConnect;
