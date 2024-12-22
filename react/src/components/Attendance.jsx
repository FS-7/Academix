import axios from "axios";
import { Body } from "../shared/Body.jsx";
import Webcam from "react-webcam";

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
    async function Train(formData) {
        axios({
            method: 'post',
            url: '/Attendance/Train',
            data: {
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <>
        </>
    )
}

function ReadBarcode(){

}

export function AddAttendance(){
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
        </div>

        </>
    )
}