import { FC } from "react";
import { text } from "stream/consumers";
import st from "./MyButton.module.css"

interface MyButtonProps{
    onClick:any,
    disabled:boolean,
    text:string
}

export const MyButton:FC<MyButtonProps>=({onClick,disabled,text})=>{
    return(
        <button onClick={onClick} className={st.MyButton} disabled={disabled}>
            {text}
        </button>
    )
}