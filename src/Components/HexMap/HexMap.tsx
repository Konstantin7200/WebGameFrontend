import {FC} from 'react'
import Hex from '../Hex/Hex'
import st from "./HexMap.module.css"
import { HexType } from '../../types'

interface HexMapProps{
    size?:number,
    hexSize?:number
    hexesForUnit:any
    onHexClick:(x:number,y:number,movesToReach:number,isForUnit:boolean,isEnemies:boolean,prev:any)=>void
}

const HexMap:FC<HexMapProps>=({size=7,hexSize=60,hexesForUnit,onHexClick})=>{
    const hexElements=[];
    let offset:number;
    let rowHeight:number=1.5*hexSize;
    let hexWidth:number=Math.sqrt(3)*hexSize;

    const mapWidth:number=size*hexWidth;
    const mapHeight:number=(size-1)*rowHeight+rowHeight*2;
    const hexesForUnitMap=new Map();
    const enemiesHexesMap=new Map();
    if(hexesForUnit?.enemiesHexes!=null)
    {
    const freeHexes=hexesForUnit.hexes;
    const enemiesHexes=hexesForUnit.enemiesHexes;
    for(let i=0;i<freeHexes.length;i++)
    {
        hexesForUnitMap.set((`${freeHexes[i].x},${freeHexes[i].y}`),freeHexes[i].moves)
    }
    for(let i=0;i<enemiesHexes.length;i++)
    {
        enemiesHexesMap.set(`${enemiesHexes[i].x},${enemiesHexes[i].y}`,enemiesHexes[i].previous);
    }
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
            const hex:HexType={
                isForUnit:hexesForUnitMap.has(`${j},${i}`),
                x:j,
                y:i,
                movesToReach:hexesForUnitMap.get(`${j},${i}`),
                isEnemies:enemiesHexesMap.has(`${j},${i}`),
                prev:enemiesHexesMap.get(`${j},${i}`)
            }
            hexElements.push(<Hex key={`${j}-${i}`} hex={hex}  centerX={j*hexWidth+offset} centerY={i*rowHeight} size={hexSize}  onHexClick={onHexClick}/>)
        }
    }
    return (
        <div  style={style} className={st.HexMap}>{hexElements} </div>
    )
}

export default HexMap


