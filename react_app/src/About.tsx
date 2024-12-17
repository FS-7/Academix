import { POSTCARD } from './components/Postcard'

const devs = [
    {name: "FAIZAN SHAIKH",  quote: "Why use Artificial Intelligence when I have Real Intelligence", img: null},
    {name: "MABUSAB BURADI",  quote: "", img: null},
    {name: "MANOJ ANKUSHKANI",  quote: "", img: null},
    {name: "PAVAN ZAPATE",  quote: "Jolly Jolly, Ella Jolly", img: null},
    
]

export function About(){
    return (
        <>
        <div className='flex flex-col flex-grow justify-items-center'>
            {devs.map(
                user => <POSTCARD key={user.name} user={user} />
            )}
        </div>
        </>
    );
}