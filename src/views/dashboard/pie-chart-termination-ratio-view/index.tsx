'use client'

import { ModalCustom } from '@/components/custom-modal'
import { ScoreCard } from '@/components/dashboard/score-card'
import EmptyDataTableCustom from '@/components/table/empty-data'
import { useDashboardPieChartEmployeeTerminationRatio } from '@/utils/queries/use-report-dashboard'
import { CircularProgress } from '@mui/material'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
    startDate: string
    endDate: string
}

const PieChartTerminationRatioView = ({ startDate, endDate }: Props) => {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const toggle = () => setOpen(!open)
    const toggleModal = () => setOpenModal(!openModal)

    const { data, isLoading } = useDashboardPieChartEmployeeTerminationRatio({
        start_date: startDate,
        end_date: endDate
    })

    const [series, setSeries] = useState<number[]>([])
    const [labels, setLabels] = useState<string[]>([])

    useEffect(() => {
        if (!data || data.length === 0) return

        const newSeries = data.map((item: any) => item.total)
        const newLabels = data.map((item: any) => item.name)

        setSeries(newSeries)
        setLabels(newLabels)
    }, [data])

    const options: ApexOptions = {
        chart: {
            type: 'pie'
        },
        labels,
        legend: {
            position: 'bottom'
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} karyawan`
            }
        }
    }

    return (
        <>
            <ScoreCard
                title='Rasio Alasan Penghentian'
                type='chart'
                toggleZoom={toggleModal}
                toggleFilter={toggle}
            >
                <div className='bg-white mt-2 flex justify-center items-center px-6 py-4  '>
                    {isLoading ? (
                        <CircularProgress />
                    ) : data && data.length > 0 ? (
                        <div className='w-full flex justify-center'>
                            <Chart options={options} series={series} type='pie' height={400} />
                        </div>
                    ) : (
                        <EmptyDataTableCustom />
                    )}
                </div>
            </ScoreCard>

            {openModal && (
                <ModalCustom
                    maxWidth='lg'
                    title=''
                    toggle={toggleModal}
                    hiddenClose
                    open={openModal}
                    hideButton
                >
                    <ScoreCard
                        zoom={openModal}
                        title='Rasio Alasan Penghentian'
                        type='chart'
                        toggleZoom={toggleModal}
                        toggleFilter={toggle}
                    >
                        <div className='bg-white mt-5 flex justify-center px-6 py-4'>
                            <Chart options={options} series={series} type='pie' height={500} />
                        </div>
                    </ScoreCard>
                </ModalCustom>
            )}


        </>
    )
}

export default PieChartTerminationRatioView
