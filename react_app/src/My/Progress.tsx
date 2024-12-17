import { inner_form, input_text, outer_div, submit } from "../App";
import { Body } from "../components/Body";

export function Progress(){
    return(
        <>
            <Body menuItems={null}/>
        </>
    )
}

export function Index(){
    return(
        <>
        <table>
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>STUDENT 1</th>
                    <th>STUDENT 2</th>
                    <th>STUDENT 3</th>
                    <th>STUDENT 4</th>
                    <th>GUIDE</th>
                    <th>COORDINATOR</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
        </>
    )
}

export function Register(){
    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>REGISTER PROJECT:</h1>
                <form action={Register} className={inner_form}>
                    <label htmlFor="name">NAME: </label>
                    <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>
        
                    <button type="submit" className={submit}>CREATE</button>
                </form>
            </div>
        </div>
        </>
    )
}

export function STATUS(){
    return(
        <>
        
        </>
    )
}

export function PhaseI(){
    function UpdatePhaseI(){

    }

    //  SHOW PHASE I
    //  IF PHASE I IS COMPLETED MARK AS SUCH
    //  IF NOT
    //  DISPLAY REQUIREMENTS
    //  SUBMIT
    //  GET APPROVED FROM GUIDE
    //  GET APPROVAL FROM COORDINATOR
    return(
        <>
        <div className={'w-full h-full flex flex-col items-center'}>
            <div className={outer_div}>
                <h1>REGISTER:</h1>
                <form action={Register} className={inner_form}>
                    <label htmlFor="proj">PROJECT: </label>
                    <select >
                    </select>

                    <label htmlFor="name">: </label>
                    <input type="text" id="name" name="name" placeholder="Name" required className={input_text}></input>
        
                    <button type="submit" className={submit}>CREATE</button>
                </form>
            </div>
        </div>
        </>
    )
}

export function PhaseII(){

    // SHOW PHASE II
    return(
        <>
        
        </>
    )
}

export function PhaseIII(){
    return(
        <>
        
        </>
    )
}

export function Complete(){
    return(
        <>
        </>
    )
}

