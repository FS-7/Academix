import axios from "axios";
import { Body } from "../components/Body";
import { useEffect, useState } from "react";
import { inner_form, input_text, outer_div, submit } from "../App";

const menuItems = [
    {path: "/roles/Add", text: "Add Roles", comp: <AddRoles />},
    {path: "/roles/Update", text: "Update Roles", comp: <UpdateRoles />},
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
        setTimeout(() => {
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
