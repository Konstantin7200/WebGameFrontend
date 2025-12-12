import { FC } from "react";
import st from "./MyButton.module.css"
import { AudioPlayer } from "../../UtilityFunctions/AudioPlayer";

interface MyButtonProps{
    onClick:any,
    disabled?:boolean,
    text:string,
    style?:any
}

export const MyButton:FC<MyButtonProps>=({onClick,disabled=false,text,style})=>{
    return(
        <button onClick={()=>{AudioPlayer.playClick();onClick()}} style={style} className={st.MyButton} disabled={disabled}>
            {text}
        </button>
    )
}