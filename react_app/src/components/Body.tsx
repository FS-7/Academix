import { Outlet} from 'react-router-dom';
import { SideBar } from '../shared/Shared';

export function Body(props: any){
    if(props.menuItems == null)
        return(<Outlet/>)
    return(
        <>                
            <div className="h-full w-1/6 bg-blue-700 bg-gradient-to-b from-cyan-500 to-blue-500">
                <SideBar items={props.menuItems}/>
            </div>
            <div className="h-full w-5/6 flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </>
    );
}
    