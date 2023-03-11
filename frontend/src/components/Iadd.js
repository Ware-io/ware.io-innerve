import NavBar from "./NavBar";
import React, { useState, useRef } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


export default function Iadd () {
    const [streaming, setStreaming] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [responseText, setResponseText] = useState("");
    const videoRef = useRef(null);

    const handleStream = () => {
        if (!streaming) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    setStreaming(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            videoRef.current.srcObject.getTracks().forEach((track) => {
                track.stop();
            });
            videoRef.current.srcObject = null;
            setStreaming(false);
        }
    };

    const handleDetect = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result.split(",")[1];
                axios({
                    method: "POST",
                    url: "https://detect.roboflow.com/packages-v4/6",
                    params: {
                        api_key: "IFmx3SDfEVQtxtEdL8uy"
                    },
                    data: base64data,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                    .then(function(response) {
                        console.log(response.data);
                        setResponseText(JSON.stringify(response.data));
                        handleStream();
                    })
                    .catch(function(error) {
                        console.log(error.message);
                    });
            };
        }, "image/jpeg", 0.7);
    };

    return (
        <>
            <NavBar />
            <div>
                <video ref={videoRef} />
                <button onClick={handleStream}>
                    {streaming ? "Stop" : "Start"} Streaming
                </button>
                <button onClick={handleDetect}>Detect Objects</button>
                {responseText && (
                    <div>
                        <p>Response:</p>
                        <h4>{responseText}</h4>
                    </div>
                )}
            </div>

            {responseText && responseText.hasOwnProperty("image") && (
  <Table striped bordered hover variant="dark" responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Time</th>
        <th>Img_Width</th>
        <th>Img_Height</th>
        <th>Package_Width</th>
        <th>Package_Height</th>
        <th>Confidence</th>
        <th>Class</th>
      </tr>
    </thead>
    <tbody>
      {responseText.predictions.map((prediction, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{responseText.time}</td>
          <td>{responseText.image.width}</td>
          <td>{responseText.image.height}</td>
          <td>{responseText.prediction.width}</td>
          <td>{responseText.prediction.height}</td>
          <td>{responseText.prediction.confidence}</td>
          <td>{responseText.prediction.class}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)}

            
            
        </>
    );
}
