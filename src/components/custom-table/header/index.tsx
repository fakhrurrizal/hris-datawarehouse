import { IconButton } from '@mui/material'
import { Box } from '@mui/material'
import { Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { ReactNode } from 'react'

interface Props {
    title: string
    backUrl?: any
    recordsTotal?: number
    routeBack?: boolean
    CustomComponent?: ReactNode
}

const HeaderSectionTableCustom = ({ title, backUrl, recordsTotal, routeBack = false, CustomComponent }: Props) => {
    const router = useRouter()

    const handleBack = () => {
        if (routeBack) {
            router.back()
        } else {
            router.push(backUrl)
        }
    }

    return (
        <>
            <section className='p-5 pb-0 flex justify-between items-center border-b-[1px] mb-3 border-slate-300'>
                <div className='flex gap-3 items-center  pb-4'>
                    {backUrl && (
                        <Tooltip title={<Typography sx={{ color: 'white' }}>Kembali</Typography>}>
                            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                                <IconButton color='primary' onClick={handleBack} sx={{ border: 1 }}>
                                    <KeyboardArrowLeftIcon />
                                </IconButton>
                            </Box>
                        </Tooltip>
                    )}

                    {backUrl && <div className='h-[30px] w-[2px] bg-slate-500'></div>}

                    <div>
                        <h1 className='font-semibold text-lg cursor-default'>
                            {title}
                            {recordsTotal !== undefined && recordsTotal > 0 && (
                                <span className='ml-2 px-2 py-1 bg-green-100 text-green-600 rounded-md'>
                                    {recordsTotal}
                                </span>
                            )}
                        </h1>
                    </div>
                </div>
                {CustomComponent &&
                    <>
                        {CustomComponent}
                    </>
                }
            </section>
        </>
    )
}

export default HeaderSectionTableCustom
