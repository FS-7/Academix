import axios from "axios";
import { Body } from "../shared/Body.jsx";
import { useEffect, useState } from "react";
import { inner_form, input_text, outer_div, submit } from "../main.jsx";

const menuItems = [
    {path: "/roles/Add", text: "Add Roles"},
    {path: "/roles/Update", text: "Update Roles"},
    {path: '/roles/permissions/Add', text: "Add Permissions"},
    {path: '/roles/permissions/Bind', text: "Bind Permissions"},
]

export function Roles(){
    return(
        <>         
            <Body menuItems={menuItems}/>
        </>
    )
}

export function Read_Roles(){
    const [res, setRes] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: '/roles/ReadAll'
        })
        .then(
            res => {
                if(Array.isArray(res.data))
                    setRes(r => r = res.data)
                else
                    setRes(r => r = [])
            }
        )
    }, [])
    return res
}

export function AddRoles(){
    function AddRole(e){
        e.preventDefault()

        const formData = new FormData(e.target)
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
                    <form onSubmit={AddRole} className={inner_form}>
        
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

    function UpdateRole(e){
        e.preventDefault()

        const formData = new FormData(e.target)
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
                <form onSubmit={UpdateRole} className={inner_form}>
                    <label htmlFor="id">ROLE: </label>
                    <select name="id" id="id" className={input_text} required>
                        {
                            roles?.map(
                                items => 
                                    <option key={items["ID"]} value={items["ID"]}>{items["NAME"]}</option>
                            )
                        }
                    </select>
        
                    <label htmlFor="name">NAME: </label>
                    <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>
        
                    <button type="submit" className={submit}>UPDATE ROLES</button>
                </form>
            </div>
        </>
    )
}

export function DeleteRoles(props){
    function DeleteRole(e){
        e.preventDefault()

        const formData = new FormData(e.target)
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
        <form onSubmit={DeleteRole} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id} className={submit}>Delete</button>
        </form>
        </>
    )
}
