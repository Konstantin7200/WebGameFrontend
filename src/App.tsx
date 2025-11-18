import HexMap from "./Components/HexMap/HexMap"
import "./App.css"
import { useState } from "react";
import { UnitsMap } from "./Components/UnitsMap/UnitsMap";


const App=()=>{
    const generateUnits=()=>
    {
        fetch("http://localhost:5000/api/Unit/Generation",{method:"GET"}).then((response)=>response.json()).then((data)=>setUnits(data))
    };
    const loadUnits=()=>{
        fetch("http://localhost:5000/api/Unit/GetUnits",{method:"GET"}).then((response)=>response.json()).then((data)=>setUnits(data))
    };
    const unitClickHandler=(x:number,y:number)=>{
        fetch(`http://localhost:5000/api/Unit/GetHexesForUnit/?x=${x}&y=${y}`).then((response)=>response.json()).then((data)=>setHexesForUnit(data))
    }
    const hexClickHandler=async(x:number,y:number)=>{
        await fetch(`http://localhost:5000/api/Unit/MoveUnitTo/?x=${x}&y=${y}`,{method:"PATCH"})
        await loadUnits();
        unitClickHandler(x,y);
    }
    const [units,setUnits]=useState(null);
    const [hexesForUnit,setHexesForUnit]=useState(null);
    return (
        <div className="App">
            <button onClick={generateUnits}>Generate units</button>
            <button onClick={loadUnits}>Load units</button>
        <h1>Супер пупер игра</h1>
        <div>
        <UnitsMap units={units} UnitClickHandler={unitClickHandler}/>
        <HexMap hexesForUnit={hexesForUnit} onHexClick={hexClickHandler}/>
        </div>
        </div>
    )
}

export default App