import axios from "axios";
import { Body } from "../components/Body";
import { inner_form, input_text, outer_div, submit } from "../App";
import { useEffect, useState } from "react";

const menuItems = [
    {path: "/skills/Add", text: "Add Skills", comp: <AddUserSkill/>},
    {path: "/skills/Update", text: "Update Skills", comp: <UpdateUserSkill />},
]

export function Skills(){
    return(
        <>         
            <Body menuItems={menuItems}/>
        </>
    )
}

function RUS(){
    const [rus, setRus] = useState([])
    useEffect(() => {
        axios({
            method: "get",
            url: "skill/ReadAll",
            data: {}
        }
        )
        .then(res => {
            setRus(r => r = res.data)
        })
    }, [])
    return rus    
}

export function AddUserSkill(){
    function AUS(formData: any){
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
            console.log(res)
        })
    }
    const rus = RUS()
    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>ADD SKILL:</h1>
                <form action={AUS} className={inner_form}>
                    <label htmlFor="skillset">SKILLSET: </label>
                    <select name="skillset" id="skillset" required className={input_text}>
                        {
                            rus?.map(
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rus?.map(
                                item => 
                                <tr key={item["ID"]}>
                                    <td>{item["SKILLNAME"]}</td>
                                    <td><DeleteUserSkill id={item["ID"]}/></td>
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

export function UpdateUserSkill(){
    function UUS(formData: any){

        axios({
            method: "post",
            url: "skills/Update",
            data: {

            }
        }
        )
        .then(res => {
            alert("Updated")
            console.log(res)
        })
    }

    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>UPDATE SKILL:</h1>
                <form action={UUS} className={inner_form}>
                    <label htmlFor="skillset">SKILL: </label>
                    <select name="skillset" id="skillset" required className={input_text}>
                        {
                            
                        }
                    </select>
                    <button type="submit" className={submit}>Add</button>
                </form>
            </div>
        </div>
        </>
    )
}

export function DeleteUserSkill(props: any){
    function DUS(formData: any){
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
            console.log(res)
        })
    }

    return(
        <>
        <form action={DUS} className="py-2 justify-items-center">
            <button type="submit" name="id" value={props.id} ></button>
        </form>
        </>
    )
}

