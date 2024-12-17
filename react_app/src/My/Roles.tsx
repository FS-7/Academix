import axios from "axios";
import { Body } from "../components/Body";
import { useEffect, useState } from "react";
import { inner_form, input_text, outer_div, submit } from "../App";

const menuItems = [
    {path: "/roles/Add", text: "Add Roles", comp: <AddRoles />},
    {path: "/roles/Read", text: "Read Roles", comp: <ReadRoles />},
    {path: "/roles/Update", text: "Update Roles", comp: <UpdateRoles />},
    {path: "/roles/Delete", text: "DeleteRoles", comp: <DeleteRoles />},
    {path: "/roles/SetUserRole", text: "SetUserRole", comp: <SetUserRole />},
    {path: "/roles/RemoveRequests", text: "RemoveRequests", comp: <GetMyRequests />},
    {path: "/roles/GetRequests", text: "GetRequests", comp: <GetRequests />},
    {path: "/roles/GetMyRequests", text: "GetMyRequests", comp: <GetMyRequests />},
]

export function Roles(){
    return(
        <>         
            <Body menuItems={menuItems}/>
        </>
    )
}

function Read_Roles(){
    const [res, setRes] = useState([])
    useEffect(() => {
        setTimeout(() => {
            axios({
                method: 'get',
                url: '/roles/ReadAll'
            })
            .then(
                res => {
                    setRes(res.data)
                }
            )
        }, 1000)
    }, [])
    return res
}

