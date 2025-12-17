import { FC } from "react"
import st from "./GameSelectionMenu.module.css"
import { GameForSelection } from "./GameForSelection/GameForSelection"
import { Game } from "../../../types"
import { MyButton } from "../../../UI/MyButton/MyButton"
import { Column } from "../../../UI/Column/Column"


interface GameSelectionMenuProps{
    games:Game[],
    quit:()=>void,
    loadGame:any
}

export const GameSelectionMenu:FC<GameSelectionMenuProps>=({games,quit,loadGame})=>{
    let mas=[];
    if(games!==undefined)
    for(let i=0;i<games.length;i++)
    {
        mas.push(<GameForSelection key={i} Game={games[i]} loadGame={loadGame} index={i}/>);
    }
    const buttonStyle={
        position:'absolute',
        bottom:'0',
        left:'0',
        width:'100%'
    }
    return(
        <div className={st.GameSelectionMenu}>
        <Column orientation="Right">
            <MyButton style={buttonStyle} onClick={quit} text="Back To Menu"/>
        </Column>
        <Column orientation="Left"/>
        {mas}
        </div>
    )
}