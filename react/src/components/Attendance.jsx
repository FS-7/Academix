import axios from "axios";
import { Body } from "../shared/Body.jsx";
import Webcam from "react-webcam";
import { inner_form, input_text, outer_div, submit } from "../main.jsx";

const menuItems = [
    {path: '/attendance/Add', text: "Attendance"},
    {path: '/attendance/Train', text: "Train"}
]

export function Attendance(){
    return(
        <>
        <Body menuItems={menuItems}/>
        </>
    )
}

export function TrainFR(){
    async function Train(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const image = formData.get("image")
        console.log(image)
        axios({
            method: 'post',
            url: '/attendance/train',
            data: {
                image: image
            },
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => {
            if(res.status == 200)
                alert("Image recieved Training")
            else
                alert("Error")
        })
    }
    return(
        <>
        <div className={outer_div}>
            <h1>REGISTER ATTENDANCE:</h1>
            <form onSubmit={Train} className={inner_form}>           
                <label htmlFor="image">IMAGE: </label>
                <input type="file" id="image" name="image" ></input>
        
                <button type="submit" className={submit}>REGISTER</button>
            </form>
        </div>
        </>
    )
}

export function AddAttendance(){
    async function Add(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const subject = formData.get("subject")
        const image = formData.get("image")
        axios({
            method: 'post',
            url: '/attendance/add',
            data: {
                subject: subject,
                image: image
            },
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => {
            if(res.status == 200){
                alert("Attendance Added Successfully")
            }
            else
                alert("Error")
        })
    }
    
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    return(
        <>
        <div className="flex flex-col justify-center items-center">
            <Webcam
                audio={false}
                height={720}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            >
            {({ getScreenshot }) => (
                <button
                    onClick={() => {
                    const image = getScreenshot()
                    }}
                >
                    Capture photo
                </button>
                )}
                
            </Webcam>
            <input type="file"></input>
        
            <div className={outer_div}>
                <h1>REGISTER ATTENDANCE:</h1>
                <form onSubmit={Add} className={inner_form}>
                    <input type="file" id="image" name="image" ></input>
            
                    <button type="submit" className={submit}>REGISTER</button>
                </form>
            </div>
        </div>
        </>
    )
}