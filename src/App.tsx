import { useState } from "react"
import "./App.css"
import { BattleMap } from "./Components/BattleMap/BattleMap"
import { MainMenu } from "./Components/MainMenu/MainMenu";

const App=()=>{
    const startGame=()=>{
        setInGame(true)
    }
    const[inGame,setInGame]=useState(false);
    return(
        <div className="App">
            {inGame&&<BattleMap/>}
            {!inGame&&<MainMenu startGame={startGame}/>}
        </div>
    )
}


export default App