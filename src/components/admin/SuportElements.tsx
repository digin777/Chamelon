import React from 'react'

function SuportElements() {
    return (
        <div>
            
        </div>
    )
}

interface OptionItemProps{
    value:any;
    label:any;
}
export function OptionItem(props:OptionItemProps){
    return{
        value:props.value,
        label:(
        <span>{props.label}</span>
        )
    }
}
export default SuportElements
