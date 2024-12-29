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
                        {React.cloneElement(props.tablebody.deleteFunction, { code: item[keys[0]] })}
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
            {props.form.heading? <h1>{props.form.heading}</h1> : null }
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
    if(props.input.isHidden == true)
        return(
            <>
            <input type={props.input.type} id={props.input.id} name={props.input.name} placeholder={props.input.placeholder} value={props.input.value} required={ props.input.isRequired == true} disabled={ props.input.isDisabled } hidden={ props.input.isHidden } readOnly={ props.input.readOnly } className={input_text} />
            </>
        )
    if(props.input.type == "select")
        return(
            <>
            <label htmlFor={props.input.id}>{props.input.display}</label>
            <select type={props.input.type} id={props.input.id} name={props.input.name} placeholder={props.input.placeholder} value={props.input.defaultValue} required={ props.input.isRequired == true} disabled={ props.input.isDisabled } hidden={ props.input.isHidden } readOnly={ props.input.readOnly } className={input_text} >
                <SelectList list={props.input.optionsList} />
            </select>
            </>
        )
    else if(props.input.type == "text" || "number" || "email" || "password")
        return(
            <>
            <label htmlFor={props.input.id}>{props.input.display}</label>
            <input type={props.input.type} id={props.input.id} name={props.input.name} placeholder={props.input.placeholder} value={props.input.value} required={ props.input.isRequired == true} disabled={ props.input.isDisabled } hidden={ props.input.isHidden } readOnly={ props.input.readOnly } className={input_text} />
            </>
        )
    else
        return(<></>)
}

export function SelectList(props){
    if(props.list[0] != null){
        const keys = Object.keys(props.list[0]);
        
        return(
            <>
            {
                props.list.map(
                    item => 
                        <option key={item[keys[0]]} value={item[keys[0]]}>{item[keys[0]]}</option>                    
                )
            }
            </>
        )
    }
}

export function SubmitButton(props){
    return(
        <>
        <button type="submit" className={submit}>{props.submit.text}</button>
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