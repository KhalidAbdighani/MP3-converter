const express = require("express")
require('dotenv').config();
const cors = require("cors")
const ffmpeg= require("fluent-ffmpeg")
const morgan= require("morgan")
const path = require('path');
const fs = require('fs');
const http = require("http")
const {Server} = require("socket.io")
const app = express()
const server = http.createServer(app)

const io = new Server(server, { cors: { 
    origin: process.env.CLIENT_PORT,
    credentials:true
}})
app.set("io", io)





const uploadDir = path.join(__dirname, 'uploads');

app.use(morgan("dev")); 
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
console.log(process.env.CLIENT_PORT);
app.use(cors({
    origin: process.env.CLIENT_PORT,
    credentials: true
}));



const {router}= require("./routers/mp3-router")
app.use(router)

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("outputs")) fs.mkdirSync("outputs");

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});




const PORT = process.env.PORT; 
server.listen(PORT,()=>{
    console.log("Concetted to the server successfully!")
})

