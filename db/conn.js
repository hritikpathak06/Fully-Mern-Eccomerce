import mongoose from "mongoose";
import colors from "colors"

const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`Connected to mongoDB Database ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Errro in Mongodb ${error}`.bgRed.white);
    }
}

export default connectDb;
