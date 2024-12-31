import axios from "axios";
import { useEffect, useState } from "react";

import { inner_form, input_text, outer_div, submit } from "../main.jsx";
import { Body } from "../shared/Body.jsx";
import { validateEmail } from "../shared/validate";

const menuItems = [
    {path: 'Status', text: 'Status'},
    {path: 'Register', text: 'Register'},
    {path: 'CreatePhase', text: 'Create Phase'},
]

export function Project(){
    return(
        <>
            <Body menuItems={menuItems}/>
        </>
    )
}

export function Status(){
    const [status, setStatus] = useState([])
    async function getStatus(){
        useEffect(() => {
            axios({
                method: "GET",
                url: "/project/status",
                data: {}
            })
            .then(res => {
                if(res.status == 200)
                    if(Array.isArray(res.data))
                        setStatus(_ => _ = res.data)
                else if(res.status == 400)
                    alert('Bad Request')
                else
                    alert('Internal Error')
            })
            .catch(e => console.log(e))
        }, [])
    }

    const res = async() => await getStatus()
    res().then()

    return(
        <>
        {
            status.map(
                item =>
                    <div className="flex flex-col" key={item["ID"]}>
                        <h1>NAME: {item["NAME"]}</h1>
                        <div className="flex flex-row">
                            <h2>GUIDE: {item["GUIDE"]}</h2>
                            <h2>COORDINATOR: {item["COORDINATOR"]}</h2>
                        </div>
                        <h2>MEMBERS</h2>
                        <div className="flex flex-col">
                            <h3>1. {item["TEAMLEAD"]}</h3>
                            <h3>2. {item["MEMBER1"]}</h3>
                            <h3>3. {item["MEMBER2"]}</h3>
                            <h3>4. {item["MEMBER3"]}</h3>
                        </div>
                    </div>
            )
        }
        </>
    )
}

export function Register(){
    function RegisterProject(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const name = formData.get("project")
        const teamlead = formData.get("teamlead")
        const member1 = formData.get("member1")
        const member2 = formData.get("member2")
        const member3 = formData.get("member3")
        const coordinator = formData.get("coordinator")

        if(!validateEmail(coordinator)){
            alert("Check coordinator Email") 
            return
        }

        axios({
            method: "post",
            url: 'project/register',
            data: {
                name: name,
                teamlead: teamlead,
                member1: member1,
                member2: member2,
                member3: member3,
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
                    
                    <label htmlFor="teamlead">TEAM LEAD: </label>
                    <input type="text" id="teamlead" name="teamlead" placeholder="Team Lead" className={input_text}></input>

                    <label htmlFor="member1">MEMBER 1: </label>
                    <input type="text" id="member1" name="member1" placeholder="Member 1" required className={input_text}></input>
                    
                    <label htmlFor="member2">MEMBER 2: </label>
                    <input type="text" id="member2" name="member2" placeholder="Member 2" className={input_text}></input>

                    <label htmlFor="member3">MEMBER 3: </label>
                    <input type="text" id="member3" name="member3" placeholder="Member 3" className={input_text}></input>

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

export function Remove(props){
    function RemoveProject(e){
        e.preventDefault()
        const formData = FormData(e.target)
        const id = formData.get("id")
        
        useEffect(() => {
            axios({
                method: 'post',
                url: '/project/remove',
                data: {
                    id: id
                }
            })
            .then(res => {
                if(res.status == 200)
                    alert('Removed')
                else
                    alert('Error')
            })
        })
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

    function CreateP(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        const project = formData.get("project")
        const name = formData.get("name")
        const duedate = formData.get("duedate")
        axios({
            method: "POST",
            url: "/project/createphase",
            data: {
                project: project,
                name: name,
                duedate: duedate
            }
        })
        .then(res => {
            if(res.status == 201)
                alert("Phase Created")
            else if(res.status == 400)
                alert('Bad Request')
            else
                alert('Internal Error')
        })
        .catch(e => console.log(e))
    }

    const [phases, setPhases] = useState([])
    async function getPhases(){
        useEffect(() => {
            axios({
                method: "GET",
                url: "/project/read",
                data: {}
            })
            .then(res => {
                if(res.status == 200)
                    if(Array.isArray(res.data))
                        setPhases(_ => _ = res.data)
                else if(res.status == 400)
                    alert('Bad Request')
                else
                    alert('Internal Error')
            })
            .catch(e => console.log(e))
        }, [])
    }

    const res = async() => await getPhases()
    res().then()

    return(
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>CREATE PHASE:</h1>
                <form onSubmit={CreateP} className={inner_form}>
                    <label htmlFor="project">PROJECT: </label>
                    <select id="project" name="project" placeholder="Project" required className={input_text}>
                        {
                            phases.map(item => 
                                <option key={item["ID"]} value={item["ID"]}>{item["NAME"]}</option>
                            )
                        }
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
        const formData = FormData(e.target)
        const id = formData.get("id")
        
        useEffect(() => {
            axios({
                method: 'post',
                url: '/project/removephase',
                data: {
                    id: id
                }
            })
            .then(res => {
                if(res.status == 200)
                    alert('Removed')
                else
                    alert('Error')
            })
        })
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
    function RemoveP(e){
        e.preventDefault()
        const formData = FormData(e.target)
        const id = formData.get("id")
        const link = formData.get("link")
        useEffect(() => {
            axios({
                method: 'post',
                url: '/project/submitphase',
                data: {
                    id: id,
                    link: link
                }
            })
            .then(res => {
                if(res.status == 200)
                    alert('Removed')
                else
                    alert('Error')
            })
        })
    }

    return(
        <div className={outer_div}>
            <form onSubmit={RemoveP} className={inner_form}>
                <input type="text" id="id" name="id" value={props.id} required hidden readOnly className={input_text}></input>                
                <label htmlFor="link">LINK: </label>
                <input type="link" id="link" name="link" placeholder="Files Link" required className={input_text}></input>
                <button type="submit" className={submit}>SUBMIT</button>
            </form>
        </div>
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
