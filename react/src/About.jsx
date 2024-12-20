import { Body } from './shared/Body.jsx';
import { PostCard } from './shared/Postcard.jsx'

const menuItems = [
    {path: 'college', text: 'College',  comp: null}, 
    {path: 'principal', text: 'Principal',  comp: null}, 
    {path: 'hods', text: 'HODs',  comp: null}, 
    {path: 'professors', text: 'Professors',  comp: null}, 
    {path: 'developers', text: 'Developers',  comp: null},

]

export function About(){
    return(
        <>
            <Body menuItems={menuItems}/>
        </>
    )
}

export function College(){
    return (
        <>
        <div className='flex flex-col flex-grow justify-items-center'>
            
        </div>
        </>
    )
}

export function Principal(){
    return (
        <>
        <div className='flex flex-col flex-grow justify-items-center'>
            
        </div>
        </>
    )
}

export function HODs(){
    const hods = []
    return (
        <>
        <div className='flex flex-col flex-grow justify-items-center'>
            {hods.map(
                user => <PostCard key={user.name} user={user} />
            )}
        </div>
        </>
    )
}

export function Professors(){
    const prof = []
    return (
        <>
        <div className='flex flex-col flex-grow justify-items-center'>
            {prof.map(
                user => <PostCard key={user.name} user={user} />
            )}
        </div>
        </>
    )
}

export function Devs(){
    const devs = [
        {name: "FAIZAN SHAIKH",  quote: "Why use Artificial Intelligence when I have Real Intelligence", img: null},
        {name: "MABUSAB BURADI",  quote: "", img: null},
        {name: "MANOJ ANKUSHKANI",  quote: "", img: null},
        {name: "PAVAN ZAPATE",  quote: "Jolly Jolly, Ella Jolly", img: null},
        
    ]

    return (
        <>
        <div className='flex flex-col flex-grow justify-items-center'>
            {devs.map(
                user => <PostCard key={user.name} user={user} />
            )}
        </div>
        </>
    );
}