import { useState, useEffect } from "react";
import axios from "axios";
import { Body } from "../shared/Body.jsx";
import { outer_div, inner_form, input_text, submit } from "../main.jsx";

const menuItems = [
    {path: '/permissions/Add', text: "Add Permissions"}
]

export function Permission(){
    return(
        <>
        <Body menuItems={menuItems}/>
        </>
    )
}


export function Read_Permissions(){
    const [res, setRes] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: '/permissions/ReadAll'
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

export function AddPermission(){
    function AP(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const name=formData.get("name")
        axios({
            method: 'post',
            url: '/permissions/Create',
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
                <h1>CREATE PERMISSION:</h1>
                    <form onSubmit={AP} className={inner_form}>
        
                        <label htmlFor="name">NAME: </label>
                        <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>
        
                        <button type="submit" className={submit}>CREATE</button>
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
                    <th>DELETE PERMISSION</th>
                </tr>
            </thead>
            <tbody>
                {
                    permissions?.map(
                        items => 
                        <tr key={items["ID"]}>
                            <td>{items["NAME"]}</td>
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

export function UpdatePermissions(){
    const permissions = Read_Permissions()

    function UpdatePermissions(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const id = formData.get("id")
        const name = formData.get("name")
        axios({
            method: 'post',
            url: '/permissions/Update',
            data: {
                id: id,
                name: name
            }
        })
        .then(res => {
            alert("Permissions Updated")
            console.log(res)
        })
    }

    return(
        <>
            <div className={outer_div}>
                <h1>UPDATE PERMISSION:</h1>
                <form onSubmit={UpdatePermissions} className={inner_form}>
                    <label htmlFor="id">PERMISSION: </label>
                    <select name="id" id="id" className={input_text} required>
                        {
                            permissions?.map(
                                items => 
                                    <option key={items["ID"]} value={items["ID"]}>{items["NAME"]}</option>
                            )
                        }
                    </select>   
                    <label htmlFor="newid">NEW ID: </label>
                    <input type="text" id="newid" name="newid" placeholder="New Id" className={input_text}></input>
        
                    <label htmlFor="name">NAME: </label>
                    <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>
        
                    <button type="submit" className={submit}>UPDATE PERMISSION</button>
                </form>
            </div>
        </>
    )
}

export function DeletePermission(props){
    function DP(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const id = formData.get("id")
        axios({
            method: 'post',
            url: '/permissions/Delete',
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
        <form onSubmit={DP} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id} className={submit}>Delete</button>
        </form>
        </>
    )
}

export function Read_RP(){
    const [res, setRes] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: '/permissions/ReadAllRP'
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

export function AddRP(){
    function ARP(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const name=formData.get("name")
        axios({
            method: 'post',
            url: '/permissions/CreateRP',
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
                <h1>CREATE PERMISSION:</h1>
                    <form onSubmit={ARP} className={inner_form}>
        
                        <label htmlFor="role">role: </label>
                        <input type="text" id="role" name="role" placeholder="role" required className={input_text}></input>

                        <label htmlFor="dept">dept: </label>
                        <input type="text" id="dept" name="dept" placeholder="dept" required className={input_text}></input>

                        <label htmlFor="permission">permission: </label>
                        <input type="text" id="permission" name="permission" placeholder="permission" required className={input_text}></input>

                        <label htmlFor="level">level: </label>
                        <input type="number" id="level" name="level" placeholder="level" required className={input_text}></input>
        
                        <button type="submit" className={submit}>CREATE</button>
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
    const permissions = Read_RP()
    return(
        <>
        <table className="">
            <thead>
                <tr>
                    <th>PERMISSION NAME</th>
                    <th>DELETE PERMISSION</th>
                </tr>
            </thead>
            <tbody>
                {
                    permissions?.map(
                        items => 
                        <tr key={items["ID"]}>
                            <td>{items["NAME"]}</td>
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

export function UpdateRP(){
    const permissions = Read_RP()

    function UpdatePermissions(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const id = formData.get("id")
        const newid = formData.get("newid")
        const name = formData.get("name")
        axios({
            method: 'post',
            url: '/permissions/UpdateRP',
            data: {
                id: id,
                name: name
            }
        })
        .then(res => {
            alert("Permissions Updated")
            console.log(res)
        })
    }

    return(
        <>
            <div className={outer_div}>
                <h1>UPDATE PERMISSION:</h1>
                <form onSubmit={UpdatePermissions} className={inner_form}>
                    <label htmlFor="id">PERMISSION: </label>
                    <select name="id" id="id" className={input_text} required>
                        {
                            permissions?.map(
                                items => 
                                    <option key={items["ID"]} value={items["ID"]}>{items["NAME"]}</option>
                            )
                        }
                    </select>
        
                    <label htmlFor="name">NAME: </label>
                    <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>
        
                    <button type="submit" className={submit}>UPDATE PERMISSION</button>
                </form>
            </div>
        </>
    )
}

export function DeleteRP(props){
    function DP(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const id = formData.get("id")
        axios({
            method: 'post',
            url: '/permissions/DeleteRP',
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
        <form onSubmit={DP} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id} className={submit}>Delete</button>
        </form>
        </>
    )
}
