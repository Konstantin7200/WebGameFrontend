import {FC} from 'react'
import Hex from '../Hex/Hex'
import st from "./HexMap.module.css"

interface HexMapProps{
    size?:number,
    hexSize?:number
    hexesForUnit:any
    onHexClick:(x:number,y:number)=>void
}


const HexMap:FC<HexMapProps>=({size=7,hexSize=60,hexesForUnit,onHexClick})=>{
    const hexElements=[];
    let offset:number;
    let rowHeight:number=1.5*hexSize;
    let hexWidth:number=Math.sqrt(3)*hexSize;

    const mapWidth:number=size*hexWidth;
    const mapHeight:number=(size-1)*rowHeight+rowHeight*2;
    const hexesForUnitSet=new Set();
    if(hexesForUnit!=null)
    for(let i=0;i<hexesForUnit.length;i++)
    {
        hexesForUnitSet.add((`${hexesForUnit[i].x},${hexesForUnit[i].y}`))
    }
    

    const style={
        height:`${mapHeight}px`,
        width:`${mapWidth}px`
    }
    let columns:number;
    for(let i=0;i<size;i++)
    {
        columns=size;
        offset=i%2==0?0:-hexWidth/2;
        for(let j=0;j<columns;j++)
        {
            hexElements.push(<Hex key={`${j}-${i}`} isForUnit={hexesForUnitSet.has(`${j},${i}`)} centerX={j*hexWidth+offset} centerY={i*rowHeight} size={hexSize} x={j} y={i} onHexClick={onHexClick}/>)
        }
    }
    return (
        <div  style={style} className={st.HexMap}>{hexElements} </div>
    )
}

export default HexMap


