export function PostCard(props){
    return(
        <>
        <div className="py-2 w-full h-1/4 flex flex-row justify-center">
            <div className="h-full aspect-square block ">
                <img src={props.user.img} alt={props.user.name} className="w-full h-full border border-black rounded-full"/>
            </div>
            <div className="w-1/4 h-full flex flex-col mx-10">
                <h1>{props.user.name}</h1>
                <br />
                <blockquote>"{props.user.quote}"</blockquote>
                <p className="flex flex-row-reverse">-{props.user.name}</p>
            </div>
        </div>
        </>
    );
}