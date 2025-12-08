import { FC } from "react"
import st from "./Unit.module.css"
import Archer from "../../Assets/UnitSprites/ElfSharpshooter.gif"
import Lord from "../../Assets/UnitSprites/ElfLord.gif"
import Paladin from "../../Assets/UnitSprites/BlessedGladiator.gif"
import Javeliner from "../../Assets/UnitSprites/BoldManAtArms.gif"
import Axer from "../../Assets/UnitSprites/DeterminedSoldier.gif"
import SwordAngel from "../../Assets/UnitSprites/SwordArchon.gif"
import AngelDeva from "../../Assets/UnitSprites/RighteousDeva.gif"
import Priest from "../../Assets/UnitSprites/ZealousPriest.gif"
import { UnitType } from "../../types"

interface UnitProps{
    unit:UnitType,
    UnitClickHandler?:(x:number,y:number)=>void,
    style?:any,
    clickable:boolean
}
const handleUnitClick=(x:number,y:number,UnitClickHandler:(x:number,y:number)=>void)=>{
    UnitClickHandler(x,y);
}
const UnitSprites=new Map([["Lord",Lord],["Archer",Archer],["Paladin",Paladin],["Axer",Axer],["SwordAngel",SwordAngel],["Priest",Priest],["Javeliner",Javeliner],["AngelDeva",AngelDeva]]);
const getUnitSprite=(type:string)=>{
    return UnitSprites.get(type);
}

export const Unit:FC<UnitProps>=({UnitClickHandler,unit,style,clickable})=>{
    let { x, y, side, health } = unit;
    let  baseHealth=unit.baseUnit.health;
    let type=unit.baseUnit.type;
    let rotation=side?-1:1;
    let pointerEvents=clickable?"auto":"none"
    let color=side?'red':'blue';
    let hpPercent=100.0*health/baseHealth;
    const newStyle={
        transform:`scaleX(${rotation})`,
        pointerEvents:pointerEvents,
        ...style
    }
    const HpBarContStyle={
        border:`${color} 2px solid`
    }
    const HpBarStyle={
        width:`${hpPercent}%`
    }
    return (
        <div style={newStyle} className={st.Unit} onClick={()=>handleUnitClick(x,y,UnitClickHandler||(()=>{}))}>
            <div className={st.HpBarCont} style={HpBarContStyle}>
                <div className={st.HpBar} style={HpBarStyle}></div>
            </div>
            <img src={getUnitSprite(type)} alt="swordsmanSprite" />
        </div>
    )
}