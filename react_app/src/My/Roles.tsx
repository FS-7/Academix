import axios from "axios";
import { Body } from "../components/Body";

export function Roles(){
    return(
        <>         
            <Body menuItems={null}/>
        </>
    )
}

export function AddRoles(formData: any){
    function AddRole(){
        axios({
            method: 'post',
            url: '/Roles/Create',
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

export function ReadRoles(){
    function readRoles(){
        axios({
            method: 'post',
            url: '/Roles/Read',
            data: {
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <></>
    )
}

export function UpdateRoles(formData: any){
    function UpdateRole(){
        axios({
            method: 'post',
            url: '/Roles/Update',
            data: {
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <></>
    )
}

export function DeleteRoles(formData: any){
    function DeleteRole(){
        axios({
            method: 'post',
            url: '/Roles/Delete',
            data: {
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <></>
    )
}

export function RequestUserRole(formData: any){
    function RequestRoles(){
        axios({
            method: 'post',
            url: '/Roles/CreateRequest',
            data: {
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <></>
    )
}

export function GetRequests(formData: any){
    function GetReq(){
        axios({
            method: 'post',
            url: '/Roles/GetMyRequest',
            data: {
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <></>
    )
}

export function GetMyRequests(formData: any){
    function GetMyReq(){
        axios({
            method: 'post',
            url: '/Roles/GetRequest',
            data: {
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <></>
    )
}

export function RemoveRequest(formData: any){
    function RemoveReq(){
        axios({
            method: 'post',
            url: '/Roles/RemoveRequest',
            data: {
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <></>
    )
}

export function Approve(formData: any){
    function App(){
        axios({
            method: 'post',
            url: '/Roles/Approve',
            data: {
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <></>
    )
}

export function Deny(formData: any){
    function Den(){
        axios({
            method: 'post',
            url: '/Roles/Deny',
            data: {
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <></>
    )
}
