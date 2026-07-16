const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname, "../uploads");

const postConvertToMp3= (req,res)=>{


    const io = req.app.get("io");

    console.log(req.file);

    if(!req.file){
        return res.status(404).json({
            msg:"no file uploaded"
        })
    }

        const inputpath= req.file.path
        console.log("inputpath =", inputpath);
        console.log("exists =", fs.existsSync(inputpath));
        const filename= path.parse(req.file.filename).name
        const outputfile = `${filename}_converted.mp3`
        const outputPATH = path.join(uploadDir,outputfile)
        console.log(`started converting: ${req.file.originalname}`);






    ffmpeg.ffprobe(

    inputpath,

    (err, metadata) => {

        if (err) {
        return res.status(500).json({
            error: "Cannot read media information"
        });}
         const totalDuration = metadata.format.duration;

        ffmpeg(inputpath)

        .noVideo()

        .audioCodec("libmp3lame")

        .audioBitrate("128k")

        .inputOptions([
            "-err_detect",
            "ignore_err"
        ])

        .toFormat("mp3")
            .on("end", () => {

            console.log("converted successfuly!");

            
            res.download(
                outputPATH,
                `${path.parse(req.file.originalname).name}.mp3`,
                (err) => {

                    if (err) {
                        console.error(err);
                    }

                  
                    // if (fs.existsSync(inputpath)) {
                    //     fs.unlinkSync(inputpath);
                    // }

                    if (fs.existsSync(outputPATH)) {
                        fs.unlinkSync(outputPATH);
                    }

                }
            );


        })
        .on("progress", (progress) => {
             const parts = progress.timemark.split(":");

    const currentSeconds =
        Number(parts[0]) * 3600 +
        Number(parts[1]) * 60 +
        Number(parts[2]);

    const percent = Math.round(
        (currentSeconds / totalDuration) * 100
    );

    console.log(percent);

    io.emit("progress", {
        percent: Math.min(percent, 100)
    });
    
})

       .on("start", (cmd) => {
        // console.log(cmd);
    })
    .on("stderr", (line) => {
        // console.log(line);
    })
        .on("error", (err) => {

            console.error(err);

            if (fs.existsSync(inputpath)) {
                fs.unlinkSync(inputpath);
            }

            return res.status(500).json({
                error: "somthing went wrong while converting"
            });

        })

       
        .save(outputPATH);
    });

   
    }
    module.exports={postConvertToMp3}