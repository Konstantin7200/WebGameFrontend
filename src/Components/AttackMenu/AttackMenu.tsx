import {FC} from 'react'
import { Attack } from '../Attack/Attack'
import st from "./AttackMenu.module.css"

interface AttackMenuProps{
    attacks1:any
    attacks2:any
    handleCLick:(attack1:any,attack2:any)=>void
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



export const AttackMenu:FC<AttackMenuProps>=({attacks1,attacks2,handleCLick})=>{
    if(attacks1==null)
        return(
    <div></div>
    )
    const mas1=getAttacksOnType(attacks1,attacks2,1);
    const mas2=getAttacksOnType(attacks1,attacks2,0);
    return (
        <div className={st.AttackMenu}>
            Attacks
            {mas1!=null&&
            <div onClick={()=>handleCLick(mas1[0],mas1[1])}>
                {mas1}
            </div>}
            {mas2!=null&&
            <div onClick={()=>handleCLick(mas2[0],mas2[1])}>
                {mas2}
            </div>}
        </div>
    )
}