import { FC } from "react"
import swordsman from "../../Assets/UnitSprites/VeteranSwordsman.gif"
import st from "./Unit.module.css"
import { transform } from "typescript"

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

export const Unit:FC<UnitProps>=({centerX,centerY,type=swordsman,x,y,UnitClickHandler,side})=>{
    centerY+=25;
    centerX+=30;
    let rotation=side?-1:1

    const style={
        top:`${centerY}px`,
        left:`${centerX}px`,
        transform:`scaleX(${rotation})`
    }
    return (
        <div style={style} className={st.Unit} onClick={()=>handleUnitClick(x,y,UnitClickHandler)}>
            <img src={swordsman} alt="swordsmanSprite" />
        </div>
    )
}