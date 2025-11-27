import { FC } from "react";
import st from "./MainMenu.module.css"

interface MainMenuProps{
    startGame:()=>void
}


export const MainMenu:FC<MainMenuProps>=({startGame})=>{
    return (<div className={st.MainMenu}>
        <button onClick={startGame}>Start game</button>
    </div>)
}

