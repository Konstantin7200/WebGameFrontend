import { FC } from "react"
import swordsman from "../../Assets/UnitSprites/VeteranSwordsman.gif"
import st from "./Unit.module.css"

interface UnitProps{
    centerX:number,
    centerY:number,
    type?:string,
    UnitClickHandler:(x:number,y:number)=>void,
    x:number,
    y:number
}
const handleUnitClick=(x:number,y:number,UnitClickHandler:(x:number,y:number)=>void)=>{
    UnitClickHandler(x,y);
}

export const Unit:FC<UnitProps>=({centerX,centerY,type=swordsman,x,y,UnitClickHandler})=>{
    centerY+=25;
    centerX+=30;

    const style={
        top:`${centerY}px`,
        left:`${centerX}px`
    }
    return (
        <div style={style} className={st.Unit} onClick={()=>handleUnitClick(x,y,UnitClickHandler)}>
            <img src={swordsman} alt="swordsmanSprite" />
        </div>
    )
}