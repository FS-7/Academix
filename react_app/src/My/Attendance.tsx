import axios from "axios";
import { Body } from "../components/Body";

const menuItems = [
    {path: '/attendance/Add', text: "Attendance", comp: <AddAttendance/>},
    {path: '/attendance/Train', text: "Train", comp: <TrainFR/> }
]

export function Attendance(){
    return(
        <>
        <Body menuItems={menuItems}/>
        </>
    )
}

export function TrainFR(){
    async function Train(formData: any) {
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
    async function POSTAttendance(formData: any) {
        axios({
            method: 'post',
            url: '/Attendance/Add',
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
        {
            //CAPTURE BARCODE
            //IDENTIFY PERSON
            //CAPTURE FACE
            //OUTPUT
        }
        </>
    )
}