import axios from "axios";
import {useState, useEffect} from 'react';
import { Body } from "../components/Body.tsx";
import { validateEmail, validatePassword, validatePhone } from "./../shared/validate.tsx";

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

const input_text = "p-2 my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

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
            url: '/user/Login',
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
        <div className="w-4/6 justify-items-center bg-blue-500 rounded-xl">
            <h1>REGISTER:</h1>
            <form action={RegisterUser} className="w-4/6 py-2 flex flex-col">
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

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">SIGN UP</button>
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
        
        if(validateEmail(email)){
            alert("Use a proper email")
            return
        }
        if(validatePassword(password)){
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
        <div className="w-4/6 justify-items-center bg-blue-500 rounded-xl py-4">
            <img src="logo.png" alt="anim" className="w-40 h-40 block border border-black rounded-full overflow-hidden"></img>
            <h1>LOGIN: </h1>
            <form action={loginUser} className="w-4/6 py-2 flex flex-col">
                <label htmlFor="email">EMAIL: </label>
                <input type="text" id="email" name="email" placeholder="Email" required className={input_text}></input>

                <label htmlFor="Log_password">PASSWORD: </label>
                <input type="text" id="Log_password" name="password" placeholder="Password" required className={input_text}></input>
                
                <button type="submit" className="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">SIGN IN</button>
            </form>
            <a href="">Forgot Password</a>
        </div>
        </>
    )
}

export function Logout(){
    //  CHECK IF USER IS LOGGED IN
    function LogoutUser(){
        useEffect(()=>{
            axios({
                method: 'post',
                url: '/user/Logout'
            })
            .then(
                () => alert("Logged Out!")
            )
        }, [])
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
        <div className="w-full justify-items-center rounded-xl">
            <h1>UPDATE PROFILE: </h1>
            <form action={UpdateUserProfile} className="w-4/6 py-2 flex flex-col">
                <label htmlFor="name" className="flex flex-row items-center">NAME: </label>
                <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>

                <label htmlFor="email" className="flex flex-row items-center">EMAIL: </label>
                <input type="email" id="email" name="email" placeholder="Email" required className={input_text}></input>
                

                <label htmlFor="phone" className="flex flex-row items-center">PHONE: </label>
                <input type="number" id="phone" name="phone" placeholder="Phone" required className={input_text}></input>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">UPDATE PROFILE</button>
            </form>
        </div>
        <div className="w-full justify-items-center rounded-xl">
            <h1>UPDATE PASSWORD: </h1>
            <form action={UpdateUserPassword} className="w-4/6 py-2 flex flex-col">
                <label htmlFor="password" className="flex flex-row grow items-center">ENTER PASSWORD: </label>
                <input type="password" id="password" name="password" placeholder="Enter Password" required className={input_text}></input>
                

                <label htmlFor="password2" className="flex flex-row items-center">ENTER PASSWORD AGAIN: </label>        
                <input type="password" id="password2" name="password2" placeholder="Enter Password Again" required className={input_text}></input>
                

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">UPDATE PASSWORD</button>
            </form>
        </div>
        </>
    );
}
