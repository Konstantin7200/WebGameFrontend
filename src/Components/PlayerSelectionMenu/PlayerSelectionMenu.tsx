import { FC, useState } from "react"
import st from './PlayerSelectionMenu.module.css'

interface PlayerSelectionMenuProps{
    onClickFunc:()=>void
}


export const PlayerSelectionMenu:FC<PlayerSelectionMenuProps>=({onClickFunc})=>{
    const createNewConfig=()=>{
        const data={side1:sides[0]=="Player",side2:sides[1]=="Player"};
        fetch("http://localhost:5000/api/Game/CreateConfig",{method:"Post",body:JSON.stringify(data),headers:{'Content-Type': 'application/json'}});
    }
    const clickHandler=()=>{
        createNewConfig();
        onClickFunc();
    }
    const onSelect=(index:number,value:string)=>{
        const newSides=[...sides];
        newSides[index]=value;
        setSides(newSides);
    }
    const [sides,setSides]=useState(["Player","Player"]);
    return (<div className={st.PlayerSelectionMenu}>
        <div>
        <select value={sides[0]} onChange={(e)=>onSelect(0,e.target.value)}>
            <option>Player</option>
            <option>AI</option>
        </select>
        <select value={sides[1]} onChange={(e)=>onSelect(1,e.target.value)}>
            <option>Player</option>
            <option>AI</option>
        </select>
        </div>
        <button onClick={clickHandler}>Ready</button>
    </div>)
}