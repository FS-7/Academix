import axios from "axios";
import {useState, useEffect} from 'react';
import { Body } from "../components/Body.tsx";
import { validateEmail, validatePassword, validatePhone } from "./../shared/validate.tsx";
import { NavLink } from "react-router-dom";
import { outer_div, inner_form, input_text, submit } from "../App.tsx";
import { Read_Roles } from "./Roles.tsx";
import { AddUserSkill } from "./Skills.tsx";

const menuItems = [
    { path: "/User/", text: "Profile", comp: <Profile/>},
    { path: "/user/UpdateProfile", text: "Update Profile", comp: <UpdateProfile/>},
    { path: "/user/roles/SetUserRole", text: "Set User Role", comp: <SetUserRole />},
    { path: "/user/roles/GetRequests", text: "Get Requests", comp: <GetRequests />},
    { path: "/user/roles/GetMyRequests", text: "Get My Requests", comp: <GetMyRequests />},
    {path: "/user/skills/Add", text: "Add Skills", comp: <AddUserSkill/>}
]

export function GetProfileMenu(){
    return menuItems
}

export function User(){
    return(
        <>
            <Body menuItems={menuItems}/>
        </>
    )
}

export function Register(){
    //  CHECK IF USER IS NOT LOGGED IN
    function RegisterUser(formData: any){
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
        .then(res => console.log(res))
        
    }

    return(
        <>
        <div className={outer_div}>
            <h1>REGISTER:</h1>
            <form action={RegisterUser} className={inner_form}>
                <label htmlFor="name">NAME: </label>
                <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>

                <label htmlFor="email">EMAIL: </label>
                <input type="email" id="email" name="email" placeholder="Email" required className={input_text}></input>

                <label htmlFor="phone">PHONE: </label>
                <input type="number" id="phone" name="phone" placeholder="Phone" required className={input_text}></input>
                
                <label htmlFor="password">ENTER PASSWORD: </label>
                <input type="password" id="password" name="password" placeholder="Enter Password" required className={input_text}></input>

                <label htmlFor="password2">ENTER PASSWORD AGAIN: </label>
                <input type="password" id="password2" name="password2" placeholder="Enter Password Again" required className={input_text}></input>

                <button type="submit" className={submit}>SIGN UP</button>
            </form>
        </div>
        </>
    );
}

export function Login(){
    //  CHECK IF USER IS NOT LOGGED IN
    function loginUser(formData: any) {
        const email = formData.get("email")
        const password = formData.get("password")
        
        if(!validateEmail(email)){
            alert("Use a proper email")
            return
        }
        if(!validatePassword(password)){
            alert("Enter a proper password")
            return
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
            alert("User Logged In")
            console.log(res)
        })
    }
    return(
        <>
        <div className={outer_div}>
            <img src="logo.png" alt="anim" className="w-40 h-40 block border border-black rounded-full overflow-hidden"></img>
            <h1>LOGIN: </h1>
            <form action={loginUser} className={inner_form}>
                <label htmlFor="email">EMAIL: </label>
                <input type="text" id="email" name="email" placeholder="Email" required className={input_text}></input>

                <label htmlFor="password">PASSWORD: </label>
                <input type="password" id="password" name="password" placeholder="Password" required className={input_text}></input>
                
                <button type="submit" className={submit}>SIGN IN</button>
            </form>
            <a href="">Forgot Password</a>
        </div>
        </>
    )
}

export function Logout(){
    //  CHECK IF USER IS LOGGED IN
    function LogoutUser(){
        axios({
            method: 'post',
            url: '/user/Logout'
        })
        .then(
            () => alert("Logged Out!")
        )
    }
    

    return (
        <>
        <form action={LogoutUser}>
            <button type="submit">LOGOUT</button>
        </form>
        </>   
    )
}

export function Profile(){
    //  CHECK IF USER IS LOGGED IN
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: ""
    });
    
    function GetProfile(){
        useEffect(()=>{
            setInterval(() => {
                axios({
                    method: "GET",
                    url: '/user/Profile',
                })
                .then(res => {
                    if(res.data == "CODES.UNAUTHORIZED"){
                        console.log(1)
                        alert("RELOGIN")
                        
                    }
                    setProfile(prof => prof = {
                        name: res.data["name"],
                        email: res.data["email"],
                        phone: res.data["phone"]
                    });
                })
                .catch()
            }, 1000);
        }, []);
    }
    GetProfile()

    return (
        <>
        <div className="flex flex-col">
            <h1>PROFILE: </h1>
            <h1>Name: {profile.name}</h1>
            <h1>Email: {profile.email}</h1>
            <h1>Phone: {profile.phone}</h1>
        </div>
        </>
    );
}

