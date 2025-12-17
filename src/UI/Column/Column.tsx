import { FC } from "react"
import st from "./Column.module.css"

interface ColumnProps{
    orientation:"Right"|"Left",
    children?:any
}

export const Column:FC<ColumnProps>=({orientation,children})=>{
    const style=orientation==="Right"?{right:'0',boxShadow: '-5px 0 15px white'}:{left:'0',boxShadow: '5px 0 15px white'}
    return(
        <div style={style} className={st.Column}>
            {children}
        </div>
    )
}