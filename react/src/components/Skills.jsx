import axios from "axios";
import { Body } from "../shared/Body.jsx";
import { inner_form, input_text, outer_div, submit } from "../main.jsx";
import { useEffect, useState } from "react";
import { ReadSkill } from "./Skillset.jsx";

export function Skills(){
    return(
        <>         
            <Body menuItems={null}/>
        </>
    )
}

function RUS(){
    const [rus, setRus] = useState([])
    useEffect(() => {
        axios({
            method: "get",
            url: "/skills/ReadAll",
            data: {}
        }
        )
        .then(res => {
            setRus(r => r = res.data)
        })
    }, [])
    if(Array.isArray(rus))
        return rus
    return []
}

export function AddUserSkill(){
    function AUS(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const skill = formData.get("skill")
        axios({
            method: "post",
            url: "skills/Create",
            data: {
                skill: skill
            }
        }
        )
        .then(res => {
            alert("Created")
        })
    }
    const rus = RUS()
    const skills = ReadSkill()
    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>ADD SKILL:</h1>
                <form onSubmit={AUS} className={inner_form}>
                    <label htmlFor="skill">SKILL: </label>
                    <select name="skill" id="skill" required className={input_text}>
                        {
                            skills?.map(
                                items => <option key={items["ID"]} value={items["ID"]}>{items["NAME"]}</option>
                            )
                        }
                    </select>
                    <button type="submit" className={submit}>Add</button>
                </form>
            </div>
            <div className={outer_div}>
                <table>
                    <thead>
                        <tr>
                            <th>SKILL SET</th>
                            <th>SKILL NAME: </th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rus?.map(
                                items => 
                                <tr key={items["ID"]}>
                                    <td>{items["SKILLSET"]}</td>
                                    <td>{items["SKILLNAME"]}</td>
                                    <td><DeleteUserSkill id={items["ID"]}/></td>
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

export function DeleteUserSkill(props){
    function DUS(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const id = formData.get("id")
        axios({
            method: "post",
            url: "skills/Remove",
            data: {
                id: id
            }
        }
        )
        .then(res => {
            alert("Deleted")
        })
    }

    return(
        <>
        <form onSubmit={DUS} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id} >DELETE</button>
        </form>
        </>
    )
}

