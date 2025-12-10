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
        <Tooltip style={tooltipStyle} id="unitTooltipEN" delayHide={300} delayShow={100} content="Click to view my moves"/>
        <Tooltip style={tooltipStyle} id="hexToAttackEN"  delayShow={300} delayHide={300} content="Click to attack the enemy" />
        <Tooltip style={tooltipStyle} id="hexToMoveEN" delayShow={300} delayHide={300} content="Click to move here" />

        <Tooltip style={tooltipStyle} id="unitTooltip" delayHide={300} delayShow={100} content="Нажми чтобы посмотреть доступные ходы"/>
        <Tooltip style={tooltipStyle} id="hexToAttack"  delayShow={300} delayHide={300} content="Нажми чтобы аттаковать" />
        <Tooltip style={tooltipStyle} id="hexToMove" delayShow={300} delayHide={300} content="Нажми чтобы походить сюда" />
        </>
    )
}