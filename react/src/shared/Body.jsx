import { Outlet} from 'react-router-dom';
import { SideBar } from './Layout.jsx';

export function Body(props){
    if(props.menuItems == null)
        return(<Outlet/>)
    return(
        <>                
            <div className="h-full w-full flex flex-col md:flex-row items-center justify-center">
                <SideBar items={props.menuItems}/>
                <div className="h-full w-5/6 md:w-full flex grow items-center justify-center overflow-scroll">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
    