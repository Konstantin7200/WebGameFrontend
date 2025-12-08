

export type UnitType={
    baseUnit:BaseUnit,
    x:number,
    y:number,
    side:number,
    health:number
}
type BaseUnit={
    health:number,
    type:string,
    resistances:object,
    attacks:AttackType[]
}
export type HexType={
    x:number,
    y:number,
    movesToReach:number,
    prev?:HexType,
    isEnemies:boolean,
    isForUnit:boolean
}
export type AttackType={
    attackName:string,
    damageType:number,
    attackType:number,
    attacksAmount:number,
    damage:number
}