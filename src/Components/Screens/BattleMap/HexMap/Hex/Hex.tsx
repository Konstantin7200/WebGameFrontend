import { Tooltip } from "react-tooltip"
import { HexType } from "../../../../../types"
import st from "./Hex.module.css"
import {FC} from "react"

const calculateWidthAndHeight=(size:number):[number,number]=>{
    return [Math.sqrt(3)*size,2*size]
}
//width=sqrt(3)*size
//height=2*size

interface HexProps{
    size:number
    centerX:number
    centerY:number
    hex:HexType
    onHexClick:(x:number,y:number,movesToReach:number,isForUnit:boolean,isEnemies:boolean,prev:any)=>void,
}


const Hex:FC<HexProps>=({size,centerX,centerY,onHexClick,hex})=>{
    const [width,height]=calculateWidthAndHeight(size);
    let hexColor="#475569";
    //"0,25 0,75 50,100 100,75 100,25 50,0"
    let tooltipId;
    const hexPoints=`${0*width},${0.25*height} ${0*width},${0.75*height} ${0.5*width},${1*height} ${1*width},${0.75*height} ${1*width},${0.25*height} ${0.5*width},${0*height}`;
    if(hex.isForUnit)
    {
        tooltipId="hexToMove"
        if(hex.movesToReach===1)
        hexColor='#007f08ff'
        else if(hex.movesToReach===2)
            hexColor='#00a30bdf'
        else hexColor='#00bc0dff'
    }
    if(hex.isEnemies)
    {
        tooltipId="hexToAttack"
        hexColor='rgba(209, 0, 0, 1)'
    }
    const style={
        width:`${width}px`,
        height:`${height}px`,
        top:`${centerY}px`,
        left:`${centerX}px`,
    }
    return(
        <div data-tooltip-id={tooltipId} style={style} onClick={()=>onHexClick(hex.x,hex.y,hex.movesToReach,hex.isForUnit,hex.isEnemies,hex.prev)} className={st.Hex}>
            <svg width="100%" height="100%" preserveAspectRatio="none" fill={hexColor} stroke="black">
                <polygon points={hexPoints}/>
            </svg>
        
        </div>
    )
}

export default Hex