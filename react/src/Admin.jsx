import { Body } from "./shared/Body"

const menuItems = [
    {path: "../Skillset", text: "SKILLSET"},
    {path: "../Department", text: "DEPARTMENT"},
    {path: "../Roles", text: "ROLES"},
]

export function Admin(){
    return(
        <Body menuItems={menuItems}/>
    )
}
