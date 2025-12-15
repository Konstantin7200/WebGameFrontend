import { FC } from "react"
import st from "./Rules.module.css"
import { MyButton } from "../../UI/MyButton/MyButton"

interface RulesProps{
    quit:()=>void
}

export const Rules:FC<RulesProps>=({quit})=>{
    const style={
        width:'100%',
        position:'absolute',
        bottom:'0',
        left:'0'
    }
    return (
            <div className={st.Rules}>
                <span><b>Цель</b>- победить вражеского лидера</span>
                <span><b>Лидер</b>- особый юнит стоящий за всеми остальными</span>
                <span><b>Система ходов</b>-пошаговая.Ходите своими юнитами и жмете End Turn</span>
        <div className={st.RightColumn}>
            <MyButton style={style} text="Back To Menu" onClick={quit}/>
            </div>  
        <div className={st.LeftColumn}></div>
        </div>
    )
}