export function AddRoles(){
    function AddRole(formData: any){
        const name=formData.get("name")
        axios({
            method: 'post',
            url: '/roles/Create',
            data: {
                name: name
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }

    return(
        <>
            <div className={'w-full h-full flex flex-col items-center'}>
                <div className={outer_div}>
                <h1>CREATE ROLE:</h1>
                    <form action={AddRole} className={inner_form}>
        
                        <label htmlFor="name">NAME: </label>
                        <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>
        
                        <button type="submit" className={submit}>CREATE</button>
                    </form>
                </div>
                <div className={outer_div}>
                    <ReadRoles />
                </div>
            </div>
        </>
    )
}

export function ReadRoles(){
    const roles = Read_Roles()
    return(
        <>
        <table className="">
            <thead>
                <tr>
                    <th>ROLE NAME</th>
                    <th>DELETE ROLE</th>
                </tr>
            </thead>
            <tbody>
                {
                    roles?.map(
                        items => 
                        <tr key={items["ID"]}>
                            <td>{items["NAME"]}</td>
                            <td>
                                <DeleteRoles id={items["ID"]}/>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </>
    )
}

export function UpdateRoles(){
    const roles = Read_Roles()

    function UpdateRole(formData: any){
        const id = formData.get("id")
        const newid = formData.get("newid")
        const name = formData.get("name")
        axios({
            method: 'post',
            url: '/roles/Update',
            data: {
                id: id,
                newid: newid,
                name: name
            }
        })
        .then(res => {
            alert("Role Updated")
            console.log(res)
        })
    }

    return(
        <>
            <div className={outer_div}>
                <h1>UPDATE ROLE:</h1>
                <form action={UpdateRole} className={inner_form}>
                    <label htmlFor="id">ROLE: </label>
                    <select name="id" id="id" className={input_text} required>
                        {
                            roles?.map(
                                items => 
                                    <option key={items["ID"]} value={items["ID"]}>{items["NAME"]}</option>
                            )
                        }
                    </select>   
                    <label htmlFor="newid">NEW ID: </label>
                    <input type="text" id="newid" name="newid" placeholder="New Id" className={input_text}></input>
        
                    <label htmlFor="name">NAME: </label>
                    <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>
        
                    <button type="submit" className={submit}>UPDATE ROLES</button>
                </form>
            </div>
        </>
    )
}

export function DeleteRoles(props: any){
    function DeleteRole(formData: any){
        const id = formData.get("id")
        axios({
            method: 'post',
            url: '/roles/Delete',
            data: {
                id: id
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <>
        <form action={DeleteRole} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id} className={submit}>Delete</button>
        </form>
        </>
    )
}

export function SetUserRole(){
    function RequestRoles(formData: any){
        const list = formData.get("list")
        const approver = formData.get("approver")
        axios({
            method: 'post',
            url: '/roles/CreateRequest',
            data: {
                list: list,
                approver: approver
            }
        })
        .then(res => {
            console.log(res)
        })
    }
    const roles = Read_Roles()
    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
            <h1>GET PERMISSIONS:</h1>
                <form action={RequestRoles} className={inner_form}>
                    <label htmlFor="id">ROLE: </label>
                    <select name="id" id="id">
                        {
                            roles?.map(
                                items => <option key={items["ID"]} value={items["ID"]}>{items["NAME"]}</option>
                            )
                        }
                    </select>
                    
                    <label htmlFor="approver">APPROVER: </label>
                    <input type="approver" name="approver" placeholder="Approver" id="approver" className={input_text} />
                    <button type="submit" className={submit}>CREATE</button>
                </form>
            </div>
            <div>
                <MyRoles />
            </div>
        </div>
        </>
    )
}

export function MyRoles(){
    const [myroles, setRoles] = useState([])

    function MyRole(){
        useEffect(() => {
            setTimeout(() => {
                axios({
                    method: 'get',
                    url: '/roles/MyRoles',
                    data: {
                    }
                })
                .then(res => {
                    setRoles(sr => sr = res.data)
                })
            }, 1000)
        }, [])
    }
    MyRole()
    return(
        <>
        <table>
            <thead>
                <tr>
                    <th>NAME: </th>
                    <th>REMOVE: </th>
                </tr>
            </thead>
            <tbody>
                {
                    myroles?.map(
                        items => 
                        <tr key={items["ID"]}>
                            <td>{items["NAME"]}</td>
                            <td>
                                <RemoveMyRoles id={items["ID"]}/>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </>
    )
}

export function RemoveMyRoles(props: any){
    function RemoveMyRole(formData: any){
        const id = formData.get("id")
        axios({
            method: 'post',
            url: '/roles/RemoveMyRole',
            data: {
                id: id
            }
        })
        .then(res => {
            alert("Role Removed")
            console.log(res)
        })
    }
    return(
        <>
        <form action={RemoveMyRole} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}><img></img></button>
        </form>
        </>
    )
}

export function GetRequests(){
    const [r, setReq] = useState([]);
    function GetReq(){
        useEffect(()=>{
            setTimeout(() => {
                axios({
                    method: 'get',
                    url: '/roles/GetRequest',
                    data: {}
                })
                .then(res => {
                    if(res.status == 200)
                        setReq(r => r = res.data)
                })
            }, 1000)
        }, [])
    }
    GetReq()        

    return(
        <>
        <table>
            <thead>
                <tr>
                    <td>User</td>
                    <td>Role Name</td>
                    <td>Approve</td>
                    <td>Deny</td>
                </tr>
            </thead>
            <tbody>
                {
                    r?.map(
                        (items) => 
                            <tr key={items["ID"]}>
                                <td>{items["USER"]}</td>
                                <td>{items["ROLE"]}</td>
                                <td>{<Approve id={items["ID"]}/>}</td>
                                <td>{<Deny id={items["ID"]} />}</td>
                            </tr>
                    )
                }
            </tbody>
        </table>
        </>
    )
}

export function GetMyRequests(){
    const [myreq, setMyReq] = useState([]);
    
    function GetMyReq(){
        useEffect(() => {
            setTimeout(() => {
                axios({
                    method: 'get',
                    url: '/roles/GetMyRequest',
                    data: {
                    }
                })
                .then(res => {
                    setMyReq(myreq => myreq = res.data)
                    console.log(res)
                })
            }, 1000)
        }, [])
    }
    GetMyReq()
    return(
        <>
        <table>
            <thead>
                <tr>
                    <td>ROLE: </td>
                    <td>APPROVER: </td>
                </tr>
            </thead>
            <tbody>
                {
                    myreq?.map(
                        (items)=>
                            <tr key={items["ID"]}>
                                <td>{items["ROLE"]}</td>
                                <td>{items["APPROVER"]}</td>
                                <td>{<RemoveRequest id={items["ID"]} /> }</td>
                            </tr>
                    )
                }
                
            </tbody>
        </table>
        </>
    )
}

export function RemoveRequest(props: any){
    
    function RemoveReq(formData: any){
        const id = formData.get("id")
        axios({
            method: 'post',
            url: '/roles/RemoveRequest',
            data: {
                id: id
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <>
        <form action={RemoveReq} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}><img></img></button>
        </form>
        </>
    )
}

export function Approve(props: any){
    function App(formData: any){
        const id = formData.get("id")
        axios({
            method: 'post',
            url: '/roles/Approve',
            data: {
                id: id
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <>
        <form action={App} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}><img></img></button>
        </form>
        </>
    )
}

export function Deny(props: any){
    function Den(formData: any){
        const id = formData.get("id")
        axios({
            method: 'post',
            url: '/roles/Deny',
            data: {
                id: id
            }
        })
        .then(res => {
            alert()
            console.log(res)
        })
    }
    return(
        <>
        <form action={Den} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}><img></img></button>
        </form>
        </>
    )
}
