import axios from "axios";
import { useEffect, useState } from "react";
import { Body } from "../components/Body";
import { outer_div, inner_form, input_text, submit } from "../App.tsx";

const menuItems = [
    {path: "/department/Create", text: "Create", comp: <CreateDepartment />},
    {path: "/department/Update", text: "Update", comp: <UpdateDepartment />}
]

export function Department(){
    return(
        <>
            <Body menuItems={menuItems}/>
        </>
    )
}

export function CreateDepartment(){
    function CreateDept(formData: any){
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
                <form action={CreateDept} className={inner_form}>
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
            setTimeout(() => {
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
            }, 1000)
        }, [])
    }
    ReadDept()

    return(
        <>
        <div className="w-4/6 justify-items-center">
        <table className="w-full justify-items-center text-center">
            <thead>
                <tr>
                    <th>NAME: </th>
                    <th>REMOVE: </th>
                </tr>
            </thead>
            <tbody>
                {
                    departments?.map(
                        (items) => 
                        <tr key={items["CODE"]}>
                            <td>{items["NAME"]}</td>
                            <td>
                            <RemoveDepartment />
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </div>
        </>
    )
}

export function RemoveDepartment(props){
    function RemoveDept(formData: any){
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
        <form action={RemoveDept} className="py-2 justify-items-center">
            <button type="submit" name="code" value={props.code} className={submit}>DELETE</button>
        </form>
        </>
    )
}

export function UpdateDepartment(){
    function UpdateDept(formData: any){
        const code = formData.get("code");
        var newcode = formData.get("newcode");
        const newname = formData.get("newcode");

        if(code == newcode || newcode == null || newcode == ''){
            newcode = code
        }
        useEffect(() => {
            setTimeout(() =>{
                axios({
                    method: "POST",
                    url: '/departments/Update',
                    data: {
                        code: code,
                        newcode: newcode,
                        newname: newname
                    }
                })
            }, 1000)
        }, [])
    }
    return(
        <>
        <div className={outer_div}>
            <h1>UPDATE DEPARTMENT:</h1>
            <form action={UpdateDept} className={inner_form}>
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