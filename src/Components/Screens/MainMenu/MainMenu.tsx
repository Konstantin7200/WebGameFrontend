import { FC, useState } from "react";
import st from "./MainMenu.module.css"
import { MyButton } from "../../../UI/MyButton/MyButton";
import { GameService } from "../../../API/GameService";
import { GameSelectionMenu } from "../GameSelectionMenu/GameSelectionMenu";
import { Rules } from "../Rules/Rules";
import { Column } from "../../../UI/Column/Column";


interface MainMenuProps{
    loadPlayerSelectionMenu:()=>void,
    loadGame:any
}


export const MainMenu:FC<MainMenuProps>=({loadPlayerSelectionMenu,loadGame})=>{
    const [games,setGames]= useState(null)
    const [rulesVisible,setRulesVisible]=useState(false)
    const loadGames=async()=>{
        setGames(await GameService.getGames())
    }
    return (
        <>
    {!rulesVisible&&games===null&&<div className={st.MainMenu}>
        <Column orientation="Right"/>
        <Column orientation="Left"/>
        <div>
            <img src="logo.png" alt="" />
        <h1>Battle of 6 nations</h1>
        </div>
        <MyButton onClick={loadPlayerSelectionMenu} text="Start game"/>
        <MyButton onClick={loadGames} text="Load game"/>
        <MyButton onClick={()=>setRulesVisible(true)} text="Show Rules"/>
    </div>}
    {games!==null&&<GameSelectionMenu loadGame={(index:number)=>{loadGame();GameService.loadGame(index)}} games={games} quit={()=>setGames(null)}/>}
    {rulesVisible===true&&<Rules quit={()=>setRulesVisible(false)}/>}
    </>
    )
}

