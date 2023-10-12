import express  from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./db/conn.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import path from "path";

// config env
dotenv.config();

// db configg
connectDb();


// rest object
const app = express();


// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')));


// routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/product",productRoute);



// rest api
app.use('*',function(req,res){
res.sendFile(path.join(__dirname,'./client/build/index.html'));
})


// port
const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`.bgCyan.white)
})