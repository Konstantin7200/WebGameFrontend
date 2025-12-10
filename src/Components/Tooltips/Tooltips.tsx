import { FC } from "react"
import { Tooltip } from "react-tooltip"

interface TooltipsProps{
    children:any
}


export const Tooltips:FC<TooltipsProps>=({children})=>
{
    const tooltipStyle={
        zIndex:'99'
    }
    return (
        <>
        {children}
        <Tooltip style={tooltipStyle} id="unitTooltip" delayHide={300} delayShow={100} content="Click me to view my moves"/>
        <Tooltip style={tooltipStyle}  delayShow={300} delayHide={300} content={"Click me to attack the enemy"} id="hexToAttack"/>
        <Tooltip style={tooltipStyle}  delayShow={300} delayHide={300} content={"Click me to move here"} id="hexToMove"/>
        </>
    )
}