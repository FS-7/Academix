import  { Navigate, NavLink, useLocation } from 'react-router-dom'

import logo from "../assets/ACADEMIX.svg";
import accIcon from "../public/person-circle.svg";
import bellIcon from "../public/bell.svg";
import listIcon from "../public/list.svg";

const padding = "py-2 px-4";
const border = "border border-black border-opacity-0 rounded hover:bg-cyan-700 hover:text-white hover:border hover:border-black";
const size = "w-auto h-full";

export function Header()
{
    return (
        <nav className='relative flex grow'>
            <div id="LEFT" className='float-left flex items-center grow'>
                <div id="LOGO" className='w-auto h-1/2 mx-4'><NavLink to="/" ><img src={logo} alt="ACADEMIX LOGO" className={size} /></NavLink></div>
                <div id="TABS" className={size+' flex items-center'}>
                    <button type="button" className='w-auto h-1/2 flex md:hidden'>
                        <img src={listIcon} alt="List of Items" className={size+' '+border}/>    
                    </button>
                    <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                    <ul className="flex">
                        <li className={padding+' '+border}><NavLink to="/teachers" >TEACHERS</NavLink></li>
                        <li className={padding+' '+border}><NavLink to="/students">STUDENTS</NavLink></li>
                        <li className={padding+' '+border}><NavLink to="/admin">ADMIN</NavLink></li>
                        <li className={padding+' '+border}><NavLink to="/about" >ABOUT</NavLink></li>
                    </ul>
                    </div>
                </div>
            </div>
            <div id="RIGHT" className='float-right flex items-center'>
                <div id="NOTIFICATIONS" className={padding+' '+size+' '+border}><NavLink to="/Notifications" ><img src={bellIcon} alt="BELL ICON" className={size}/></NavLink></div>
                <div id="ACCOUNT" className={padding+' '+size+' '+border}><NavLink to="/User" ><img src={accIcon} alt="ACCOUNT ICON" className={size}/></NavLink></div>
            </div>
        </nav>
    );
}

export function SideBar(props: any){
    return (
        <div className='w-full h-auto flex flex-col font-black text-xl text-center'>
            {props.items.map(
                (item: any) => <NavLink key={item.path} to={item.path} className={"w-full py-2 "+border}>{item.text}</NavLink>
            )}
        </div>
    );
}

export function Footer()
{
    return (
        <>
        <div className="grid grid-cols-4 gap-4 bg-black border-black">
            
        </div>
        </>
    );
}

export const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const { children } = props
    const isLoggedIn: boolean = localStorage.getItem('logged_user') !== null;
    const location = useLocation()
  
    return (
      <>{children}</>
    ) 
}