import HexMap from "../../Components/HexMap/HexMap"
import st from "./BattleMap.module.css"
import { FC, useEffect, useState } from "react";
import { UnitsMap } from "../../Components/UnitsMap/UnitsMap";
import { AttackMenu } from "../../Components/AttackMenu/AttackMenu";
import { UnitService } from "../../API/UnitsService";
import { GameService } from "../../API/GameService";

interface BattleMapProps{
    endGame:any,
}

export const BattleMap:FC<BattleMapProps>=({endGame})=>{
    let inGame=true;
    const start=async()=>
    {
        loadUnits();
        endTurn();
    };
    const loadUnits=async()=>{
        const loadedUnits=await UnitService.loadUnits();
        setUnits(loadedUnits);
    }
    const unitClickHandler=async(x:number,y:number)=>{
        const avalibleHexes=await UnitService.getAvailableMovesForUnit(x,y);
        setHexesForUnit(avalibleHexes)
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
        await GameService.endTurn();
        const nextPlayerIsAi=await GameService.checkIsNextPlayerAI();
        if(nextPlayerIsAi)
            makeAIMove();
    }
    }
    const makeAIMove=async ()=>{
        setDisabled(true);
        let result=true;
        while(result&&inGame)
        {
        await new Promise(resolve=>setTimeout(resolve,500));
        result=await GameService.makeAIMove();
        await loadUnits(); 
        checkIfLeadersAreDead();
        }
        endTurn();
        setDisabled(false);
    }
    const freeHexClickHandler=async (x:number,y:number,movesToReach:number)=>{
        await UnitService.moveUnitTo(x,y,movesToReach);
        await loadUnits();
        unitClickHandler(x,y);
    }

    const enemyClickHandler = async (x: number, y: number, prev: any) => {
        await freeHexClickHandler(prev.x, prev.y, prev.moves);
        const unit1 = await UnitService.getLastUnit();
        const unit2 = await UnitService.getUnit(x,y);
        setSelectedUnits([unit1,unit2])
    }

    const handleAttackClick=async (attack1:any,attack2:any)=>{
        await UnitService.fight(attack1.props.attack,attack2.props.attack,selectedUnits)
        loadUnits();
        checkIfLeadersAreDead();
        unitClickHandler(selectedUnits[0].x,selectedUnits[0].y);
        setSelectedUnits([{x:-5,y:1},{x:1,y:1}]);
    }
    const checkIfLeadersAreDead=async()=>{
        const data=await UnitService.checkIfLeadersAreDead();
        if(data.gameOver)
        {
            endGame();
            inGame=false;
            alert(data.gameWinner+" player won");
        }
        
    }
    //useEffect(generateUnits,[inGame])
    const [selectedUnits,setSelectedUnits]=useState([{x:-5,y:1},{x:1,y:1}])
    const [units,setUnits]=useState(null);
    const [hexesForUnit,setHexesForUnit]=useState(null);
    const [disabled,setDisabled]=useState(false);
    return (
        <div className={st.BattleMap}>
            <button disabled={disabled} onClick={endTurn}>End turn</button>
            <button onClick={start}>Start game</button>
        <h1>Супер пупер игра</h1>
        <div>
        <UnitsMap units={units} UnitClickHandler={unitClickHandler}/>
        <HexMap hexesForUnit={hexesForUnit} onHexClick={hexClickHandler} />
        </div>
        {selectedUnits[0].x!== -5&&<AttackMenu units={selectedUnits} handleCLick={handleAttackClick}/>}
        </div>
    )
}
