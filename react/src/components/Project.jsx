import axios from "axios";
import { inner_form, input_text, outer_div, submit } from "../main.jsx";
import { Body } from "../shared/Body.jsx";
import { validateEmail } from "../shared/validate";
import { useState } from "react";
import { Form } from "../shared/Templates.jsx";

const menuItems = [
    {path: 'Register', text: 'Register'},
    {path: 'CreatePhase', text: 'Create Phase'},
    {path: 'Status', text: 'Status'},
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
                    <th>APPROVER</th>
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

    const form = {
        
        submitFunction: RegisterProject,
        method: "POST",
        heading: "REGISTER PROJECT",
        elements: [
            {id: "project", name: "project", type: "text", placeholder: "Project Name", display: "PROJECT NAME", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "teamlead", name: "teamlead", type: "text", placeholder: "Team Lead (USN)", display: "TEAM LEAD", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "member1", name: "member1", type: "text", placeholder: "Member 1 (USN)", display: "MEMBER 1", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "member2", name: "member2", type: "text", placeholder: "Member 2 (USN)", display: "MEMBER 2", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "member3", name: "member3", type: "text", placeholder: "Member 3 (USN)", display: "MEMBER 3", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "approver", name: "approver", type: "text", placeholder: "Approver (EMAIL)", display: "APPROVER", value: "", optionsList: [], isRequired: true, isDisabled: false},
            {id: "coordinator", name: "coordinator", type: "text", placeholder: "Coordinator (EMAIL)", display: "COORDINATOR", value: "", optionsList: [], isRequired: true, isDisabled: false},
        ],
        submitButton: {id: null, name: null, value: "", text: "REGISTER"}
    }

    return(
        <>
        
        <div className={'w-full h-full flex flex-col items-center'}>
            <Form form={form} />
        </div>
        </>
    )
}

export function Remove(props){
    function RemoveProject(){

    }
    
    const form = {
        submitFunction: RemoveProject,
        method: "POST",
        elements: [],
        submitButton: {id: null, name: props.name, value: props.value, text: "REMOVE"}

    }

    return(
        <>
            <Form form={form} />
        </>
    )
}

export function CreatePhase(){
    function CreateP(){

    }

    const ProjectList = []
    const AnC = getApproverAndCoordinator()

    const form = {
        submitFunction: CreateP,
        method: "POST",
        heading: "CREATE PHASE",
        elements: [
            {id: "project", name: "project", type: "select", placeholder: "Project", display: "PROJECT", value: "", optionsList: ProjectList, isRequired: true, isDisabled: false},
            {id: "approver", name: "approver", type: "text", placeholder: "Approver", display: "APPROVER", value: AnC[0], optionsList: [], isRequired: true, isDisabled: true},
            {id: "coordinator", name: "coordinator", type: "text", placeholder: "Coordinator", display: "COORDINATOR", value: AnC[1], optionsList: [], isRequired: true, isDisabled: true}
        ],
        submitButton: {id: null, name: null, value: "", text: "CREATE"}
    }
    return(
        <div className={'w-full h-full flex flex-col items-center'}>
            <Form form={form}/>
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
        <></>
    )
}

export function UpdatePhase(){
    function UP(e){
        e.preventDefault()

        const formData = FormData(e.target)
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
