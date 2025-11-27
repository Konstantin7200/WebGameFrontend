import {FC} from "react"
import { Unit } from "../Unit/Unit";
import st from "./UnitsMap.module.css"

interface UnitsMapProps{
    size?:number,
    hexSize?:number
    units:any
    UnitClickHandler:(x:number,y:number)=>void
}

export const UnitsMap:FC<UnitsMapProps>=({size=7,hexSize=60,units,UnitClickHandler})=>{
    let index=0;
    const unitsMas=[];
    let rowHeight:number=1.5*hexSize;
    let hexWidth:number=Math.sqrt(3)*hexSize;
    let offset:number;

    
    if(units!=null)
    {
        for(let i=0;i<units.length;i++)
        {
            let x=units[i].x;
            let y=units[i].y;
            if(y%2==0)
                offset=0;
            else offset=-hexWidth/2;
            index++;

            unitsMas.push(<Unit key={`${x}-${y}`} unit={units[i]} style={{left:x*hexWidth+offset+25+'px',top:y*rowHeight+20+'px'}} UnitClickHandler={UnitClickHandler} ></Unit>)
        }
    }

    return (
        <div className={st.UnitsMap}>
            {unitsMas}
         </div>
    )
}