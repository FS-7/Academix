import React from 'react'
import { outer_div, inner_form, input_text, submit } from "../main.jsx"

export function Table(props){
    return(
        <table className="w-full table-auto justify-items-center text-center">
            <thead>
                <TableHead tablehead={props.table.tablehead}/>
            </thead>
            <tbody>
                <TableBody tablebody={props.table.tablebody}/>
            </tbody>
        </table>
    )
}

export function TableHead(props){
    return(
        <tr>
            {props.tablehead.map(
                (item, i) => <th key={i}>{item}</th>
            )}
        </tr>
    )
}

export function TableBody(props){
    var keys = []
    var data = []
    if(props.tablebody.keys.length != 0){
        keys = props.tablebody.keys
        data = props.tablebody.data
    }
    
    return(
        <>
        {
            data.map(
                item => 
                <tr key={item[keys[0]]}>
                    <td>{item[keys[1]]}</td>
                    <td>
                        {React.cloneElement(props.tablebody.deleteFunction, item[keys[0]])}
                    </td>
                </tr>
            )
        }
        </>
    )
}

export function Form(props){
    
    return(
        <>
        <div className={outer_div}>
            <h1>{props.form.heading}</h1>
            <form onSubmit={props.form.submitFunction} method={props.form.method} className={inner_form}>
                {
                    props.form.elements.map(
                        item => <InputText input={item} key={item.id} />
                    )
                }
                <SubmitButton submit={props.form.submitButton}/>
            </form>
        </div>
        </>
    )
}

export function InputText(props){
    if(props.input.type == "text" || "number" || "email" || "password")
        return(
            <>
            <label htmlFor={props.input.id}>{props.input.display}</label>
            <input type={props.input.type} id={props.input.id} name={props.input.name} placeholder={props.input.placeholder} defaultValue={props.input.value} className={input_text} />
            </>
        )
    else if(props.input.type == "select")
        return(
            <>
            <label htmlFor={props.input.id}>{props.input.display}</label>
            <input type={props.input.type} id={props.input.id} name={props.input.name} placeholder={props.input.placeholder} className={input_text} >
                <SelectList list={props.input.optionsList} />
            </input>
            </>
        )
    else
        return(<></>)
}

export function SelectList(props){
    return(
        props.list.map(items =>
            item => <option key={item.id} value={item.value}>{item.value}</option>
        )
    )
}

export function SubmitButton(props){
    return(
        <>
        <button type="submit" name={props.submit.name} value={props.submit.value} className={submit}>{props.submit.text}</button>
        </>
    )
}

export function CreateSpace(){
    return(
        <>
        </>
    )
}

export function ShowSpace(){
    return(
        <>
        </>
    )
}

export function DeleteSpace(){
    return(
        <>
        <Form>
            
        </Form>
        </>
    )
}