import { Body } from "./shared/Body"

const menuItems = [
    {path: "../Department", text: "DEPARTMENT"},
    {path: "../Skillset", text: "SKILLSET"},
    {path: "../Roles", text: "ROLES"},
    {path: "../Permissions", text: "PERMISSIONS"},
]

export function Admin(){
    return(
        <Body menuItems={menuItems}/>
    )
}
