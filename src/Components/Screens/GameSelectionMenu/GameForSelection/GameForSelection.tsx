import { FC } from "react";
import st from "./GameForSelection.module.css"
import { Game } from "../../../../types";
import { MyButton } from "../../../../UI/MyButton/MyButton";
interface GameProps{
    Game:Game,
    loadGame:any,
    index:number
}

export const GameForSelection:FC<GameProps>=({Game,loadGame,index})=>{
    let playerNames=["Player","AI"];
    const formatedDate = new Date(Game.dateOfCreation).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    return (
        <div className={st.GameForSelection}>
            <p>Игра была сохранена {formatedDate}</p>
            <div>
            <p>{playerNames[Game.playerConfig.firstSide]}  VS  {playerNames[Game.playerConfig.secondSide]}</p>
            <p>{Math.round(Game.currentTurn/2)} turn</p>
            <MyButton style={{border:"1px solid black"}} text="Load" onClick={()=>loadGame(index)}/>
            
            </div>
        </div>
    )
}