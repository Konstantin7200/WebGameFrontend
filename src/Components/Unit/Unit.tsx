import { FC } from "react"
import Swordsman from "../../Assets/UnitSprites/VeteranSwordsman.gif"
import st from "./Unit.module.css"
import Archer from "../../Assets/UnitSprites/ElfSharpshooter.gif"
import Lord from "../../Assets/UnitSprites/ElfLord.gif"

interface UnitProps{
    unit:any,
    UnitClickHandler?:(x:number,y:number)=>void,
    style?:any
}
const handleUnitClick=(x:number,y:number,UnitClickHandler:(x:number,y:number)=>void)=>{
    UnitClickHandler(x,y);
}
const getUnitSprite=(type:string)=>{
    if(type=="Swordsman")
    return Swordsman;
    if(type=="Archer")
    return Archer;
    return Lord;
}

export const Unit:FC<UnitProps>=({UnitClickHandler,unit,style})=>{
    let { centerX, centerY, x, y, side, health } = unit;
    let  baseHealth=unit.baseUnit.health;
    let type=unit.baseUnit.type||"Swordsman";
    centerY+=25;
    centerX+=30;
    let rotation=side?-1:1
    let color=side?'red':'blue';
    let hpPercent=100.0*health/baseHealth;
    const newStyle={
        transform:`scaleX(${rotation})`,
        ...style
    }
    const HpBarContStyle={
        border:`${color} 2px solid`
    }
    const HpBarStyle={
        width:`${hpPercent}%`
    }
    return (
        <div style={newStyle} className={st.Unit} onClick={()=>handleUnitClick(x,y,UnitClickHandler||(()=>console.log(1)))}>
            <div className={st.HpBarCont} style={HpBarContStyle}>
                <div className={st.HpBar} style={HpBarStyle}></div>
            </div>
            <img src={getUnitSprite(type)} alt="swordsmanSprite" />
        </div>
    )
}