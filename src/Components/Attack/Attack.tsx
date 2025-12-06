import { FC } from "react";
import st from "./Attack.module.css"
import Arcane from "../../Assets/WeaponIcons/Arcane.png" 
import SlashMelee from "../../Assets/WeaponIcons/Slash.png"
import SmashMelee from "../../Assets/WeaponIcons/Smash.png"
import Fire from "../../Assets/WeaponIcons/Fire.png"
import PierceMelee from "../../Assets/WeaponIcons/Pierce.png"
import RangedPierce from "../../Assets/WeaponIcons/PierceRanged.png"


interface AttackProps{
    attack:any,
    displayedDamage:number
}
function getAttackIcon(damageType:number,attackType:number){
    let mas=[Arcane,Fire,PierceMelee,SlashMelee,SmashMelee];
    let rangedMas=[Arcane,Fire,RangedPierce]
    if(damageType==undefined)
        return null;
    if(attackType==0)
    {
        return rangedMas[damageType];
    }
    
    return  mas[damageType]
}


export const Attack:FC<AttackProps>=({attack,displayedDamage})=>{
    const attackType=attack.attackType==1?"melee":"ranged";
    const myImage=getAttackIcon(attack.damageType,attack.attackType);
    return(
        <div className={st.Attack}>
            <div className={st.ImageCont}>
                {myImage&&<img src={myImage} alt="Some image" />}
            </div>
            <div>
                {attack.attackName}
            </div>
            <div>
            {displayedDamage}X{attack.attacksAmount}
            </div>
        </div>
    )
}