export function UpdateProfile(){
    function UpdateUserProfile(formData: any) {
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
        .then(res => console.log(res))
        //REDIRECT TO PROFILE
    }
    
    return (
        <>
        <div className={outer_div}>
            <h1>UPDATE PROFILE: </h1>
            <form action={UpdateUserProfile} className={inner_form}>
                <label htmlFor="name" className="flex flex-row items-center">NAME: </label>
                <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>

                <label htmlFor="email" className="flex flex-row items-center">EMAIL: </label>
                <input type="email" id="email" name="email" placeholder="Email" required className={input_text}></input>
                

                <label htmlFor="phone" className="flex flex-row items-center">PHONE: </label>
                <input type="number" id="phone" name="phone" placeholder="Phone" required className={input_text}></input>

                <button type="submit" className={submit}>UPDATE PROFILE</button>
            </form>
            <br />
            <NavLink to='/user/UpdatePassword'><button className={submit}>UPDATE PASSWORD</button></NavLink>
        </div>
        
        </>
    );
}

export function UpdatePassword(){
    function UpdateUserPassword(formData: any){
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
        .then(res => console.log(res))
        //REDIRECT TO LOGIN
    }
    
    return (
        <>
        <div className={outer_div}>
            <h1>UPDATE PASSWORD: </h1>
            <form action={UpdateUserPassword} className={inner_form}>
                <label htmlFor="password" className="flex flex-row grow items-center">ENTER PASSWORD: </label>
                <input type="password" id="password" name="password" placeholder="Enter Password" required className={input_text}></input>
                

                <label htmlFor="password2" className="flex flex-row items-center">ENTER PASSWORD AGAIN: </label>        
                <input type="password" id="password2" name="password2" placeholder="Enter Password Again" required className={input_text}></input>
                

                <button type="submit" className={submit}>UPDATE PASSWORD</button>
            </form>
        </div>
        </>
    )
}

//  ROLES

export function SetUserRole(){
    function RequestRoles(formData: any){
        const list = formData.get("list")
        const approver = formData.get("approver")
        axios({
            method: 'post',
            url: '/roles/CreateRequest',
            data: {
                list: list,
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
                <form action={RequestRoles} className={inner_form}>
                    <label htmlFor="id">ROLE: </label>
                    <select name="id" id="id">
                        {
                            roles?.map(
                                items => <option key={items["ID"]} value={items["ID"]}>{items["NAME"]}</option>
                            )
                        }
                    </select>
                    
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
    const [myroles, setRoles] = useState([])

    function MyRole(){
        useEffect(() => {
            setTimeout(() => {
                axios({
                    method: 'get',
                    url: '/roles/MyRoles',
                    data: {
                    }
                })
                .then(res => {
                    if(Array.isArray(res.data))
                        setRoles(sr => sr = res.data)
                    else
                        setRoles(sr => sr = [])
                })
            }, 1000)
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

export function RemoveMyRoles(props: any){
    function RemoveMyRole(formData: any){
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
        <form action={RemoveMyRole} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}><img></img></button>
        </form>
        </>
    )
}

export function GetRequests(){
    const [r, setReq] = useState([]);
    function GetReq(){
        useEffect(()=>{
            setTimeout(() => {
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
            }, 1000)
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
    const [myreq, setMyReq] = useState([]);
    
    function GetMyReq(){
        useEffect(() => {
            setTimeout(() => {
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
            }, 1000)
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

export function RemoveRequest(props: any){
    
    function RemoveReq(formData: any){
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
        <form action={RemoveReq} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}><img></img></button>
        </form>
        </>
    )
}

export function Approve(props: any){
    function App(formData: any){
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
        <form action={App} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}><img></img></button>
        </form>
        </>
    )
}

export function Deny(props: any){
    function Den(formData: any){
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
        <form action={Den} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}><img></img></button>
        </form>
        </>
    )
}
