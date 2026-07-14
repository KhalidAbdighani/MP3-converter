const {upload} = require("../config/multer");
const express = require("express")
const {postConvertToMp3}=require("../controllers/mp3-controller")
const router= express.Router()

 router.post("/mp3", upload.single("file"), postConvertToMp3)

 module.exports={router}
