import { FC } from "react";
import st from "./Attack.module.css"
interface AttackProps{
    attack:any
}

export const Attack:FC<AttackProps>=({attack})=>{
    const attackType=attack.attackType==1?"melee":"ranged";
    return(
        <div className={st.Attack}>
            <div>
            {attack.attackName}
            </div>
            <div>
                {attackType}
            </div>
            <div>
            {attack.damage}
            </div>
            <div>
            {attack.attacksAmount}
            </div>
        </div>
    )
}