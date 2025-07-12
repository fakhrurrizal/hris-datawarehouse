'use client'

import { ModalCustom } from '@/components/custom-modal'
import { ScoreCard } from '@/components/dashboard/score-card'
import EmptyDataTableCustom from '@/components/table/empty-data'
import { CircularProgress } from '@mui/material'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import { useSalaryComparison } from '@/utils/queries/use-report-dashboard'

// Load ApexCharts client-side
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })


interface Props {
    startDate: string
    endDate: string
}


const SalaryComparisonPieView = ({ startDate, endDate }: Props) => {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const toggle = () => setOpen(!open)
    const toggleModal = () => setOpenModal(!openModal)
    const { data, isLoading } = useSalaryComparison({
        start_date: startDate,
        end_date: endDate,
        
    })
    const [series, setSeries] = useState<number[]>([])
    const [labels, setLabels] = useState<string[]>([])

    useEffect(() => {
        if (!data) return

        const { highest, lowest } = data
        setLabels([`Tertinggi - ${highest.name}`, `Terendah - ${lowest.name}`])
        setSeries([highest.salary, lowest.salary])
    }, [data])

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
                formatter: (val: number) => `$${val}`,
            },
        },
        dataLabels: {
            formatter: (val: number) => `${val.toFixed(1)}%`,
        },
    }

    return (
        <>
            <ScoreCard title='Perbandingan Gaji Tertinggi & Terendah' type='chart' toggleZoom={toggleModal} toggleFilter={toggle}>
                <div className='bg-white mt-2 flex justify-center items-center'>
                    {isLoading ? (
                        <CircularProgress />
                    ) : series.length > 0 ? (
                        <div className='w-full max-w-[500px]'>
                            <Chart options={options} series={series} type='pie' height={400} />
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
                        title='Perbandingan Gaji Tertinggi & Terendah'
                        type='chart'
                        toggleZoom={toggleModal}
                        toggleFilter={toggle}
                    >
                        <div className='bg-white mt-5 flex justify-center'>
                            <Chart options={options} series={series} type='pie' height={400} />
                        </div>
                    </ScoreCard>
                </ModalCustom>
            )}
        </>
    )
}

export default SalaryComparisonPieView
