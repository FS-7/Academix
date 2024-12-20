import axios from "axios";
import { inner_form, input_text, outer_div, submit } from "../App";
import { Body } from "../shared/Body.jsx";
import { validateEmail } from "../shared/validate";
import { useState } from "react";

const menuItems = [
    {path: 'Register', text: 'Register', comp: <Register />},
    {path: 'Status', text: 'Status', comp: <Status />},
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
        <table className="table-auto">
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>STUDENT 1</th>
                    <th>STUDENT 2</th>
                    <th>STUDENT 3</th>
                    <th>STUDENT 4</th>
                    <th>APPROVER</th>
                    <th>STATUS</th>
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
    function RegisterProject(formData){
        const name = formData.get("project")
        const teamlead = formData.get("teamlead")
        const member1 = formData.get("member1")
        const member2 = formData.get("member2")
        const member3 = formData.get("member3")
        const guide = formData.get("guide")
        const coordinator = formData.get("coordinator")

        if(!validateEmail(guide)){
            alert("Check guide Email")
            return 
        }
        if(!validateEmail(coordinator)){
            alert("Check coordinator Email") 
            return
        }

        axios({
            method: "post",
            url: 'progress/Add',
            data: {
                name: name,
                teamlead: teamlead,
                member1: member1,
                member2: member2,
                member3: member3,
                guide: guide,
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
                    <label htmlFor="project">PROJECT NAME:</label>
                    <input type="text" id="project" name="project" placeholder="Project Name" className={input_text} required />

                    <label htmlFor="teamlead">TEAM LEAD:</label>
                    <input type="text" id="teamlead" name="teamlead" placeholder="Team Lead (USN)" className={input_text} required />
                    <label htmlFor="member1">MEMBER 1:</label>
                    <input type="text" id="member1" name="member1" placeholder="Member 1 (USN)" className={input_text} />
                    <label htmlFor="member2">MEMBER 2:</label>
                    <input type="text" id="member2" name="member2" placeholder="Member 2 (USN)" className={input_text} />
                    <label htmlFor="member3">MEMBER 3:</label>
                    <input type="text" id="member3" name="member3" placeholder="Member 3 (USN)" className={input_text} />

                    <label htmlFor="approver">APPROVER:</label>
                    <input type="text" id="approver" name="approver" placeholder="Approver Email" className={input_text} required />
                    <label htmlFor="coordinator">COORDINATOR:</label>
                    <input type="text" id="coordinator" name="coordinator" placeholder="Coordinator Email" className={input_text} required />
                    
                    <button type="submit" className={submit}>Register</button>
                </form>
            </div>
        </div>
        </>
    )
}

export function RemoveProject(){
    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>REGISTER PROJECT:</h1>
                <form onSubmit={RegisterProject} className={inner_form}>
                    <label htmlFor="project">PROJECT NAME:</label>
                    <input type="text" id="project" name="project" placeholder="Project Name" className={input_text} required />
                    
                    <button type="submit" className={submit}>Register</button>
                </form>
            </div>
        </div>
        </>
    )
}

export function CreatePhase(){
    return(
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>CREATE PHASE:</h1>
                <form onSubmit={RegisterProject} className={inner_form}>
                    <label htmlFor="project">PROJECT NAME:</label>
                    <input type="text" id="project" name="project" placeholder="Project Name" className={input_text} required />

                    <label htmlFor="teamlead">TEAM LEAD:</label>
                    <input type="text" id="teamlead" name="teamlead" placeholder="Team Lead (USN)" className={input_text} required />
                    <label htmlFor="member1">MEMBER 1:</label>
                    <input type="text" id="member1" name="member1" placeholder="Member 1 (USN)" className={input_text} />
                    <label htmlFor="member2">MEMBER 2:</label>
                    <input type="text" id="member2" name="member2" placeholder="Member 2 (USN)" className={input_text} />
                    <label htmlFor="member3">MEMBER 3:</label>
                    <input type="text" id="member3" name="member3" placeholder="Member 3 (USN)" className={input_text} />

                    <label htmlFor="approver">APPROVER:</label>
                    <input type="text" id="approver" name="approver" placeholder="Approver Email" className={input_text} required />
                    <label htmlFor="coordinator">COORDINATOR:</label>
                    <input type="text" id="coordinator" name="coordinator" placeholder="Coordinator Email" className={input_text} required />
                    
                    <button type="submit" className={submit}>Register</button>
                </form>
            </div>
        </div>
    )
}

export function DeletePhase(){
    return(
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>REGISTER PROJECT:</h1>
                <form onSubmit={RegisterProject} className={inner_form}>
                    <label htmlFor="project">PROJECT NAME:</label>
                    <input type="text" id="project" name="project" placeholder="Project Name" className={input_text} required />
                    
                    <button type="submit" className={submit}>Register</button>
                </form>
            </div>
        </div>
    )
}

export function SubmitPhase(){
    return(
        
    )
}

export function UpdatePhase(){
    function UP(formData){
        const id = formData.get("id")
        const synopsis = formData.get("synopsis")
        const presentation = formData.get("presentation")

        axios({
            method: "post",
            url: 'progress/UpdatePhase',
            data: {
                id: id,
                synopsis: synopsis,
                presentation: presentation
            }
        })
        .then(
            res => {
                if(res.status == 200)
                    alert("Updated")
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
                <h1>Submit Phase:</h1>
                <form onSubmit={UP} className={inner_form}>
                    <label htmlFor="link"></label>
                    <input type="link" id="link" name="link" className={input_text}/>
                    <label htmlFor="approver">APPROVER</label>
                    <input type="text" id="approver" value={getApproverAndCoordinator()[0]} disabled className={input_text}/>

                    <label htmlFor="coodinator">COORDINATOR</label>
                    <input type="text" id="coordinator" value={getApproverAndCoordinator()[1]} disabled className={input_text}/>
        
                    <button type="submit" className={submit}>Submit</button>
                </form>
            </div>
        </div>
        </>
    )
}
