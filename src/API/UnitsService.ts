import { API } from "./API";



export const UnitService={
    loadUnits:async()=>{
        const data=await fetch(API.UNITS.getUnits)
        return await data.json();
    },
    getAvailableMovesForUnit:async(x:number,y:number)=>{
        const data=await fetch(API.UNITS.getAvailableMovesForUnit(x,y))
        return await data.json();
    },
    moveUnitTo:async (x:number,y:number,movesToReach:number)=>{
        await fetch(API.UNITS.moveUnitTo(x,y,movesToReach),{method:"PATCH"})
    },
    getUnit:async(x:number,y:number)=>{
        const data = await fetch(API.UNITS.getUnit(x,y));
        return await data.json();
    },
    getLastUnit:async()=>{
        const data = await fetch(API.UNITS.getLastUnit);
        return await data.json();
    },
    fight:async (attack1:any,attack2:any,selectedUnits:any)=>{
        const data={
            x1:selectedUnits[0].x,
            x2:selectedUnits[1].x,
            y1:selectedUnits[0].y,
            y2:selectedUnits[1].y,
            attack1:attack1,
            attack2:attack2
        }
        await fetch(API.UNITS.fight,{method:"POST",headers: {
                'Content-Type': 'application/json', 
            },body:JSON.stringify(data)});
    },
    checkIfLeadersAreDead:async()=>{
        const response=await fetch(API.UNITS.isLeaderDead)
        const data=await response.json()
        if(data===-1)
            return {
        gameWinner:"Right",
        gameOver:true
        }
        if(data===1){
            return {
        gameWinner:"Left",
        gameOver:true
        }
    }
        return{
            gameOver:false
        }
        
    }
}