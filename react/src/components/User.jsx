import axios from "axios";
import {useState, useEffect} from 'react';
import { Body } from "../shared/Body.jsx";
import { userLoggedIn, validateEmail, validatePassword, validatePhone } from "../shared/validate.jsx";
import { Navigate } from "react-router-dom";
import { outer_div, inner_form, input_text, submit } from "../main.jsx";
import { Read_Roles } from "./Roles.jsx";
import { AddUserSkill } from "./Skills.jsx";
import { Form } from "../shared/Templates.jsx";

const menuItems = [
    { path: "/User/", text: "Profile"},
    { path: "/user/UpdateProfile", text: "Update Profile"},
    { path: "/user/UpdatePassword", text: "Update Password"},
    { path: "/user/roles/SetUserRole", text: "Set User Role"},
    { path: "/user/roles/GetRequests", text: "Get Requests"},
    { path: "/user/roles/GetMyRequests", text: "Get My Requests"},
    { path: "/user/skills/Add", text: "Add Skills"}
]

export function User(){
    return(
        <>
            <Body menuItems={menuItems}/>
        </>
    )
}

export function Register(){
    if(userLoggedIn() == true)
        <Navigate to='/user/'/>
    
    function RegisterUser(e){
        e.preventDefault()
        const formData = new FormData(e.target);

        const name = formData.get("name")
        const email = formData.get("email")
        const phone = formData.get("phone")
        const password = formData.get("password")
        const password2 = formData.get("password2")
    
        if(!validateEmail(email)){
            alert("Use a proper email")
            return
        }
        if(!validatePhone(phone)){
            alert("Enter correct phone number")
            return
        }
        if(!validatePassword(password, password2)){
            alert("Create a proper password")
            return
        }
    
        axios({
            method: 'post',
            url: '/user/Register',
            data: {
                name: name,
                email: email,
                phone: phone,
                password: password,
                password2: password2
            }
        })
        .then(res => {
            if(res.status == 201)
                alert("Created")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    const Register = {
        submitFunction: RegisterUser,
        method: "POST",
        heading: "REGISTER",
        elements: [
            {id: "name", name: "name", type: "text", placeholder: "Name", display: "NAME", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "email", name: "email", type: "email", placeholder: "Email", display: "EMAIL", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "number", name: "phone", type: "number", placeholder: "Phone", display: "PHONE", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "password", name: "password", type: "password", placeholder: "Enter Password", display: "ENTER PASSWORD", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "password2", name: "password2", type: "password", placeholder: "Enter Password Again", display: "ENTER PASSWORD AGAIN", value: "", optionsList: [], isRequired: true, isDisabled: false},
        ],
        submitButton: { id: null, name: null, value: "", text: "REGISTER"}
    }

    return(
        <>
        <div className="h-full w-5/6 md:w-full flex grow items-center justify-center overflow-scroll">
            <Form form={Register}/>
        </div>
        </>
    );
}

export function Login(){
    function LoginUser(e) {
        e.preventDefault()
        const formData = new FormData(e.target);

        const email = formData.get("email")
        const password = formData.get("password")
    
        if(!validateEmail(email)){
            alert("Use a proper email")
        }
        if(!validatePassword(password)){
            alert("Enter a proper password")
        }
        axios({
            method: 'post',
            url: '/user/Login',
            data: {
                email: email,
                password: password
            }
        })
        .then(res => {
            if(res.status == 200){
                localStorage.setItem("logged_user", JSON.stringify(true))
                alert("User Logged In")
            }
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    const Login = {
        submitFunction: LoginUser,
        method: "POST",
        heading: "LOGIN",
        elements: [
            {id: "email", name: "email", type: "email", placeholder: "Email", display: "EMAIL", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "password", name: "password", type: "password", placeholder: "Enter Password", display: "ENTER PASSWORD", value: "", optionsList: [], isRequired: true, isDisabled: false}
        ],
        submitButton: { id: null, name: null, value: "", text: "LOGIN"}
    }

    return(
        <>
        <div className="h-full w-5/6 md:w-full flex grow items-center justify-center overflow-scroll">
            <Form form={Login}/>
        </div>
        </>
    )
}

export function Logout(){
    if(userLoggedIn() == null || userLoggedIn() == false)
        <Navigate to='../Login'/>
    
    function LogoutUser(e){
        e.preventDefault()
        axios({
            method: 'post',
            url: '/user/Logout'
        })
        .then(res => {
            if(res.status == 200){
                localStorage.removeItem("logged_user")
                alert("User Logged Out")
            }
                
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }
    const form = {
        submitFunction: LogoutUser,
        method: "POST",
        elements: [],
        submitButton: {id: null, name: null, value: "", text: "LOGOUT"}
    }
    return (
        <>
            <Form form={form}/>
        </>   
    )
}

export function Profile(){
    if(userLoggedIn() == null || userLoggedIn() == false)
        <Navigate to='../Login'/>

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: ""
    });
    
    function GetProfile(){
        useEffect(()=>{
            axios({
                method: "GET",
                url: '/user/Profile',
            })
            .then(res => {
                if(res.status == 200){
                    setProfile(_ => _ = {
                        name: res.data["name"],
                        email: res.data["email"],
                        phone: res.data["phone"]
                    });
                }
                else if(res.status == 401)
                    alert("You are not authorized!")
                else if(res.status == 400)
                    alert("Check form elements")
                else
                    alert("Unknown Error")
            })
            .catch(e => console.log(e))
        }, []);
    }
    GetProfile()

    return (
        <>
        <div>
            <div className="flex flex-col">
                <h1>PROFILE: </h1>
                <h1>Name: {profile.name}</h1>
                <h1>Email: {profile.email}</h1>
                <h1>Phone: {profile.phone}</h1>
            </div>
            <Logout />
        </div>
        </>
    );
}

export function UpdateProfile(){
    if(userLoggedIn() == null || userLoggedIn() == false)
        return 

    function UpdateUserProfile(e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        const name = formData.get("name")
        const email = formData.get("email")
        const phone = formData.get("phone")
        if(!validateEmail(email)){
            alert("Use a proper email")
            return
        }
        if(!validatePhone(phone)){
            alert("Enter correct phone number")
            return
        }
            
        axios({
            method: 'post',
            url: '/user/Update',
            data: {
                name: name,
                email: email,
                phone: phone
            }
        })
        .then(res => {
            if(res.status == 200){
                alert("Profile Updated")
            }
            else if(res.status == 401)
                alert("You are not authorized!")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }
    
    const UpdateProfile = {
        submitFunction: UpdateUserProfile,
        method: "POST",
        heading: "UPDATE PROFILE",
        elements: [
            {id: "name", name: "name", type: "name", placeholder: "Name", display: "NAME: ", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "email", name: "email", type: "email", placeholder: "Email", display: "EMAIL: ", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "phone", name: "phone", type: "phone", placeholder: "Phone", display: "PHONE: ", value: "", optionsList: [], isRequired: true, isDisabled: false},
        ],
        submitButton: { id: null, name: null, value: "", text: "UPDATE"}
    }

    return (
        <>
            <Form form={UpdateProfile} />
        </>
    );
}

export function UpdatePassword(){
    if(userLoggedIn() == null || userLoggedIn() == false)
        return 
    function UpdateUserPassword(e){
        e.preventDefault()
        const formData = new FormData(e.target)

        const oldpassword = formData.get("oldpassword")
        const newpassword = formData.get("newpassword")
        const newpassword2 = formData.get("newpassword2")
        if(!validatePassword(newpassword, newpassword2)){
            alert()
            return
        }
        axios({
            method: 'post',
            url: '/user/UpdatePassword',
            data: {
                oldpassword: oldpassword,
                newpassword: newpassword
            }
        })
        .then(res => {
            if(res.status == 200){
                alert("Password Updated")
            }
            else if(res.status == 401)
                alert("You are not authorized!")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }
    
    const UpdatePassword = {
        submitFunction: UpdateUserPassword,
        method: "POST",
        heading: "UPDATE PASSWORD",
        elements: [
            {id: "password", name: "password", type: "password", placeholder: "Enter Password", display: "ENTER PASSWORD", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "password2", name: "password2", type: "password", placeholder: "Enter Password Again", display: "ENTER PASSWORD AGAIN", value: "", optionsList: [], isRequired: true, isDisabled: false},
        ],
        submitButton: { id: null, name: null, value: "", text: "UPDATE PASSWORD"}
    }

    return (
        <>
            <Form form={UpdatePassword} />
        </>
    )
}

//  ROLES

export function SetUserRole(){
    if(userLoggedIn() == null || userLoggedIn() == false)
        return 
    function RequestRoles(e){
        e.preventDefault()
        const formData = new FormData(e.target)

        const roles = formData.getAll("roles")
        const approver = formData.get("approver")
        axios({
            method: 'post',
            url: '/roles/CreateRequest',
            data: {
                roles: roles,
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
                <form onSubmit={RequestRoles} className={inner_form}>
                    {
                        roles?.map(
                            items =>
                                <div key={items["ID"]}>
                                <input type="checkbox" id={items["ID"]} name={"roles"} value={items["ID"]}/>
                                <label htmlFor={items["ID"]}>{items["NAME"]}</label>
                                </div>
                        )
                    }
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
    if(userLoggedIn() == null || userLoggedIn() == false)
        return 
    const [myroles, setRoles] = useState([])

    function MyRole(){
        useEffect(() => {
            axios({
                method: 'get',
                url: '/roles/MyRoles',
                data: {
                }
            })
            .then(res => {
                if(Array.isArray(res.data))
                    setRoles(_ => _ = res.data)
                else
                    setRoles(_ => _ = [])
            })
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

export function RemoveMyRoles(props){
    if(userLoggedIn() == null || userLoggedIn() == false)
        return 
    function RemoveMyRole(e){
        e.preventDefault()
        const formData = new FormData(e.target)

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
        <form onSubmit={RemoveMyRole} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}><img></img></button>
        </form>
        </>
    )
}

export function GetRequests(){
    const [r, setReq] = useState([]);
    function GetReq(){

        useEffect(()=>{
            axios({
                method: 'get',
                url: '/roles/GetRequest',
                data: {}
            })
            .then(res => {
                if(Array.isArray(res.data))
                    setReq(r => r = res.data)
                else
                    setReq(r => r = [])
            })
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
    if(userLoggedIn() == null || userLoggedIn() == false)
        return 

    const [myreq, setMyReq] = useState([]);
    
    function GetMyReq(){

        useEffect(() => {
            axios({
                method: 'get',
                url: '/roles/GetMyRequest',
                data: {
                }
            })
            .then(res => {
                if(Array.isArray(res.data))
                    setMyReq(myreq => myreq = res.data)
                else
                    setMyReq(myreq => myreq = [])
            })
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

export function RemoveRequest(props){
    if(userLoggedIn() == null || userLoggedIn() == false)
        return 
    
    function RemoveReq(e){
        e.preventDefault()

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
        <form onSubmit={RemoveReq} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}><img></img></button>
        </form>
        </>
    )
}

export function Approve(props){
    if(userLoggedIn() == null || userLoggedIn() == false)
        return 

    function App(e){
        e.preventDefault()

        const formData = new FormData(e.target)
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
        <form onSubmit={App} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}><img></img></button>
        </form>
        </>
    )
}

export function Deny(props){
    if(userLoggedIn() == null || userLoggedIn() == false)
        return 

    function Den(e){
        e.preventDefault()

        const formData = new FormData(e.target)
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
        <form onSubmit={Den} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}><img></img></button>
        </form>
        </>
    )
}
