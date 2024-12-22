import  { NavLink } from 'react-router-dom'

import logo from "../public/ACADEMIX.svg";
import accIcon from "../public/person-circle.svg";
import bellIcon from "../public/bell.svg";
import listIcon from "../public/list.svg";

const padding = "py-2 px-4";
const border = "border border-black border-opacity-0 rounded hover:bg-cyan-700 hover:text-white hover:border hover:border-black";
const size = "h-full w-auto";

export function Header()
{
    return (
        <nav className='w-full h-full flex'>
            <div className={'w-full h-full float-left flex flex-row items-center justify-between'}>
                <DropdownIcon />
                <LeftTabs />
                <RightTabs />
            </div>
        </nav>
    );
}

export function DropdownIcon(){
    return(
        <div className={size+' float-left flex items-center'}> 
            <button type="button" className={size + ' flex md:hidden'}>
                <img src={listIcon} alt="List of Items" className={size+' '+border}/>    
            </button>
        </div>
    )
}

export function LeftTabs(){
    const listItems = [
        {link: "Project", text: "PROJECT"},
        {link: "Attendance", text: "ATTENDANCE"},
        {link: "Admin", text: "ADMIN"}
    ]

    return(
        <>
        <div id="LEFT" className={'h-full w-auto float-left flex items-center md:grow'}>
            <Logo />
            <div id="TABS" className={size+' flex items-center font-bold'}>
                <Links listItems={listItems}/>
            </div>
        </div>
        </>
    )
}

export function RightTabs(){
    const tabs = [
        {id: "NOTIFICATIONS", link: "/Notifications", icon: bellIcon, alt: "BELL ICON"},
        {id: "ACCOUNT", link: "/User", icon: accIcon, alt: "ACCOUNT ICON"}
    ]

    return(
        <div id="RIGHT" className={size + ' float-right flex items-center'}>
            {tabs.map(item => <Tabs key={item.id} properties={item}/>)}
        </div>
    )
}

export function Logo(){
    return(
        <div id="LOGO" className='w-auto h-1/2 mx-4'><NavLink to="/" ><img src={logo} alt="ACADEMIX LOGO" className={size} /></NavLink></div>
    )
}

export function Links(props){
    return(
        <div className="h-full w-auto hidden md:flex md:items-center md:justify-center md:gap-5">
            <ul className="flex">
                {props.listItems.map(items =>
                    <li key={items.link} className="h-full w-auto px-4 rounded hover:border hover:border-black hover:bg-cyan-500">
                        <NavLink to={items.link}>
                            {items.text}
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    )
}

export function Tabs(props){
    return(
        <div id={props.properties.id} className={padding+' '+size+' '+border}>
            <NavLink to={props.properties.link} >
                <img src={props.properties.icon} alt={props.properties.alt} className={size} />
            </NavLink>
        </div>
    )
}

export function SideBar(props){
    return (
        <div className='w-full h-auto md:w-1/6 md:h-full flex flex-row md:flex-col grow px-2 font-black text-xl text-center bg-gradient-to-b from-cyan-400 to-blue-700'>
            {props.items.map(
                (item) => <NavLink key={item.path} to={item.path} className={"w-full py-2 "+border}>{item.text}</NavLink>
            )}
        </div>
    );
}


