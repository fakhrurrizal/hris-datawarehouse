import IconifyIcon from '@/components/icon'
import { Button, Card, Skeleton } from '@mui/material'
import { Fragment, ReactNode } from 'react'

interface ScoreCardProps {
    title: string
    children: ReactNode
    type: 'chart' | 'score-card' | 'score-card-single' | 'table'
    toggleFilter?: () => void
    toggleZoom?: () => void
    zoom?: boolean
    isFilter?: boolean
}

export const ScoreCard = (props: ScoreCardProps) => {
    const { title, children, isFilter, type = 'score-card', toggleFilter, toggleZoom, zoom } = props

    let content

    if (type === 'score-card') {
        content = <div className='grid lg:grid-cols-2 grid-flow-row mt-6 gap-x-1 gap-y-8'>{children}</div>
    } else if (type === 'score-card-single' || type === 'chart' || type === 'table') {
        content = <div className='mt-4'>{children}</div>
    }

    return (
        <Fragment>
            <div className='rounded-lg border-[1px] shadow-md w-full pt-5 pb-10  xl:pt-2 xl:pb-7 px-5 lg:px-4 h-full'>
                {/* Header */}
                <div className='flex justify-between overflow-auto'>
                    {/* Title */}
                    <div className='flex items-center'>
                        <h3 className='text-sm font-bold text-nowrap'>{title}</h3>
                    </div>
                    {/* Title */}

                    {/* Button */}
                    <div className='flex items-center'>
                        {isFilter && (
                            <Button className='!p-1 !min-w-3' onClick={toggleFilter}>
                                <IconifyIcon icon='lucide:filter' />
                            </Button>
                        )}
                        {/* <Button className='!p-1 !min-w-3'>
                            <IconifyIcon icon='heroicons-outline:refresh' />
                        </Button> */}
                        {toggleZoom && (
                            <Button className='!p-1 !min-w-3' onClick={toggleZoom}>
                                <IconifyIcon
                                    icon={
                                        zoom
                                            ? 'streamline:interface-arrows-shrink-3-expand-retract-shrink-bigger-big-small-smaller'
                                            : 'eva:expand-fill'
                                    }
                                />
                            </Button>
                        )}
                    </div>
                    {/* Button */}
                </div>
                {/* Header end */}

                {/* Card */}
                {content}
                {/* Card end */}
            </div>
        </Fragment>
    )
}

interface ScoreCardItemProps {
    icon: string
    title: string
    value: string
    iconColor: string
    bgColor: string
    classNameValue?: string
    isLoading?:boolean
}

export const ScoreCardItem = (props: ScoreCardItemProps) => {
    const {
        icon = 'ph:wifi-none-thin',
        title = 'title',
        value = 'value',
        iconColor = 'blue-800',
        bgColor = 'blue-300',
        classNameValue,
        isLoading = false,
    } = props

    return (
        <Fragment>
            <Card className='w-full h-full p-5 rounded-lg border-[1px] shadow-md drop-shadow-md flex'>
                <div className='flex gap-2 items-center'>
                    <div className={`p-3.5 rounded-lg`} style={{ backgroundColor: bgColor }}>
                        <IconifyIcon icon={icon} fontSize={20} color={iconColor} />
                    </div>
                    <div className='flex-col gap-1 w-full'>
                        <p className='text-xs 2xl:text-sm font-medium'>{title}</p>
                        {isLoading ? (
                            <Skeleton width={80} height={24} variant="text" />
                        ) : (
                            <p className={`md:text-sm 2xl:text-base font-bold ${classNameValue}`}>{value}</p>
                        )}
                    </div>
                    {/* data end */}
                </div>
            </Card>
        </Fragment>
    )
}
