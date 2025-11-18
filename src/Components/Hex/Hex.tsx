import st from "./Hex.module.css"
import {FC} from "react"

const calculateWidthAndHeight=(size:number):[number,number]=>{
    return [Math.sqrt(3)*size,2*size]
}
//width=sqrt(3)*size
//height=2*size

const handleClick=(x:number,y:number,isForUnit:boolean,onHexClick:(x:number,y:number)=>void)=>{
    if(isForUnit)
        onHexClick(x,y);
}

interface HexProps{
    size:number
    centerX:number
    centerY:number
    x:number,
    y:number,
    isForUnit:boolean
    onHexClick:(x:number,y:number)=>void
}


const Hex:FC<HexProps>=({size,centerX,centerY,x,isForUnit,y,onHexClick})=>{
    const [width,height]=calculateWidthAndHeight(size);
    let color=isForUnit?'radial-gradient(burlywood,rgba(192, 222, 25, 1))':'radial-gradient(burlywood,rgb(230, 161, 71))'
    const style={
        width:`${width}px`,
        height:`${height}px`,
        top:`${centerY}px`,
        left:`${centerX}px`,
        background:color
    }
    return(
        <div style={style} onClick={()=>handleClick(x,y,isForUnit,onHexClick)} className={st.Hex}>{`${x}-${y}`}</div>
    )
}

export default Hex