'use client'

import { ModalCustom } from '@/components/custom-modal'
import { ScoreCard } from '@/components/dashboard/score-card'
import EmptyDataTableCustom from '@/components/table/empty-data'
import { CircularProgress } from '@mui/material'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import { useDashboardAverageSalaryPerPosition } from '@/utils/queries/use-report-dashboard'

// Load ApexCharts only on client side
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
    startDate: string
    endDate: string
}


const AverageSalaryPerPositionPieView = ({ startDate, endDate }: Props) => {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const toggle = () => setOpen(!open)
    const toggleModal = () => setOpenModal(!openModal)

    const { data: data_filter, isLoading } = useDashboardAverageSalaryPerPosition({
        start_date: startDate,
        end_date: endDate,
    })


    const [series, setSeries] = useState<number[]>([])
    const [labels, setLabels] = useState<string[]>([])

    useEffect(() => {
        if (!data_filter || data_filter.length === 0) {


            return
        }

        const sorted = data_filter.sort((a: any, b: any) => b.total - a.total).slice(0, 10)

        setLabels(sorted.map((item: any) => item.name))
        setSeries(sorted.map((item: any) => parseFloat(item.total.toFixed(2))))

    }, [data_filter])

    const options: ApexOptions = {
        chart: {
            type: 'pie',
        },
        labels,
        legend: {
            position: 'bottom',
        },
        tooltip: {
            y: {
                formatter: (val: number) => `$${val.toLocaleString()}`,
            },
        },
        dataLabels: {
            formatter: (val: any) => {

                return ` ${val.toFixed(1)}%`
            },
        },
    }

    return (
        <>
            <ScoreCard title='Rata-rata Gaji per Posisi (Top 10)' type='chart' toggleZoom={toggleModal} toggleFilter={toggle}>
                <div className='bg-white mt-2 flex justify-center items-center '>
                    {isLoading ? (
                        <CircularProgress />
                    ) : series.length > 0 ? (
                        <div className='w-full max-w-[800px]'>
                            <Chart options={options} series={series} type='pie' height={450} />
                        </div>
                    ) : (
                        <EmptyDataTableCustom />
                    )}
                </div>
            </ScoreCard>


            {openModal && (
                <ModalCustom maxWidth='lg' title='' toggle={toggleModal} hiddenClose open={openModal} hideButton>
                    <ScoreCard
                        zoom={openModal}
                        title='Rata-rata Gaji per Posisi (Top 10)'
                        type='chart'
                        toggleZoom={toggleModal}
                        toggleFilter={toggle}
                    >
                        <div className='bg-white mt-5'>
                            <Chart options={options} series={series} type='pie' height={400} />
                        </div>
                    </ScoreCard>
                </ModalCustom>
            )}
        </>
    )
}

export default AverageSalaryPerPositionPieView
