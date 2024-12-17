import axios from "axios";
import {useState, useEffect} from 'react';
import { Body } from "../components/Body.tsx";
import { validateEmail, validatePassword, validatePhone } from "./../shared/validate.tsx";
import { NavLink } from "react-router-dom";
import { outer_div, inner_form, input_text, submit } from "../App.tsx";

const menuItems = [
    { path: "/user/Register", text: "Register", comp: <Register/>},
    { path: "/user/Login", text: "Login", comp: <Login/>},
    { path: "/user/Logout", text: "Logout", comp: <Logout/>},
    { path: "/user/Profile", text: "Profile", comp: <Profile/>},
    { path: "/user/UpdateProfile", text: "Update Profile", comp: <UpdateProfile/>},
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

