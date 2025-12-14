import { FC } from "react"
import st from "./GameSelectionMenu.module.css"
import { GameForSelection } from "../GameForSelection/GameForSelection"
import { Game } from "../../types"
import { MyButton } from "../../UI/MyButton/MyButton"


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
        <div className={st.RightColumn}></div>  
        <div className={st.LeftColumn}>
            <MyButton style={buttonStyle} onClick={quit} text="Back To Menu"/>
        </div>
        {mas}
        </div>
    )
}