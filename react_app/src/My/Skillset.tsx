import axios from "axios";
import { Body } from "../components/Body";
import { useEffect, useState } from "react";
import { inner_form, input_text, outer_div, submit } from "../App";

const menuItems = [
    {path: '/skillset/Add', text: 'Add Skill Set', comp: <AddSkillSet/>},
    {path: '/skillset/Update', text: 'Update Skill Set', comp: <UpdateSkillSet/>},
    {path: '/skillset/skills/Add', text: 'Add Skill', comp: <AddSkill/>},
    {path: '/skillset/skills/Update', text: 'Update Skill', comp: <UpdateSkill/>},
]

export function SkillSet(){
    return(
        <>         
            <Body menuItems={menuItems}/>
        </>
    )
}

function ReadSkillSet(){
    const [skillSet, setSkillSet] = useState([])
    useEffect(() => {
        axios({
            method: "get",
            url: "skillset/ReadAll",
            data: {

            }
        }
        )
        .then(res => {
            setSkillSet(ss => ss = res.data)
        })
    }, [])
    return skillSet
}

export function AddSkillSet(){
    function ASS(formData: any){
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
            if(res.status == 200)
                alert("Skill set Created")
        })
    }
    const skillSet = ReadSkillSet()
    return(
        <>
            <div className={'w-full h-full flex flex-col items-center'}>
                <div className={outer_div}>
                    <h1>CREATE SKILLSET:</h1>
                    <form action={ASS} className={inner_form}>
                        <label htmlFor="name">NAME: </label>
                        <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>
        
                        <button type="submit" className={submit}>CREATE</button>
                    </form>
                </div>
                <div className={outer_div}>
                <table className="w-full justify-items-center text-center">
                    <thead>
                        <tr>
                            <th>NAME: </th>
                            <th>REMOVE: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        skillSet?.map(
                            (items) => 
                            <tr key={items["ID"]}>
                                <td>{items["NAME"]}</td>
                                <td>{<DeleteSkillSet id={items["ID"]}/>}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
}

export function UpdateSkillSet(){
    function USS(formData: any){
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
                alert("SkillSet Updated")
        })
    }
    const skillSet = ReadSkillSet()
    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>UPDATE SKILLSET:</h1>
                <form action={USS} className={inner_form}>
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

export function DeleteSkillSet(props: any){
    function DSS(){
        axios({
            method: "post",
            url: "skillset/Remove",
            data: {

            }
        }
        )
        .then(res => {
            alert("Skill Set Deleted")
            console.log(res)
        })
    }

    return(
        <>
        <form action={DSS} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}>DELETE</button>
        </form>
        </>
    )
}

function ReadSkill(){
    const [skill, setSkill] = useState([])
    useEffect(() => {
        axios({
            method: "get",
            url: "skillset/skill/ReadAll",
            data: {

            }
        }
        )
        .then(res => {
            setSkill(s => s = res.data)
        })
    }, [])
    return skill
}

export function AddSkill(){
    function AS(formData: any){
        const name = formData.get("name")
        const skillset = formData.get("skillset")
        axios({
            method: "post",
            url: "skillset/skill/Add",
            data: {
                name: name,
                skillset: skillset
            }
        }
        )
        .then(res => {
            alert("Skill Added")
        })
    }
    
    const skillset = ReadSkillSet()
    console.log(skillset)
    const skills = ReadSkill()

    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>ADD SKILLS:</h1>
                <form action={AS} className={inner_form}>
                    <label htmlFor="name">NAME: </label>
                    <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>

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
                <table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>SKILL SET</th>
                            <th>REMOVE SKILL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            skills?.map(
                                items => 
                                    <tr key={items["ID"]}>
                                        <td>{items["NAME"]}</td>
                                        <td>{items["SKILLSET"]}</td>
                                        <td>{<DeleteSkill id={items["ID"]}/>}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                
            </div>
        </div>
        </>
    )
}

export function UpdateSkill(){
    function US(formData: any){
        const skill = formData.get("skill")
        const name = formData.get("name")
        axios({
            method: "post",
            url: "skillset/skill/Update",
            data: {
                skill: skill,
                name: name
            }
        }
        )
        .then(res => {
            alert("Updated Skills")
            console.log(res)
        })
    }
    const skills = ReadSkill()
    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>UPDATE SKILL:</h1>
                <form action={US} className={inner_form}>
                    <label htmlFor="skill">SKILL: </label>
                    <select name="skill" id="skill" required className={input_text}>
                        {
                            skills?.map(
                                items => <option key={item["ID"]} value={item["ID"]}>{item["NAME"]}</option>
                            )
                        }
                    </select>
                    <label htmlFor="name">NAME: </label>
                    <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>

                    
                    <button type="submit" className={submit}>UPDATE</button>
                </form>
            </div>
        </div>
        </>
    )
}

export function DeleteSkill(props: any){
    function DS(){
        axios({
            method: "post",
            url: "skillset/skill/delete",
            data: {

            }
        }
        )
        .then(res => {
            alert("Skill Deleted")
            console.log(res)
        })
    }

    return(
        <>
        <form action={DS} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id}>DELETE</button>
        </form>
        </>
    )
}
