import { FC, useState } from "react"
import st from './PlayerSelectionMenu.module.css'
import { API } from "../../API/API"
import { GameService } from "../../API/GameService"

interface PlayerSelectionMenuProps{
    onClickFunc:()=>void
}


export const PlayerSelectionMenu:FC<PlayerSelectionMenuProps>=({onClickFunc})=>{
    const createNewConfig=async()=>{
        await GameService.createNewGame(playerTypes)
    }
    const clickHandler=async()=>{
        await createNewConfig();
        onClickFunc();
    }
    const onSelect=(index:number,value:string)=>{
        const newSides=[...playerTypes];
        newSides[index]=value;
        setPlayerTypes(newSides);
    }
    const [playerTypes,setPlayerTypes]=useState(["Player","Player"]);
    return (
    <div className={st.PlayerSelectionMenu}>
        <div className={st.RightColumn}></div>  
        <div className={st.LeftColumn}></div>
        <div>
        <select value={playerTypes[0]} onChange={(e)=>onSelect(0,e.target.value)}>
            <option>Player</option>
            <option>AI</option>
        </select>
        <select value={playerTypes[1]} onChange={(e)=>onSelect(1,e.target.value)}>
            <option>Player</option>
            <option>AI</option>
        </select>
        </div>
        <button onClick={clickHandler}>Ready</button>
    </div>)
}