import {FC} from 'react'
import { Attack } from './Attack/Attack'
import st from "./AttackMenu.module.css"
import { Unit } from '../../../Unit/Unit'
import { AttackType, UnitType } from '../../../../types'

interface AttackMenuProps{
    handleCLick:(attack1:any,attack2:any)=>void,
    units:UnitType[]
}
const damageTypes=["Arcane","Fire","Pierce","Slash","Smash"]

const calculateAttackDamage=(attack:AttackType,defender:any)=>{
    return Math.floor(attack.damage*(1-defender.baseUnit.resistances[damageTypes[attack.damageType]]))
}

const getAttacksOnType=(units:UnitType[],type:number)=>{
    const attacks1=JSON.parse(JSON.stringify(units[0].baseUnit.attacks));
    const attacks2=JSON.parse(JSON.stringify(units[1].baseUnit.attacks));
    const mas=[];
    let fakeAttack:AttackType={attackName:"Nothing",attackType:type,damage:0,attacksAmount:0,damageType:-1};
    for(let i=0;i<attacks1.length;i++)
    {
        if(attacks1[i].attackType===type)
        {
            mas.push(<Attack key={"mas1"+i} attack={attacks1[i]} displayedDamage={calculateAttackDamage(attacks1[i],units[1])}></Attack>);
        }
    }
    if(mas.length==0)
        return null;
    for(let i=0;i<attacks2.length;i++)
    {
        if(attacks2[i].attackType===type)
        {
            mas.push(<Attack key={"mas2"+i} attack={attacks2[i]} displayedDamage={calculateAttackDamage(attacks2[i],units[0])}></Attack>);
        }
    }
    if(mas.length==1)
        mas.push(<Attack key={"mas2"+0} attack={fakeAttack} displayedDamage={0}/>);
    return mas;
}



export const AttackMenu:FC<AttackMenuProps>=({handleCLick,units})=>{
    /*if(attacks1==null)
        return(
    <div></div>
    )*/
    const mas1=getAttacksOnType(units,1);
    const mas2=getAttacksOnType(units,0);
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
        unitMas.push(<Unit clickable={false} key={`unit${i}`} unit={units[i]} style={style}/>)
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