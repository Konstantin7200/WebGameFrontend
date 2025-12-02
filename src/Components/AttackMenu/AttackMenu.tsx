import {FC} from 'react'
import { Attack } from '../Attack/Attack'
import st from "./AttackMenu.module.css"
import { Unit } from '../Unit/Unit'

interface AttackMenuProps{
    attacks1:any
    attacks2:any
    handleCLick:(attack1:any,attack2:any)=>void,
    units:any
}

const getAttacksOnType=(attacks1:any,attacks2:any,type:number)=>{
    const mas1=[];
    let fakeAttack={attackName:"Nothing",attackType:type,damage:0,attacksAmount:0};
    for(let i=0;i<attacks1.length;i++)
    {
        if(attacks1[i].attackType===type)
            mas1.push(<Attack key={"mas1"+i} attack={attacks1[i]}></Attack>);
    }
    if(mas1.length==0)
        return null;
    for(let i=0;i<attacks2.length;i++)
    {
        if(attacks2[i].attackType===type)
            mas1.push(<Attack key={"mas2"+i} attack={attacks2[i]}></Attack>);
    }
    if(mas1.length==1)
        mas1.push(<Attack key={"mas2"+0} attack={fakeAttack}/>);
    return mas1;
}



export const AttackMenu:FC<AttackMenuProps>=({attacks1,attacks2,handleCLick,units})=>{
    if(attacks1==null)
        return(
    <div></div>
    )
    const mas1=getAttacksOnType(attacks1,attacks2,1);
    const mas2=getAttacksOnType(attacks1,attacks2,0);
    let index=[0,1];
    if(units[0].side)
    {
        index=[1,0];
        mas1?.reverse();
        mas2?.reverse();
    }
    let unitMas=[];
    for(let i=0;i<2;i++)
    {
        const style={
            right:`${units[i].side?3:46}rem`
        }
        unitMas.push(<Unit key={`unit${i}`} unit={units[i]} style={style}/>)
    }
    return (
        <div className={st.AttackMenu}>
            <div>
                {unitMas}
            </div>
            <p>Pick an attack</p>
            <div>
                <span>Health:{units[index[0]].health} / {units[index[0]].baseUnit.health}</span>
                <span>Health:{units[index[1]].health} / {units[index[1]].baseUnit.health}</span>
            </div>
            {mas1!=null&&
            <div onClick={()=>handleCLick(mas1[index[0]],mas1[index[1]])}>
                {mas1}
            </div>}
            {mas2!=null&&
            <div onClick={()=>handleCLick(mas2[index[0]],mas2[index[1]])}>
                {mas2}
            </div>}
        </div>
    )
}