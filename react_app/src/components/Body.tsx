import { Outlet} from 'react-router-dom';
import { SideBar } from '../shared/Shared';

export function Body(props: any){
    if(props.menuItems == null)
        return(<Outlet/>)
    return(
        <>                
            <div className="h-full w-full flex flex-col md:flex-row items-center justify-center">
                <SideBar items={props.menuItems}/>
                <div className="h-full w-5/6 md:w-full flex grow items-center justify-center">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
    