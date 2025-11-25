import HexMap from "./Components/HexMap/HexMap"
import "./App.css"
import { useEffect, useState } from "react";
import { UnitsMap } from "./Components/UnitsMap/UnitsMap";
import { AttackMenu } from "./Components/AttackMenu/AttackMenu";


const App=()=>{
    const generateUnits=async()=>
    {
        await fetch("http://localhost:5000/api/Unit/Generation",{method:"POST"})
        loadUnits();
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
        await fetch("http://localhost:5000/api/Unit/EndTurn",{method:"Patch"});
    }
    const endTurnAndStartAiTurn=async()=>{
        await endTurn();
        await makeAITurn();
    }
    const makeAITurn=async ()=>{
        setDisabled(true);
        let result=true;
        while(result)
        {
        await new Promise(resolve=>setTimeout(resolve,500));
        await fetch(`http://localhost:5000/api/Unit/AITurn`,{method:"Post"}).then((response)=>response.json()).then((data)=>result=data)
        await loadUnits(); 
        }
        checkIfLeadersAreDead();
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
        await fetch(`http://localhost:5000/api/Unit/IsLeaderDead`).then((response)=>{console.log(12);return response.json()}).then((data)=>{
            if(data===1)
                alert("Right player won");
            if(data===-1)
                alert("Left player won");
        })
    }
    const startAiGame=async()=>{
        
        await generateUnits();
        while(true){
            await makeAITurn();
            setDisabled(true);
            await new Promise(resolve=>setTimeout(resolve,1000));
        }
    }
    
    
    const [selectedUnits,setSelectedUnits]=useState([{x:1,y:1},{x:1,y:1}])
    const [attacks,setAttacks]=useState([null,null]);
    const [units,setUnits]=useState(null);
    const [hexesForUnit,setHexesForUnit]=useState(null);
    const [attacksMas,setAttacksMas]=useState([null,null]);
    const [disabled,setDisabled]=useState(false);
    return (
        <div className="App">
            <button onClick={generateUnits}>Generate units</button>
            <button onClick={loadUnits}>Load units</button>
            <button disabled={disabled} onClick={endTurnAndStartAiTurn}>End turn</button>
            <button disabled={disabled} onClick={startAiGame}>Start AI Game</button>
        <h1>Супер пупер игра</h1>
        <div>
        <UnitsMap units={units} UnitClickHandler={unitClickHandler}/>
        <HexMap hexesForUnit={hexesForUnit} onHexClick={hexClickHandler} />
        </div>
        {attacksMas[0] !== null && attacksMas[1] !== null&&<AttackMenu attacks1={attacksMas[0]} attacks2={attacksMas[1]} handleCLick={handleAttackClick}/>}
        </div>
    )
}


export default App