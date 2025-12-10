import { FC } from "react";
import st from "./MainMenu.module.css"


interface MainMenuProps{
    startGame:()=>void
}


export const MainMenu:FC<MainMenuProps>=({startGame})=>{
    return (<div className={st.MainMenu}>
        <div className={st.RightColumn}></div>  
        <div className={st.LeftColumn}></div>
        <div>
            <img src="newLogo.png" alt="" />
        <h1>Battle of 6 nations</h1>
        </div>
        <button onClick={startGame}>Start game</button>
    </div>)
}

