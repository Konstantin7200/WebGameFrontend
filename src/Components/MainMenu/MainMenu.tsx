import { FC } from "react";
import st from "./MainMenu.module.css"


interface MainMenuProps{
    startGame:()=>void
}


export const MainMenu:FC<MainMenuProps>=({startGame})=>{
    return (<div className={st.MainMenu}>
        <div>
            <img src="logo.png" alt="" />
        <h1>The battle of 6 nations</h1>
        </div>
        <button onClick={startGame}>Start game</button>
    </div>)
}

