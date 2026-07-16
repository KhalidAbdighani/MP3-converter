"use client"
import "./mp3.css"
import React, { useState, useRef,useEffect } from 'react';
import { BsUpload } from "react-icons/bs";
import { io } from "socket.io-client";
import { FaCheck } from "react-icons/fa6";








export default function Home() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
const [end,setend]=useState(false)
const [copy, setcopy] =useState(null)


  const handleFileChange = (e) => {
    
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      
      if (selectedFile.type.startsWith('video/') || selectedFile.type.startsWith('audio/')) {
        setFile(selectedFile);
        setcopy(selectedFile)
        setend(false)
      } else {
        alert("PLEASE CHOOSE A FILE");
      }
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

 

  const convert = async ()=>{
    
  
    setProgress(0);
    setIsConverting(true);
     const formdata=new FormData()

  formdata.append("file", file)

  try{
    const response = await fetch("http://localhost:5000/mp3",
      {
        method:"POST",
        credentials:"include",
        body:formdata
      }

      
    )
    console.log(response.status);
console.log(response.headers.get("content-length"));
console.log(response.headers.get("content-disposition"));
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

const a = document.createElement("a");

a.href = url;
a.download = file.name.replace(/\.[^/.]+$/, ".mp3");

a.click();

URL.revokeObjectURL(url);


  } catch(err){
    console.log(err)
  } finally{
    setIsConverting(false);
  }
    
  
        setend(true)
        
        setFile(null)
        
        
  }

  useEffect(() => {

    const socket = io("http://localhost:5000");

    socket.on("progress", (data) => {

        setProgress(data.percent);

    });

    return () => {
        socket.disconnect();
    };

}, []);
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <div className="Greenbaba">
       
          <div className="H1">
            <h1>MP3</h1>
            <h2>Converter</h2>
          </div>

       

        </div>

        <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>

            <div className="upload">
              <div style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <input onChange={handleFileChange} ref={fileInputRef} style={{display:"none"}} type="file" id="file"></input>
               <label onClick={handleBoxClick} id="fileL" htmlFor="file" style={{cursor:"pointer"}}> <BsUpload/> UPLOAD FILE</label>
              
              <div id="hvr" style={{height:"1px", background:"black"}}></div>

              </div>
             
              

              {file &&(
                !isConverting?  (
                  <div style={{display:"flex" , flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                  <p  style={{fontSize:"13px"}}>convert {file.name} to mp3</p>
                  <button onClick={convert} >Click to start</button>
                </div>
                ) :

                <div>
                   <p>CONVERTING --(<span style={{color:"rgb(0, 149, 149)"}}> {file.name}</span>)-- to mp3</p>
                    <div style={{width:"100%", height:"2px", background:"#ddd", borderRadius:"15px", overflow:"hidden"}}>
                    <div style={{width:`${progress}%`, height:"100%", background:"rgb(43, 67, 17)", transition:"width .2s linear"}}></div>
                    </div>

                    <p>{progress}%</p>
                 
                </div>
              
              )}

              {copy && (
                end && (
                     <p><FaCheck/> (<span style={{color:"rgb(0, 149, 149)"}}> {copy.name}</span>)-- to mp3</p>
                )
                 

                
                

                
              )}

              
            </div>


        </div>
       


    </div>
   
  );
}
