import HexMap from "../../Components/HexMap/HexMap"
import st from "./BattleMap.module.css"
import { FC, useEffect, useState } from "react";
import { UnitsMap } from "../../Components/UnitsMap/UnitsMap";
import { AttackMenu } from "../../Components/AttackMenu/AttackMenu";
import { UnitService } from "../../API/UnitsService";
import { GameService } from "../../API/GameService";
import { UnitType } from "../../types";
import { MyButton } from "../../UI/MyButton/MyButton";
import { AudioPlayer } from "../../UtilityFunctions/AudioPlayer";
interface BattleMapProps{
    endGame:any,
}

export const BattleMap:FC<BattleMapProps>=({endGame})=>{
    let inGame=true;
    const loadUnits=async()=>{
        const loadedUnits=await UnitService.loadUnits();
        setUnits(loadedUnits);
        return loadedUnits;
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
            await freeHexClickHandler(prev.x, prev.y, prev.moves);
            enemyClickHandler(x,y);   
        }
    }
    const endTurn=async()=>{
        setTurn(prev=>prev+1);
        if(inGame){
            await GameService.endTurn();
            const nextPlayerIsAi=await GameService.checkIsNextPlayerAI();
            await loadUnits();
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

    const enemyClickHandler = async (x: number, y: number) => {
        const unit1 = await UnitService.getLastUnit();
        const unit2 = await UnitService.getUnit(x,y);
        setSelectedUnits([unit1,unit2])
    }

    const handleAttackClick=async (attack1:any,attack2:any)=>{
        AudioPlayer.playFightingSounds();
        await UnitService.fight(attack1.props.attack,attack2.props.attack,selectedUnits)
        loadUnits();
        checkIfLeadersAreDead();
        unitClickHandler(selectedUnits[0].x,selectedUnits[0].y);
        setSelectedUnits([defaultUnit,defaultUnit]);
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
    const start=async()=>
    {
        let delay=100;
        for(let i=0;i<5;i++)
        {
            const result=await loadUnits();
            if(result?.length!==0)
                break;
            await new Promise(resolve=>setTimeout(resolve,delay))
            delay*=2;
        }
        await endTurn();
    };
    useEffect(()=>{
    start();
    },[])
    const saveAndQuit=async()=>{
        await GameService.saveGame();
        endGame();
    }
    const defaultUnit:UnitType={x:-5,y:1,health:0,baseUnit:{health:0,type:"",resistances:new Map,attacks:[]},side:0};
    const [selectedUnits,setSelectedUnits]=useState([defaultUnit,defaultUnit])
    const [units,setUnits]=useState([]);
    const [hexesForUnit,setHexesForUnit]=useState(null);
    const [disabled,setDisabled]=useState(false);
    const [turn,setTurn]=useState(0);
    let currentSide=(turn-1)%2===0?"Left":"Right"
    let currentSideColor=(turn-1)%2===0?"rgb(58, 157, 255)":"rgb(255, 0, 0)"
    const endButtonStyle={
        position:'absolute',
        width:'100%',
        bottom:"0px",
        left:'0px'
    }
    return (
        <div className={st.BattleMap}>
        <div className={st.RightColumn}></div>  
        <div className={st.LeftColumn}>
            <h1>Turn:{Math.round(turn/2)}</h1>
            <h1 style={{color:currentSideColor}}>{currentSide} sides turn</h1>
            <MyButton style={endButtonStyle} disabled={disabled} onClick={endTurn}  text="End turn"/>
            <MyButton onClick={saveAndQuit} text="Save and quit"/>
        </div>  
        <div>
        <UnitsMap currentTurn={turn-1} units={units} UnitClickHandler={unitClickHandler}/>
        <HexMap hexesForUnit={hexesForUnit} onHexClick={hexClickHandler} />
        </div>
        {selectedUnits[0].x!== -5&&<AttackMenu units={selectedUnits} handleCLick={handleAttackClick}/>}
        </div>
    )
}
