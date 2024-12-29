import axios from "axios";
import { useState } from "react";

import { inner_form, input_text, outer_div, submit } from "../main.jsx";
import { Body } from "../shared/Body.jsx";
import { validateEmail } from "../shared/validate";

const menuItems = [
    {path: 'Status', text: 'Status'},
    {path: 'Register', text: 'Register'},
    {path: 'CreatePhase', text: 'Create Phase'},
]

function getApproverAndCoordinator(){
    const [approver, setApprover] = useState()
    const [coodinator, setCoordinator] = useState()

    axios({
        method: 'get',
        url: 'project/getAnC'
    })
    .then(res => {
        if(res.status == 200){
            setApprover(a => a = res.data["APPROVER"])
            setCoordinator(a => a = res.data["COORDINATOR"])
        }
        else if(res.status == 400)
            alert("Check form elements")
        else
            alert("Unknown Error")
    })
    .catch(e => console.log(e))

    return [approver, coodinator]
}

export function Project(){
    return(
        <>
            <Body menuItems={menuItems}/>
        </>
    )
}

export function Status(){
    function getStatus(){
        const [status, setStatus] = useState()
        axios({
            method: "get",
            url: "",
            data: {

            }
        })
        .then(res => {

        })
        .catch(e => console.log(e))
    }
    return(
        <>
        <table className="w-full table-auto">
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>STUDENT 1</th>
                    <th>STUDENT 2</th>
                    <th>STUDENT 3</th>
                    <th>STUDENT 4</th>
                    <th>PROJECT STATUS</th>
                    <th>COORDINATOR</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
        </>
    )
}

export function Register(){
    function RegisterProject(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const name = formData.get("project")
        const member1 = formData.get("member1")
        const member2 = formData.get("member2")
        const member3 = formData.get("member3")
        const member4 = formData.get("member4")
        const coordinator = formData.get("coordinator")

        if(!validateEmail(coordinator)){
            alert("Check coordinator Email") 
            return
        }

        axios({
            method: "post",
            url: 'progress/Add',
            data: {
                name: name,
                member1: member1,
                member2: member2,
                member3: member3,
                member4: member4,
                coordinator: coordinator
            }
        })
        .then(
            res => {
                if(res.status == 201)
                    alert("Registered")
                else if(res.status == 400)
                    alert("Check form elements")
                else
                    alert("Error")
            }
        )
        .catch(e => console.log(e))

    }

    return(
        <>
        
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>REGISTER PROJECT:</h1>
                <form onSubmit={RegisterProject} className={inner_form}>
                    <label htmlFor="project">PROJECT NAME: </label>
                    <input type="text" id="project" name="project" placeholder="Project" required className={input_text}></input>
                    
                    <label htmlFor="member1">MEMBER 1: </label>
                    <input type="text" id="member1" name="member1" placeholder="Member 1" required className={input_text}></input>
                    
                    <label htmlFor="member2">MEMBER 2: </label>
                    <input type="text" id="member2" name="member2" placeholder="Member 2" className={input_text}></input>

                    <label htmlFor="member3">MEMBER 3: </label>
                    <input type="text" id="member3" name="member3" placeholder="Member 3" className={input_text}></input>

                    <label htmlFor="member4">MEMBER 4: </label>
                    <input type="text" id="member4" name="member4" placeholder="Member 4" className={input_text}></input>

                    <label htmlFor="coordinator">COORDINATOR: </label>
                    <input type="text" id="coordinator" name="coordinator" placeholder="Coordinator" required className={input_text}></input>
        
                    <button type="submit" className={submit}>REGISTER</button>
                </form>
            </div>
            <div>

            </div>
        </div>
        </>
    )
}

export function GetProjects(){

    return(
        <table>
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>COORDINATOR</th>
                    <th>STATUS</th>
                </tr>
            </thead>
        </table>
    )
}

export function Remove(props){
    function RemoveProject(e){
        e.preventDefault()
    }
    

    return(
        <>
            <form onSubmit={RemoveProject} className={inner_form}>
                <input type="text" id="id" name="id" value={props.id} required hidden readOnly ></input>
                <button type="submit" className={submit}>DELETE</button>
            </form>
        </>
    )
}

export function CreatePhase(){
    
    const d = new Date()

    function CreateP(){
        e.preventDefault()
    }

    const ProjectList = []
    const AnC = getApproverAndCoordinator()

    return(
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>CREATE PHASE:</h1>
                <form onSubmit={CreateP} className={inner_form}>
                    <label htmlFor="project">PROJECT: </label>
                    <select id="project" name="project" placeholder="Project" required className={input_text}>

                    </select>

                    <label htmlFor="name">PHASE NAME: </label>
                    <input type="text" id="name" name="name" placeholder="Phase Name" required className={input_text}></input>

                    <label htmlFor="date">Due Date: </label>
                    <input type="date" id="date" name="date" placeholder="Due Date" min={d.toJSON().slice(0, 10)} required className={input_text}></input>
        
                    <button type="submit" className={submit}>CREATE</button>
                </form>
            </div>
        </div>
    )
}

export function DeletePhase(props){
    function RemoveP(e){
        e.preventDefault()
    }

    return(
        <div className={outer_div}>
            <form onSubmit={RemoveP} className={inner_form}>
                <input type="text" id="id" name="id" value={props.id} required hidden readOnly></input>
                <button type="submit" className={submit}>CREATE</button>
            </form>
        </div>
    )
}

export function SubmitPhase(){
    return(
        <></>
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
            url: 'project/approve',
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
            <input type="text" name="id" value={props.id} required hidden readOnly></input>
            <button type="submit">APPROVE</button>
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
            url: 'project/deny',
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
            <input type="text" name="id" value={props.id} required hidden readOnly></input>
            <button type="submit">DENY</button>
        </form>
        </>
    )
}
