import { FC, useState } from "react";
import st from "./MainMenu.module.css"
import { MyButton } from "../../UI/MyButton/MyButton";
import { GameService } from "../../API/GameService";
import { GameSelectionMenu } from "../GameSelectionMenu/GameSelectionMenu";


interface MainMenuProps{
    loadPlayerSelectionMenu:()=>void,
    loadGame:any
}


export const MainMenu:FC<MainMenuProps>=({loadPlayerSelectionMenu,loadGame})=>{
    const [games,setGames]= useState(null)
    const loadGames=async()=>{
        setGames(await GameService.getGames())
    }
    return (
        <>
    {games===null&&<div className={st.MainMenu}>
        <div className={st.RightColumn}></div>  
        <div className={st.LeftColumn}></div>
        <div>
            <img src="logo.png" alt="" />
        <h1>Battle of 6 nations</h1>
        </div>
        <MyButton onClick={loadPlayerSelectionMenu} text="Start game"/>
        <MyButton onClick={loadGames} text="Load game"/>
    </div>}
    {games!==null&&<GameSelectionMenu loadGame={(index:number)=>{loadGame();GameService.loadGame(index)}} games={games} quit={()=>setGames(null)}/>}
    </>
    )
}

