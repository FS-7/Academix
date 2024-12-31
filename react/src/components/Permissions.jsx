import { useState, useEffect } from "react";
import axios from "axios";
import { outer_div, inner_form, input_text, submit } from "../main.jsx";
import { Read_Roles } from "./Roles.jsx";
import { ReadDept } from "./Departments.jsx";
import { validateLevel } from "../shared/validate.jsx";

export function Read_Permissions(){
    const [res, setRes] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: '/permissions/ReadAll'
        })
        .then(
            res => {
                if(res.status == 200)
                    if(Array.isArray(res.data))
                        setRes(_ => _ = res.data)
                else if(res.status == 400)
                    alert("Check form elements")
                else
                    alert("Unknown Error")
            }
        )
    }, [])
    return res
}

export function AddPermission(){
    function AP(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const name = formData.get("name");
        const desc = formData.get("desc");
        axios({
            method: "POST",
            url: '/permissions/Create',
            data: {
                name: name,
                desc: desc
            }
        })
        .then(res => {
            if(res.status == 201)
                alert("Permission Created")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    return(
        <>
            <div className={'w-full h-full flex flex-col items-center'}>
                <div className={outer_div}>
                    <h1>CREATE DEPARTMENT:</h1>
                    <form onSubmit={AP} className={inner_form}>
                        <label htmlFor="name">NAME: </label>
                        <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>

                        <label htmlFor="desc">DESCRIPTION: </label>
                        <input type="text" id="desc" name="desc" placeholder="Description" className={input_text}></input>
                
                        <button type="submit" className={submit}>ADD</button>
                    </form>
                </div>
                <div className={outer_div}>
                    <ReadPermissions />
                </div>
            </div>
        </>
    )
}

export function ReadPermissions(){
    const permissions = Read_Permissions()
    return(
        <>
        <table className="">
            <thead>
                <tr>
                    <th>PERMISSION NAME</th>
                    <th>DESCRIPTION</th>
                    <th>DELETE PERMISSION</th>
                </tr>
            </thead>
            <tbody>
                {
                    permissions?.map(
                        items => 
                        <tr key={items["ID"]}>
                            <td>{items["NAME"]}</td>
                            <td>{items["DESC"]}</td>
                            <td>
                                <DeletePermission id={items["ID"]}/>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </>
    )
}

export function DeletePermission(props){
    function DP(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        
        const id = formData.get("id")

        axios({
            method: "POST",
            url: '/permissions/Delete',
            data: {
                id: id
            }
        })
        .then(res => {
            if(res.status == 200)
                alert("Permissions Deleted")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    return(
        <>
        <form onSubmit={DP} className={inner_form}>
            <input type="text" name="id" value={props.id} required hidden readOnly></input>
            <button type="submit" className={submit}>DELETE</button>
        </form>
        </>
    )
}

//
//  ROLES AND PERMISSIONS
//

export function Read_RP(){
    const [res, setRes] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: '/permissions/ReadAllRP'
        })
        .then(
            res => {
                if(res.status == 200)
                    if(Array.isArray(res.data))
                        setRes(r => r = res.data)
                else if(res.status == 400)
                    alert("Check form elements")
                else
                    alert("Unknown Error")
            }
        )
    }, [])
    return res
}

export function BindPermission(){
    function BRP(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        
        const role = formData.get("role")
        const department = formData.get("department")
        const permission = formData.get("permission")
        const level = formData.get("level")

        if(!validateLevel(level)){
            alert("Wrong Input Level")
            return
        }

        axios({
            method: "POST",
            url: '/permissions/CreateRP',
            data: {
                role: role,
                department: department,
                permission: permission,
                level: level
            }
        })
        .then(res => {
            if(res.status == 200)
                alert("Role and Permission Bounded")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    const roles = Read_Roles()
    const perms = Read_Permissions()
    
    return(
        <>
            <div className={'w-full h-full flex flex-col items-center'}>
                <div className={outer_div}>
                    <h1>BIND ROLES AND PERMISSION:</h1>
                    <form onSubmit={BRP} className={inner_form}>
                        <label htmlFor="role">ROLE: </label>
                        <select type="text" id="role" name="role" placeholder="Role" required className={input_text}>
                            {
                                roles.map(item => 
                                    <option key={item["ID"]} value={item["ID"]}>{item["NAME"]}</option>
                                )
                            }
                        </select>
                        
                        <label htmlFor="permission">PERMISSION: </label>
                        <select type="text" id="permission" name="permission" placeholder="Permission" className={input_text}>
                            {
                                perms.map(item => 
                                    <option key={item["ID"]} value={item["ID"]}>{item["NAME"]}</option>
                                )
                            }
                        </select>

                        <label htmlFor="level">LEVEL: </label>
                        <select id="level" name="level" placeholder="level" className={input_text}>
                            <option value="0">None</option>
                            <option value="1">Read</option>
                            <option value="2">Write</option>
                            <option value="3">Read Write</option>
                        </select>
                
                        <button type="submit" className={submit}>ADD</button>
                    </form>
                </div>
                <div className={outer_div}>
                    <ReadRP />
                </div>
            </div>
        </>
    )
}

export function ReadRP(){
    const roles_permissions = Read_RP()
    return(
        <>
        <table className="">
            <thead>
                <tr>
                    <th>ROLE</th>
                    <th>PERMISSION</th>
                    <th>LEVEL</th>
                    <th>DELETE PERMISSION</th>
                </tr>
            </thead>
            <tbody>
                {
                    roles_permissions?.map(
                        items => 
                        <tr key={items["ID"]}>
                            <td>{items["ROLE"]}</td>
                            <td>{items["PERMISSION"]}</td>
                            <td>{items["LEVEL"]}</td>
                            <td><DeleteRP id={items["ID"]} /></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </>
    )
}

export function DeleteRP(props){
    function DP(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        
        const id = formData.get("id")
        axios({
            method: "POST",
            url: '/permissions/DeleteRP',
            data: {
                id: id
            }
        })
        .then(res => {
            if(res.status == 200)
                alert("Role and Permission Unbounded")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }
    return(
        <>
        <form onSubmit={DP} className="py-2 justify-items-center">
            <input type="text" name="id" value={props.id} required hidden readOnly></input>
            <button type="submit" name="id" value={props.id} className={submit}>Delete</button>
        </form>
        </>
    )
}
