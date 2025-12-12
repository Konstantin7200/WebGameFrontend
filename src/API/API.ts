
const BASE="http://localhost:5000/";
const BASEUNITS=`${BASE}api/Unit/`;
const BASEGAME=`${BASE}api/Game/`;
export const API={
    
    UNITS:{
        getUnits:`${BASEUNITS}GetUnits` as const,
        getAvailableMovesForUnit:(x:number,y:number)=>`${BASEUNITS}GetHexesForUnit/?x=${x}&y=${y}` as const,
        getLastUnit:`${BASEUNITS}GetLastUnit` as const,
        getUnit:(x:number,y:number)=>`${BASEUNITS}GetUnit/?x=${x}&y=${y}` as const,
        isLeaderDead:`${BASEUNITS}IsLeaderDead` as const,

        fight:`${BASEUNITS}Fight` as const,
        moveUnitTo:(x:number,y:number,movesToReach:number)=>`${BASEUNITS}MoveUnitTo/?x=${x}&y=${y}&movesToReach=${movesToReach}` as const,
    },
    GAME:{
        isNextPlayerAI:`${BASEGAME}IsNextPlayerAI` as const,
        start:`${BASEGAME}StartGame` as const,
        
        endTurn:`${BASEGAME}EndTurn` as const,
        makeAIMove:`${BASEGAME}AIMove` as const,
        LoadGame:(index:number)=>`${BASEGAME}LoadGame/?index=${index}` as const,
        SaveGame:`${BASEGAME}SaveGame` as const,
        GetGames:`${BASEGAME}GetGames` as const,
    }
}as const