import axios from "axios";
import { useEffect, useState } from "react";

import { Body } from "../shared/Body.jsx";
import { inner_form, input_text, outer_div, submit } from "../main.jsx";

const menuItems = [
    {path: '/skillset/Add', text: 'Add Skill Set'},
    {path: '/skillset/Update', text: 'Update Skill Set'},
    {path: '/skillset/skills/Add', text: 'Add Skill'},
    {path: '/skillset/skills/Update', text: 'Update Skill'},
]

export function SkillSet(){
    return(
        <>         
            <Body menuItems={menuItems}/>
        </>
    )
}

export function ReadSkillSet(){
    const [skillSet, setSkillSet] = useState([])
    useEffect(() => {
        axios({
            method: "get",
            url: "skillset/ReadAll",
            data: {}
        }
        )
        .then(res => {
            if(res.status == 200){
                if(Array.isArray(res.data))
                    setSkillSet(_ => _ = res.data)
            }
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }, [])
    return skillSet
}

export function AddSkillSet(){
    function ASS(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const name = formData.get("name")

        axios({
            method: "post",
            url: "skillset/Add",
            data: {
                name: name
            }
        }
        )
        .then(res => {
            if(res.status == 201)
                alert("Skillset Added")
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
                    <h1>CREATE SKILLSET:</h1>
                    <form onSubmit={ASS} className={inner_form}>
                        <label htmlFor="name">NAME: </label>
                        <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>
        
                        <button type="submit" className={submit}>CREATE</button>
                    </form>
                </div>
                <div className={outer_div}>
                    <ReadSkillSetTable />
                </div>
            </div>
        </>
    )
}

export function ReadSkillSetTable(){
    const skillSet = ReadSkillSet()
    return(
        <table >
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
                {
                    skillSet.map( item =>
                        <tr key={item["ID"]}>
                            <td>{item["NAME"]}</td>
                            <td><DeleteSkillSet id={item["ID"]}/></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export function UpdateSkillSet(){
    function USS(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const id = formData.get(["id"])
        const newname = formData.get(["newname"])
        
        axios({
            method: "post",
            url: "skillset/Update",
            data: {
                id: id,
                newname: newname
            }
        }
        )
        .then(res => {
            if(res.status == 200)
                alert("Skillset Updated")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }
    const skillSet = ReadSkillSet()
    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>UPDATE SKILLSET:</h1>
                <form onSubmit={USS} className={inner_form}>
                    <select name="id" id="id" required className={input_text}>
                        {
                            skillSet?.map(
                                items => <option key={items["ID"]} value={items["ID"]}>{items["NAME"]}</option>
                            )
                        }
                    </select>

                    <label htmlFor="newname">NAME: </label>
                    <input type="text" id="newname" name="newname" placeholder="Name" required className={input_text}></input>
        
                    <button type="submit" className={submit}>UPDATE</button>
                </form>
            </div>
        </div>
        </>
    )
}

export function DeleteSkillSet(props){
    function DSS(e){
        e.preventDefault()

        axios({
            method: "post",
            url: "skillset/Remove",
            data: {

            }
        }
        )
        .then(res => {
            if(res.status == 200)
                alert("Skillset Removed")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    return(
        <>
        <form onSubmit={DSS} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id} className={submit}>DELETE</button>
        </form>
        </>
    )
}

export function ReadSkill(){
    const [skill, setSkill] = useState([])
    useEffect(() => {
        axios({
            method: "get",
            url: "skillset/skill/ReadAll",
            data: {}
        }
        )
        .then(res => {
            if(res.status == 200){
                if(Array.isArray(res.data))
                    setSkill(_ => _ = res.data)
            }
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }, [])
    return skill
}

export function AddSkill(){
    function AS(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const name = formData.get("name")
        const link = formData.get("link")
        const skillset = formData.get("skillset")

        axios({
            method: "post",
            url: "skillset/skill/Add",
            data: {
                name: name,
                link: link,
                skillset: skillset
            }
        }
        )
        .then(res => {
            if(res.status == 201)
                alert("Skill Added")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }
    
    const skillset = ReadSkillSet()

    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>ADD SKILLS:</h1>
                <form onSubmit={AS} className={inner_form}>
                    <label htmlFor="name">NAME: </label>
                    <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>

                    <label htmlFor="link">LINK: </label>
                    <input type="text" id="link" name="link" placeholder="Link" required className={input_text}></input>

                    <label htmlFor="skillset">SKILLSET: </label>
                    <select name="skillset" id="skillset" required className={input_text}>
                        {
                            skillset?.map(
                                items => <option key={items["ID"]} value={items["ID"]}>{items["NAME"]}</option>
                            )
                        }
                    </select>

                    <button type="submit" className={submit}>ADD</button>
                </form>
            </div>
            <div className={outer_div}>
                <ReadSkillTable />
            </div>
        </div>
        </>
    )
}

export function ReadSkillTable(){
    const skill = ReadSkill()
    
    return(
        <table >
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>LINK</th>
                    <th>SKILLSET</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
                {
                    skill.map( item =>
                        <tr key={item["ID"]}>
                            <td>{item["NAME"]}</td>
                            <td>{item["LINK"]}</td>
                            <td>{item["SKILLSET"]}</td>
                            <td><DeleteSkillSet id={item["ID"]}/></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export function UpdateSkill(){
    function US(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const id = formData.get("id")
        const newname = formData.get("newname")
        const newlink = formData.get("newlink")
        const newskillsetid = formData.get("newskillsetid")

        axios({
            method: "post",
            url: "skillset/skill/Update",
            data: {
                id: id,
                newname: newname,
                newlink: newlink,
                newskillsetid: newskillsetid,
            }
        }
        )
        .then(res => {
            if(res.status == 200)
                alert("Skill Updated")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    const skills = ReadSkill()
    const skillset = ReadSkillSet()
    
    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>UPDATE SKILL:</h1>
                <form onSubmit={US} className={inner_form}>
                    <label htmlFor="id">SKILL: </label>
                    <select name="id" id="id" required className={input_text}>
                        {
                            skills?.map(
                                items => <option key={items["ID"]} value={items["ID"]}>{items["NAME"]}</option>
                            )
                        }
                    </select>
                    <label htmlFor="newname">NAME: </label>
                    <input type="text" id="newname" name="newname" placeholder="Name" required className={input_text}></input>

                    <label htmlFor="newlink">LINK: </label>
                    <input type="text" id="newlink" name="newlink" placeholder="Link" required className={input_text}></input>

                    <label htmlFor="newskillsetid">SKILLSET: </label>
                    <select name="newskillsetid" id="newskillsetid" required className={input_text}>
                        {
                            skillset?.map(
                                items => <option key={items["ID"]} value={items["ID"]}>{items["NAME"]}</option>
                            )
                        }
                    </select>
                    <button type="submit" className={submit}>UPDATE</button>
                </form>
            </div>
        </div>
        </>
    )
}

export function DeleteSkill(props){
    function DS(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const id = formData.get("id")
        axios({
            method: "post",
            url: "skillset/skill/delete",
            data: {
                id: id
            }
        }
        )
        .then(res => {
            if(res.status == 200)
                alert("Skill Removed")
            else if(res.status == 400)
                alert("Check form elements")
            else
                alert("Unknown Error")
        })
        .catch(e => console.log(e))
    }

    return(
        <>
        <form onSubmit={DS} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id} className={submit}>DELETE</button>
        </form>
        </>
    )
}
