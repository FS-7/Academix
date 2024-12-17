import axios from "axios";
import { useEffect, useState } from "react";
import { Body } from "../components/Body";

const input_text = "p-2 my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

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
            res => alert("Department Added")
        )
    }
    
    return(
        <>
        <div className="w-4/6 justify-items-center">
            <h1>CREATE DEPARTMENT:</h1>
            <form action={CreateDept} className="w-4/6 py-2 flex flex-col">
                <label htmlFor="code">CODE: </label>
                <input type="text" id="code" name="code" placeholder="Code" required className={input_text}></input>

                <label htmlFor="name">NAME: </label>
                <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">CREATE</button>
            </form>
        </div>
        <ReadDepartment />
        
        </>
    )
}

export function ReadDepartment(props){
    const [departments, setDepartment] = useState([]);
    
    function ReadDept(){
        useEffect(() => {
            axios({
                method: "GET",
                url: '/departments/ReadAll',
            })
            .then(res => {
                console.log(res.data)
                setDepartment(dept => dept = res.data)
            });
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
            <button type="submit" name="code" value={props.code} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">DELETE</button>
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
        <div className="w-4/6 justify-items-center bg-blue-500 rounded-xl">
            <h1>UPDATE DEPARTMENT:</h1>
            <form action={UpdateDept} className="w-4/6 py-2 flex flex-col">
                <label htmlFor="code">CODE: </label>
                <input type="text" id="code" name="code" placeholder="Code" className={input_text}></input>
                
                <label htmlFor="newcode">NEWCODE: </label>
                <input type="text" id="newcode" name="newcode" placeholder="New Code" className={input_text}></input>

                <label htmlFor="name">NAME: </label>
                <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">UPDATE DEPARTMENT</button>
            </form>
        </div>
        </>
    )
}