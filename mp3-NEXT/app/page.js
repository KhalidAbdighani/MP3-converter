"use client"
import "./mp3.css"
import React, { useState, useRef } from 'react';
import { BsUpload } from "react-icons/bs";







export default function Home() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      
      if (selectedFile.type.startsWith('video/') || selectedFile.type.startsWith('audio/')) {
        setFile(selectedFile);
      } else {
        alert("PLEASE CHOOSE A FILE");
      }
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

 

  const convert = async ()=>{
     const formdata=new FormData()

  formdata.append("file", file)
    const response = await fetch("http://localhost:5000/mp3",
      {
        method:"POST",
        credentials:"include",
        body:formdata
      }
      
    )
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

const a = document.createElement("a");

a.href = url;
a.download = file.name.replace(/\.[^/.]+$/, ".mp3");

a.click();

URL.revokeObjectURL(url);
        
  }
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
             
              <input onChange={handleFileChange} ref={fileInputRef} style={{display:"none"}} type="file" id="file"></input>
               <label onClick={handleBoxClick} id="fileL" htmlFor="file" style={{cursor:"pointer"}}> <BsUpload/> UPLOAD FILE</label>
              
              <div id="hvr" style={{height:"1px", background:"black"}}></div>

              {file && (
                <div style={{display:"flex" , flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                  <p  style={{fontSize:"13px"}}>Converting file to Mp3</p>
                  <button onClick={convert} >Click to start</button>

                </div>
                
                
              )}
            </div>


        </div>
       


    </div>
   
  );
}
