import { HexType } from "../../types"
import st from "./Hex.module.css"
import {FC} from "react"

const calculateWidthAndHeight=(size:number):[number,number]=>{
    return [Math.sqrt(3)*size,2*size]
}
//width=sqrt(3)*size
//height=2*size

const handleClick=(x:number,y:number,isForUnit:boolean,movesToReach:number,isEnemies:boolean,onHexClick:(x:number,y:number,movesToReach:number,isForUnit:boolean,isEnemies:boolean,prev:any)=>void,prev:any)=>{
    onHexClick(x,y,movesToReach,isForUnit,isEnemies,prev);
}

interface HexProps{
    size:number
    centerX:number
    centerY:number
    hex:HexType
    onHexClick:(x:number,y:number,movesToReach:number,isForUnit:boolean,isEnemies:boolean,prev:any)=>void,
}


const Hex:FC<HexProps>=({size,centerX,centerY,onHexClick,hex})=>{
    const [width,height]=calculateWidthAndHeight(size);
    let color=hex.isForUnit?'radial-gradient(burlywood,rgba(192, 222, 25, 1))':'radial-gradient(burlywood,rgb(230, 161, 71))'
    color=hex.isEnemies?'radial-gradient(burlywood,rgba(234, 17, 17, 1))':color;
    const style={
        width:`${width}px`,
        height:`${height}px`,
        top:`${centerY}px`,
        left:`${centerX}px`,
        background:color
    }
    return(
        <div style={style} onClick={()=>onHexClick(hex.x,hex.y,hex.movesToReach,hex.isForUnit,hex.isEnemies,hex.prev)} className={st.Hex}>{`${hex.x}-${hex.y}`}</div>
    )
}

export default Hex