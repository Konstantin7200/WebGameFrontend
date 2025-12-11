import { FC, useState } from "react"
import st from "./MySellect.module.css"

interface MySelectProps{
    options:string[],
    onSelectFunc:any,
    index:number
}


export const MySelect:FC<MySelectProps>=({options,onSelectFunc,index})=>{
    const onSelect=(index:number,e:any)=>{
        setPicked(e);
        onSelectFunc(index,e);
    }
    let mas=[];
    for(let i=0;i<options.length;i++)
        mas.push(<option>{options[i]}</option>)
    const [picked,setPicked]=useState(options[0])
    return (
        <div className={st.MySelect}>
        <select value={picked} onChange={(e)=>onSelect(index,e.target.value)}>
            {mas}
        </select>
        </div>
    )
}