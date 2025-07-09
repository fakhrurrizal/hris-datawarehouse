import Tooltip, { TooltipProps } from '@mui/material/Tooltip'
import { ReactNode } from 'react'

interface CustomTooltipProps extends Omit<TooltipProps, 'title'> {
    followCursor?: boolean
    disableCondition?: boolean
    title: string | ReactNode
    disableMarginTop?: boolean
    marginTop?: number
    cursor?: 'default' | 'pointer'
    fontSize?: 'sm' | 'xs' | 'lg' | 'xl'
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
    children,
    followCursor = false,
    disableCondition = false,
    title,
    disableMarginTop = false,
    cursor = 'default',
    marginTop = 3,
    fontSize = 'sm',
    ...tooltipProps
}) => {
    if (!children) {
        throw new Error('CustomTooltip component must have children.')
    }

    return (
        <Tooltip
            sx={{ mt: disableMarginTop ? '' : marginTop }}
            title={<p className={`text-white text-${fontSize}`}>{title}</p>}
            followCursor={followCursor}
            disableFocusListener={disableCondition}
            disableHoverListener={disableCondition}
            {...tooltipProps}
        >
            <span className={`cursor-${cursor}`}>{children}</span>
        </Tooltip>
    )
}
