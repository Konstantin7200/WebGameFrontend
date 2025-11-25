import { FC } from "react"
import Swordsman from "../../Assets/UnitSprites/VeteranSwordsman.gif"
import st from "./Unit.module.css"
import Archer from "../../Assets/UnitSprites/ElfSharpshooter.gif"
import Lord from "../../Assets/UnitSprites/ElfLord.gif"

interface UnitProps{
    centerX:number,
    centerY:number,
    type?:string,
    UnitClickHandler:(x:number,y:number)=>void,
    x:number,
    y:number,
    side:boolean
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

export const Unit:FC<UnitProps>=({centerX,centerY,type="Swordsman",x,y,UnitClickHandler,side})=>{
    centerY+=25;
    centerX+=30;
    let rotation=side?-1:1
    let color=side?'linear-gradient(rgba(223, 80, 80, 0) 95%,rgba(255, 0, 0, 0.53))':'linear-gradient(rgba(223, 80, 80, 0) 95%,rgba(0, 12, 248, 0.53))';
    const style={
        top:`${centerY}px`,
        left:`${centerX}px`,
        transform:`scaleX(${rotation})`,
        background:color
    }
    return (
        <div style={style} className={st.Unit} onClick={()=>handleUnitClick(x,y,UnitClickHandler)}>
            <img src={getUnitSprite(type)} alt="swordsmanSprite" />
        </div>
    )
}