const express = require("express")
require('dotenv').config();
const cors = require("cors")
const ffmpeg= require("fluent-ffmpeg")
const morgan= require("morgan")
const multer = require("multer")

const app = express()





app.use(morgan("dev")); 
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cors({origin: process.env.CLIENT_PORT ,credentials: true,}));
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("outputs")) fs.mkdirSync("outputs");


const PORT = process.env.PORT; 
app.listen(PORT,()=>{
    console.log("Concetted to the server successfully!")
})