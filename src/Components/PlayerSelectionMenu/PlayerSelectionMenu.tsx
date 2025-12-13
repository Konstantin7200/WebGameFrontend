import { FC, useState } from "react"
import st from './PlayerSelectionMenu.module.css'
import { GameService } from "../../API/GameService"
import { MyButton } from "../../UI/MyButton/MyButton"
import { MySelect } from "../../UI/MySellect/MySellect"

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
        <>
        <div className={st.RightColumn}></div>  
        <div className={st.LeftColumn}></div>
    <div className={st.PlayerSelectionMenu}> 
        <div>
        <MySelect onSelectFunc={onSelect} index={0} options={["Player","AI"]}/>
        <MySelect onSelectFunc={onSelect} index={1} options={["Player","AI"]}/>
        </div>
        <MyButton onClick={clickHandler} text="Ready"/>
    </div>
    </>)
}