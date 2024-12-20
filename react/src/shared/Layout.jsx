import  { NavLink } from 'react-router-dom'

import logo from "../public/ACADEMIX.svg";
import accIcon from "../public/person-circle.svg";
import bellIcon from "../public/bell.svg";
import listIcon from "../public/list.svg";

const padding = "py-2 px-4";
const border = "border border-black border-opacity-0 rounded hover:bg-cyan-700 hover:text-white hover:border hover:border-black";
const size = "w-auto h-full";

export function Header()
{
    return (
        <nav className='w-full h-full relative flex grow'>
            <div className={'w-full h-full float-left flex flex-row items-center justify-between'}>
                <div className={size+' float-left flex items-center'}> 
                    <button type="button" className={size + ' flex md:hidden'}>
                        <img src={listIcon} alt="List of Items" className={size+' '+border}/>    
                    </button>
                </div>
                <div id="LEFT" className={size+' float-left flex items-center md:grow'}>
                    <div id="LOGO" className='w-auto h-1/2 mx-4'><NavLink to="/" ><img src={logo} alt="ACADEMIX LOGO" className={size} /></NavLink></div>
                    <div id="TABS" className={size+' flex items-center'}>
                        
                        <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                        <ul className="flex">
                            <li className={padding+' '+border}><NavLink to="/teachers" >TEACHERS</NavLink></li>
                            <li className={padding+' '+border}><NavLink to="/students">STUDENTS</NavLink></li>
                            <li className={padding+' '+border}><NavLink to="/about" >ABOUT</NavLink></li>
                        </ul>
                        </div>
                    </div>
                </div>
                <div id="RIGHT" className={size + ' float-right flex items-center'}>
                    <div id="NOTIFICATIONS" className={padding+' '+size+' '+border}><NavLink to="/Notifications" ><img src={bellIcon} alt="BELL ICON" className={size}/></NavLink></div>
                    <div id="ACCOUNT" className={padding+' '+size+' '+border}><NavLink to="/User" ><img src={accIcon} alt="ACCOUNT ICON" className={size}/></NavLink></div>
                </div>
            </div>
        </nav>
    );
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
