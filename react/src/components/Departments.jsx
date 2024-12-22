import axios from "axios";
import { useEffect, useState } from "react";
import { Body } from "../shared/Body.jsx";
import { outer_div, inner_form, input_text, submit } from "../main.jsx";
import { Table } from "../shared/Templates.jsx";

const menuItems = [
    {path: "/department/Create", text: "Create"},
    {path: "/department/Update", text: "Update"}
]

export function Department(){
    return(
        <>
            <Body menuItems={menuItems}/>
        </>
    )
}

export function CreateDepartment(){
    function CreateDept(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const code = formData.get("code");
        const name = formData.get("name");
        axios({
            method: "POST",
            url: '/departments/Add',
            data: {
                code: code,
                name: name
            }
        })
        .then(
            res => {
                alert("Department Added")
            }
        )
    }
    
    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>CREATE DEPARTMENT:</h1>
                <form onSubmit={CreateDept} className={inner_form}>
                    <label htmlFor="code">CODE: </label>
                    <input type="text" id="code" name="code" placeholder="Code" required className={input_text}></input>

                    <label htmlFor="name">NAME: </label>
                    <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>

                    <button type="submit" className={submit}>CREATE</button>
                </form>
            </div>
            <div className={outer_div}>
                <ReadDepartment />
            </div>
        </div>
        </>
    )
}

export function ReadDepartment(){
    const [departments, setDepartment] = useState([]);
    
    function ReadDept(){
        useEffect(() => {
            axios({
                method: "GET",
                url: '/departments/ReadAll',
            })
            .then(res => {
                if(Array.isArray(res.data))
                    setDepartment(dept => dept = res.data)
                else
                    setDepartment(dept => dept = [])
            });
        }, [])
    }
    ReadDept()
    
    let row = {}
    if(departments[0] != undefined)
        row = departments[0]

    const table = {
        tablehead: ["NAME", "REMOVE"],
        tablebody: {keys: Object.keys(row), data: departments, deleteFunction: <RemoveDepartment />}
    }
    return(
        <>
        <div className="w-4/6 justify-items-center">
            <Table table={table} />
        </div>
        </>
    )
}

export function RemoveDepartment(props){
    function RemoveDept(formData){
        const code = formData.get("code");
        axios({
            method: "POST",
            url: '/departments/Remove',
            data: {
                code: code
            }
        })
        .then(res => {
            alert("Department Removed")
        })
    }

    return(
        <>
        <form onSubmit={RemoveDept} className="py-2 justify-items-center">
            <button type="submit" name="code" value={props.code} className={submit}>DELETE</button>
        </form>
        </>
    )
}

export function UpdateDepartment(){
    function UpdateDept(formData){
        const code = formData.get("code");
        var newcode = formData.get("newcode");
        const newname = formData.get("newcode");

        if(code == newcode || newcode == null || newcode == ''){
            newcode = code
        }
        useEffect(() => {
            axios({
                method: "POST",
                url: '/departments/Update',
                data: {
                    code: code,
                    newcode: newcode,
                    newname: newname
                }
            })
        }, [])
    }
    return(
        <>
        <div className={outer_div}>
            <h1>UPDATE DEPARTMENT:</h1>
            <form onSubmit={UpdateDept} className={inner_form}>
                <label htmlFor="code">CODE: </label>
                <input type="text" id="code" name="code" placeholder="Code" className={input_text}></input>
                
                <label htmlFor="newcode">NEWCODE: </label>
                <input type="text" id="newcode" name="newcode" placeholder="New Code" className={input_text}></input>

                <label htmlFor="name">NAME: </label>
                <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>

                <button type="submit" className={submit}>UPDATE DEPARTMENT</button>
            </form>
        </div>
        </>
    )
}