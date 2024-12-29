import axios from "axios";
import { useEffect, useState } from "react";
import { Body } from "../shared/Body.jsx";
import { outer_div, inner_form, input_text, submit } from "../main.jsx";

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

export function ReadDept(){
    const [departments, setDepartment] = useState([]);
    useEffect(() => {
        axios({
            method: "GET",
            url: '/departments/ReadAll',
        })
        .then(res => {
            if(res.status == 200)
                if(Array.isArray(res.data))
                    setDepartment(_ => _ = res.data)
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }, [])
    
    return departments
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
        .then(res => {
            if(res.status == 201)
                alert("Department Created")
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
    const departments = ReadDept()
    
    return(
        <>
        <div className="w-4/6 justify-items-center">
            <table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map(item => 
                            <tr key={item["CODE"]}>
                                <td>{item["NAME"]}</td>
                                <td><RemoveDepartment code={item["CODE"]}/></td>                        
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
    function RemoveDept(e){
        e.preventDefault()

        const formData = new FormData(e.target);

        const code = formData.get("code");

        axios({
            method: "POST",
            url: '/departments/Remove',
            data: {
                code: code
            }
        })
        .then(res => {
            if(res.status == 200)
                alert("Department Removed")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    return(
        <>
        <form onSubmit={RemoveDept} className="py-2 justify-items-center">
            <input type="text" name="code" value={props.code} required hidden readOnly></input>
            <button type="submit" className={submit}>DELETE</button>
        </form>
        </>
    )
}

export function UpdateDepartment(){
    function UpdateDept(e){
        e.preventDefault()

        const formData = new FormData(e.target);
        const code = formData.get("code");
        const newname = formData.get("newname");

        axios({
            method: "POST",
            url: '/departments/Update',
            data: {
                code: code,
                newname: newname
            }
        })
        .then(res => {
            if(res.status == 200)
                alert("Department Removed")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    const departments = ReadDept()
    return(
        <>
        <div className={outer_div}>
            <h1>UPDATE DEPARTMENT:</h1>
            <form onSubmit={UpdateDept} className={inner_form}>
                <label htmlFor="code">CODE: </label>
                <select type="text" id="code" name="code" placeholder="Code" required className={input_text}>
                    {
                        departments.map( item => 
                            <option key={item["CODE"]} value={item["CODE"]}>{item["CODE"]}</option>
                        )
                    }
                </select>

                <label htmlFor="name">NAME: </label>
                <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>

                <button type="submit" className={submit}>UPDATE DEPARTMENT</button>
            </form>
        </div>
        </>
    )
}