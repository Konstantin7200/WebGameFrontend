import { API } from "./API";

export const GameService={
    endTurn:async()=>{
        await fetch(API.GAME.endTurn,{method:"PATCH"});
        
    }, 
    checkIsNextPlayerAI:async()=>{
        const data=await fetch(API.GAME.isNextPlayerAI);
        return await data.json();
    },
    makeAIMove:async ()=>{
        const data=await fetch(API.GAME.makeAIMove,{method:"POST"})
        return data.json()
    },
    createNewGame:async(playerTypes:any)=>{
        const data={playerType1:playerTypes[0]=="Player",playerType2:playerTypes[1]=="Player"};
        await fetch(API.GAME.start,{method:"POST",body:JSON.stringify(data),headers:{'Content-Type': 'application/json'}});
    }
    
}