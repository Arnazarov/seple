import mongoose from "mongoose";
import colors from "colors";

const mongoConnect = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected at ${conn.connection.host}`.blue.underline);
        
    } catch (error) {
        console.log(`Error ${error.message}`.red.underline);
    }
}

export default mongoConnect;