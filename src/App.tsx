import { useEffect, useState } from "react"
import "./App.css"
import { BattleMap } from "./Components/BattleMap/BattleMap"
import { MainMenu } from "./Components/MainMenu/MainMenu";
import { PlayerSelectionMenu } from "./Components/PlayerSelectionMenu/PlayerSelectionMenu";
import { Tooltips } from "./Components/Tooltips/Tooltips";
import { AudioPlayer } from "./UtilityFunctions/AudioPlayer";

const App=()=>{
    useEffect(()=>{
        document.addEventListener("click",()=>AudioPlayer.playMusic(),{once:true})
    },[])
   
    const startGame=()=>{
        setInGame(2)
    }
    const loadPlayerSelectionMenu=()=>{
        setInGame(1);
    }
    const endGame=()=>{
        setInGame(0);
    }
    const[inGame,setInGame]=useState(0);
    return(
        <div className="App">
            {inGame===2&&<Tooltips children={<BattleMap endGame={endGame} key={inGame}/>}/>}
            {inGame===0&&<MainMenu startGame={loadPlayerSelectionMenu}/>}
            {inGame===1&&<PlayerSelectionMenu onClickFunc={startGame}/>}
        </div>
    )
}


export default App