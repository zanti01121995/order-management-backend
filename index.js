import express from "express";
import cors from "cors"
import dotenv from 'dotenv';
import dbConnect from "./db_utils/mongoose.js";
import authController from "./controlers/authController.js";
import productController from "./controlers/productController.js";
import uploadController from "./controlers/uploadControllers.js";

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT;
app.use(express.json());
dbConnect();
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static('public/images'))
app.use('/auth', authController);
app.use('/product', productController);
app.use('/upload', uploadController);
app.listen(port, () => console.log('server started successfully on port ' + port))

