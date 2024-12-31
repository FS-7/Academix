import axios from "axios";
import { useEffect, useState } from "react";
import { Body } from "../shared/Body.jsx";
import { outer_div, inner_form, input_text, submit } from "../main.jsx";
import { RegisterAsStudent } from "./User.jsx";

const menuItems = [
    {path: "/department/Create", text: "Create"},
    {path: "/department/Update", text: "Update"},
    {path: "/department/subject", text: "Subject"},
    {path: "/department/teacher/Register", text: "Register As Teacher"},
    {path: "/department/teacher/List", text: "List Teachers"},
    {path: "/department/student/Register", text: "Register As Student"},
    {path: "/department/student/List", text: "List Students"}
]

export function Department(){
    return(
        <>
            <Body menuItems={menuItems}/>
        </>
    )
}

export async function ReadDept(){
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
                <form onSubmit={CreateDept} method="POST" className={inner_form}>
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
    const [departments, setDepartments] = useState([])
    const res = async() => await ReadDept()
    res().then(r => setDepartments(_ => _ = r))
    
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
        <form onSubmit={RemoveDept} method="POST" className="py-2 justify-items-center">
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
    
    const [departments, setDepartments] = useState([])
    const res = async() => await ReadDept()
    res().then(r => setDepartments(_ => _ = r))

    return(
        <>
        <div className={outer_div}>
            <h1>UPDATE DEPARTMENT:</h1>
            <form onSubmit={UpdateDept} method="POST" className={inner_form}>
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

//
//  SUBJECTS
//

export function Subject(){
    function AddSubject(e){
        e.preventDefault()

        const formData = new FormData(e.target)

        const code = formData.get("code")
        const name = formData.get("name")
        const department = formData.get("department")
        const teacher = formData.get("teacher")

        axios({
            method: "POST",
            url: '/departments/subject/add',
            data: {
                code: code,
                name: name,
                department: department,
                teacher: teacher
            }
        })
        .then(res => {
            if(res.status == 201)
                alert("SUBJECT ADDED")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    const [teachers, setTeachers] = useState([])
    var res = async() => await ReadTeachers()
    res().then(r => setTeachers(_ => _ = r))

    const [departments, setDepartments] = useState([])
    res = async() => await ReadDept()
    res().then(r => setDepartments(_ => _ = r))

    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>ADD SUBJECTS:</h1>
                <form onSubmit={AddSubject} method="POST" className={inner_form}>
                    <label htmlFor="code">CODE: </label>
                    <input type="text" id="code" name="code" placeholder="Code" required className={input_text}></input>

                    <label htmlFor="name">NAME: </label>
                    <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>
                    
                    <label htmlFor="department">DEPARTMENT: </label>
                    <select id="department" name="department" required className={input_text}>
                        {
                            departments.map(item =>
                                <option key={item["CODE"]} value={item["CODE"]}>{item["NAME"]}</option>
                            )
                        }
                    </select>
                    
                    <label htmlFor="teacher">TEACHER: </label>
                    <select id="teacher" name="teacher" className={input_text}>
                        {
                            teachers.map(item => 
                                <option key={item["ID"]} value={item["ID"]}>{item["NAME"]}</option>
                            )
                        }
                    </select>

                    <button type="submit" className={submit}>ADD</button>
                </form>
            </div>
            <div className={outer_div}>
                <ReadSubjects />
            </div>
        </div>
        </>
    )
}

export function ReadSubjects(){
    const [subjects, setSubjects] = useState([]);
        
    async function ReadSubjects(){
        useEffect(() => {
            axios({
                method: "GET",
                url: '/departments/subjects/read',
            })
            .then(res => {
                if(res.status == 200)
                    if(Array.isArray(res.data))
                        setSubjects(_ => _ = res.data)
                else if(res.status == 400)
                    alert("Check form elements")
                else
                    alert("Unknown Error")
            })
            .catch(e => console.log(e))
        }, [])
        
    }

    const res = async() => await ReadSubjects()
    res().then()

    return(
        <>
        <div className="w-4/6 justify-items-center">
            <table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>DEPARTMENT</th>
                        <th>TEACHER</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subjects.map(item => 
                            <tr key={item["CODE"]}>
                                <td>{item["NAME"]}</td>
                                <td>{item["DEPARTMENT"]}</td>
                                <td>{item["TEACHER"]}</td>
                                <td><RemoveSubjects code={item["CODE"]}/></td>                        
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}

export function RemoveSubjects(props){
    function Remove(e){
        e.preventDefault()

        const formData = new FormData(e.target);

        const code = formData.get("code");

        axios({
            method: "POST",
            url: '/departments/subject/remove',
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
        <form onSubmit={Remove} method="POST" className="py-2 justify-items-center">
            <input type="text" name="code" value={props.code} required hidden readOnly></input>
            <button type="submit" className={submit}>DELETE</button>
        </form>
        </>
    )
}

//
//  TEACHERS
//

async function ReadTeachers(){
    const [teachers, setTeachers] = useState([])
    useEffect(() => {
        axios({
            method: "GET",
            url: '/departments/teacher/read',
            data: {}
        })
        .then(res => {
            if(res.status == 200){
                if(Array.isArray(res.data))
                    setTeachers(_ => _ = res.data)
            }
                
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }, [])
    return teachers
}

export function TeachersList(){
    const [teachers, setTeachers] = useState([])
    const res = async() => await ReadTeachers()
    res().then(r => setTeachers(_ => _ = r))
    
    return(
        <div className={outer_div}>
            <table>
                <thead>
                    <tr>
                        <td>NAME</td>
                        <td>EMAIL</td>
                        <td>APPROVER</td>
                        <td>STATUS</td>
                        <td>APPROVE</td>
                        <td>DENY</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        teachers.map(item => 
                        <tr key={item["ID"]}>
                            <td>{item["NAME"]}</td>
                            <td>{item["EMAIL"]}</td>
                            <td>{item["APPROVER"]}</td>
                            <td>{item["STATUS"]}</td>
                            <td><ApproveT id={item["ID"]} /></td>
                            <td><DenyT id={item["ID"]} /></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export function Teacher(){
    function RegisterAsTeacher(e){
        e.preventDefault()

        const formData = new FormData(e.target)

        const approver = formData.get("approver")

        axios({
            method: "POST",
            url: '/departments/teacher/register',
            data: {
                approver: approver
            }
        })
        .then(res => {
            if(res.status == 201)
                alert("Registered (Awaiting Approval")
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
                <h1>REGISTER AS TEACHER:</h1>
                <form onSubmit={RegisterAsTeacher} method="POST" className={inner_form}>
                    <label htmlFor="approver">APPROVER</label>
                    <input type="email" id="approver" name="approver" placeholder="Approver Email" className={input_text} /> 

                    <button type="submit" className={submit}>ADD</button>
                </form>
            </div>
        </div>
        </>
    )
}

export function ApproveT(props){
    function AppT(e){
        e.preventDefault()
        
        const formData = new FormData(e.target);

        const id = formData.get("id");

        axios({
            method: "POST",
            url: '/departments/teacher/approve',
            data: {
                id: id
            }
        })
        .then(res => {
            if(res.status == 200)
                alert("Approved")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
        
    }

    return(
        <>
        <form onSubmit={AppT} method="POST" className="py-2 justify-items-center">
            <input type="text" name="id" value={props.id} required hidden readOnly></input>
            <button type="submit" className={submit}>APPROVE</button>
        </form>
        </>
    )
}

export function DenyT(props){
    function DenT(e){
        e.preventDefault()

        const formData = new FormData(e.target);

        const id = formData.get("id");

        axios({
            method: "POST",
            url: '/departments/teacher/deny',
            data: {
                id: id
            }
        })
        .then(res => {
            if(res.status == 200)
                alert("Denied")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    return(
        <>
        <form onSubmit={DenT} method="POST" className="py-2 justify-items-center">
            <input type="text" name="id" value={props.id} required hidden readOnly></input>
            <button type="submit" className={submit}>DELETE</button>
        </form>
        </>
    )
}

//
//  STUDENT
//

async function ReadStudents(){
    const [students, setStudents] = useState([])
    useEffect(() => {
        axios({
            method: "GET",
            url: '/departments/student/read',
            data: {}
        })
        .then(res => {
            if(res.status == 200)
                setStudents(_ => _ = res.data)
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }, [])
    return students
}

export function StudentsList(){
    const [students, setStudents] = useState([])
    const res = async() => await ReadStudents()
    res().then(r => setStudents(_ => _ = r))
    

    return(
        <div className={outer_div}>
            <table>
                <thead>
                    <tr>
                        <td>USN</td>
                        <td>NAME</td>
                        <td>EMAIL</td>
                        <td>APPROVER</td>
                        <td>STATUS</td>
                        <td>APPROVE</td>
                        <td>DENY</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map(item => 
                        <tr key={item["USN"]}>
                            <td>{item["USN"]}</td>
                            <td>{item["NAME"]}</td>
                            <td>{item["EMAIL"]}</td>
                            <td>{item["APPROVER"]}</td>
                            <td>{item["STATUS"]}</td>
                            <td><ApproveS usn={item["USN"]} /></td>
                            <td><DenyS usn={item["USN"]} /></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export function Student(){
    function RegisterAsStudent(e){
        e.preventDefault()

        const formData = new FormData(e.target)

        const usn = formData.get("usn")
        const department = formData.get("department")
        const batch = formData.get("batch")
        const approver = formData.get("approver")

        axios({
            method: "POST",
            url: '/departments/student/Register',
            data: {
                usn: usn,
                department: department,
                batch: batch,
                approver: approver
            }
        })
        .then(res => {
            if(res.status == 201)
                alert("Registered (Awaiting Approval")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    const [departments, setDepartments] = useState([])
    const res = async() => await ReadDept()
    res().then(r => setDepartments(_ => _ = r))

    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>REGISTER AS STUDENT:</h1>
                <form onSubmit={RegisterAsStudent} method="POST" className={inner_form}>
                    <label htmlFor="usn">USN</label>
                    <input type="text" id="usn" name="usn" placeholder="USN" className={input_text} /> 
                    
                    <label htmlFor="department">DEPARTMENT</label>
                    <select id="department" name="department" placeholder="Department" className={input_text} >
                    {
                        departments.map(item =>
                            <option key={item["CODE"]} value={item["CODE"]}>{item["NAME"]}</option>
                        )
                    }    
                    </select> 
                    
                    <label htmlFor="batch">BATCH</label>
                    <input type="text" id="batch" name="batch" placeholder="Batch" className={input_text} /> 
                    
                    <label htmlFor="approver">APPROVER</label>
                    <input type="email" id="approver" name="approver" placeholder="Approver Email" className={input_text} /> 

                    <button type="submit" className={submit}>ADD</button>
                </form>
            </div>
        </div>
        </>
    )
}

export function ApproveS(props){
    function AppS(e){
        e.preventDefault()

        const formData = new FormData(e.target);

        const usn = formData.get("usn");
        axios({
            method: "POST",
            url: '/departments/student/approve',
            data: {
                usn: usn
            }
        })
        .then(res => {
            if(res.status == 200)
                alert("Approved")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
        
    }

    return(
        <>
        <form onSubmit={AppS} method="POST" className="py-2 justify-items-center">
            <input type="text" name="usn" value={props.usn} required hidden readOnly></input>
            <button type="submit" className={submit}>APPROVE</button>
        </form>
        </>
    )
}

export function DenyS(props){
    function DenS(e){
        e.preventDefault()

        const formData = new FormData(e.target);

        const usn = formData.get("usn");

        axios({
            method: "POST",
            url: '/departments/student/deny',
            data: {
                usn: usn
            }
        })
        .then(res => {
            if(res.status == 200)
                alert("Denied")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    return(
        <>
        <form onSubmit={DenS} method="POST" className="py-2 justify-items-center">
            <input type="text" name="usn" value={props.usn} required hidden readOnly></input>
            <button type="submit" className={submit}>DELETE</button>
        </form>
        </>
    )
}
