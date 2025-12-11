import { FC } from "react";
import st from "./MainMenu.module.css"
import { MyButton } from "../../UI/MyButton/MyButton";


interface MainMenuProps{
    startGame:()=>void
}


export const MainMenu:FC<MainMenuProps>=({startGame})=>{
    return (
        <>
    <div className={st.MainMenu}>
        <div className={st.RightColumn}></div>  
        <div className={st.LeftColumn}></div>
        <div>
            <img src="logo.png" alt="" />
        <h1>Battle of 6 nations</h1>
        </div>
        <MyButton onClick={startGame} text="Start game"/>
    </div>
    </>
    )
}

