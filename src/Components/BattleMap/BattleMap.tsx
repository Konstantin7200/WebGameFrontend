import HexMap from "../../Components/HexMap/HexMap"
import st from "./BattleMap.module.css"
import { FC, useEffect, useState } from "react";
import { UnitsMap } from "../../Components/UnitsMap/UnitsMap";
import { AttackMenu } from "../../Components/AttackMenu/AttackMenu";

interface BattleMapProps{
    endGame:any,
    inGame:boolean
}




export const BattleMap:FC<BattleMapProps>=({endGame,inGame})=>{
    const generateUnits=async()=>
    {
        await fetch("http://localhost:5000/api/Unit/Generation",{method:"POST"})
        loadUnits();
        endTurn();
    };
    const loadUnits=()=>{
        fetch("http://localhost:5000/api/Unit/GetUnits",{method:"GET"}).then((response)=>response.json()).then((data)=>setUnits(data))
    };
    const unitClickHandler=(x:number,y:number)=>{
        fetch(`http://localhost:5000/api/Unit/GetHexesForUnit/?x=${x}&y=${y}`).then((response)=>response.json()).then((data)=>setHexesForUnit(data))
    }
    const hexClickHandler=async(x:number,y:number,movesToReach:number,isForUnit:boolean,isEnemies:boolean,prev:any)=>{
        if(isForUnit)
        freeHexClickHandler(x,y,movesToReach);
        if(isEnemies)
        {
            enemyClickHandler(x,y,prev);   
        }
    }
    const endTurn=async()=>{
        if(inGame){
        await fetch("http://localhost:5000/api/Game/EndTurn",{method:"Patch"});
        await fetch("http://localhost:5000/api/Game/GetNextTurn",{method:"Get"}).then((response)=>response.json()).then((data)=>{
            if(data)
                makeAITurn();
        })
    }
    }
    const makeAITurn=async ()=>{
        setDisabled(true);
        let result=true;
        while(result&&inGame)
        {
        await new Promise(resolve=>setTimeout(resolve,500));
        await fetch(`http://localhost:5000/api/Game/AITurn`,{method:"Post"}).then((response)=>response.json()).then((data)=>result=data)
        await loadUnits(); 
        checkIfLeadersAreDead();
        }
        endTurn();
        
        setDisabled(false);
    }
    const freeHexClickHandler=async (x:number,y:number,movesToReach:number)=>{
        await fetch(`http://localhost:5000/api/Unit/MoveUnitTo/?x=${x}&y=${y}&movesToReach=${movesToReach}`,{method:"PATCH"})
        loadUnits();
        unitClickHandler(x,y);
    }
    const enemyClickHandler = async (x: number, y: number, prev: any) => {
    await freeHexClickHandler(prev.x, prev.y, prev.moves);
    
    const unit1 = await fetch(`http://localhost:5000/api/Unit/GetLastUnit`).then(response => response.json());
    const unit2 = await fetch(`http://localhost:5000/api/Unit/GetUnit/?x=${x}&y=${y}`).then(response => response.json());
    
    setSelectedUnits([unit1,unit2])
    setAttacksMas([unit1.baseUnit.attacks, unit2.baseUnit.attacks]);
    }
    const handleAttackClick=async (attack1:any,attack2:any)=>{
        setAttacksMas([null,null]);
        setAttacks([attack1.props.attack,attack2.props.attack])
        const data={
            x1:selectedUnits[0].x,
            x2:selectedUnits[1].x,
            y1:selectedUnits[0].y,
            y2:selectedUnits[1].y,
            attack1:attack1.props.attack,
            attack2:attack2.props.attack
        }
        await fetch(`http://localhost:5000/api/Unit/Fight`,{method:"Post",headers: {
                'Content-Type': 'application/json', 
            },body:JSON.stringify(data)});
        loadUnits();
        checkIfLeadersAreDead();
        unitClickHandler(selectedUnits[0].x,selectedUnits[0].y);
    }
    const checkIfLeadersAreDead=async()=>{
        await fetch(`http://localhost:5000/api/Unit/IsLeaderDead`).then((response)=>response.json()).then((data)=>{
            if(data===1)
                {
                    alert("Right player won");
                    inGame=false;
                    endGame();
                    
                }
            if(data===-1)
               { 
                alert("Left player won");
                inGame=false;
                endGame();
                
            }
        })
    }
    const [selectedUnits,setSelectedUnits]=useState([{x:1,y:1},{x:1,y:1}])
    const [attacks,setAttacks]=useState([null,null]);
    const [units,setUnits]=useState(null);
    const [hexesForUnit,setHexesForUnit]=useState(null);
    const [attacksMas,setAttacksMas]=useState([null,null]);
    const [disabled,setDisabled]=useState(false);
    return (
        <div className={st.BattleMap}>
            <button disabled={disabled} onClick={endTurn}>End turn</button>
            <button onClick={generateUnits}>Start game</button>
        <h1>Супер пупер игра</h1>
        <div>
        <UnitsMap units={units} UnitClickHandler={unitClickHandler}/>
        <HexMap hexesForUnit={hexesForUnit} onHexClick={hexClickHandler} />
        </div>
        {attacksMas[0] !== null && attacksMas[1] !== null&&<AttackMenu attacks1={attacksMas[0]} attacks2={attacksMas[1]} units={selectedUnits} handleCLick={handleAttackClick}/>}
        </div>
    )
}
