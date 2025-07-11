'use client'

import { ModalCustom } from '@/components/custom-modal'
import { ScoreCard } from '@/components/dashboard/score-card'
import EmptyDataTableCustom from '@/components/table/empty-data'
import { useDashboardLineTrendAveragePerformance } from '@/utils/queries/use-report-dashboard'
import { CircularProgress } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
    startDate: string
    endDate: string
}

const TrendAveragePerformanceViews = ({ endDate, startDate }: Props) => {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const toggle = () => setOpen(!open)
    const toggleModal = () => setOpenModal(!openModal)

    const { data: data_filter, isLoading } = useDashboardLineTrendAveragePerformance({
        start_date: startDate,
        end_date: endDate,
    })

    const [series, setSeries] = useState<ApexAxisChartSeries>([])
    const [categories, setCategories] = useState<string[]>([])
    useEffect(() => {
        if (!data_filter || data_filter.length === 0) return

        const labels = Array.from(new Set(data_filter.map((d: any) => d.label as string))) as string[]
        const periods = Array.from(new Set(data_filter.map((d: any) => d.x as string))) as string[]
        periods.sort()

        const grouped: Record<string, Record<string, number>> = {}
        labels.forEach((label) => {
            grouped[label] = {}
            periods.forEach((period) => {
                grouped[label][period] = 0
            })
        })

        data_filter.forEach((item: any) => {
            grouped[item.label][item.x] += item.y
        })

        const formattedSeries = labels.map((label) => ({
            name: label,
            data: periods.map((period) => grouped[label][period]),
        })) as ApexAxisChartSeries

        setSeries(formattedSeries)
        setCategories(periods)
    }, [data_filter])

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: true,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        xaxis: {
            categories,
            labels: {
                rotate: -45,
            },
        },
        yaxis: {
            title: {
                text: 'Jumlah Karyawan',
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        legend: {
            position: 'top',
        },
        fill: {
            opacity: 1,
        },
    }

    return (
        <>
            <ScoreCard title='Tren Skor Kinerja Karyawan' type='chart' toggleZoom={toggleModal} toggleFilter={toggle}>
                <div className='bg-white mt-2 flex justify-center items-center'>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {data_filter?.length > 0 ? (
                                <div className='h-full w-full'>
                                    <Chart options={options} series={series} type='bar' height={350} />
                                </div>
                            ) : (
                                <EmptyDataTableCustom />
                            )}
                        </>
                    )}
                </div>
            </ScoreCard>

            {openModal && (
                <ModalCustom maxWidth='lg' title='' toggle={toggleModal} hiddenClose open={openModal} hideButton>
                    <ScoreCard
                        zoom={openModal}
                        title='Tren Skor Kinerja Karyawan'
                        type='chart'
                        toggleZoom={toggleModal}
                        toggleFilter={toggle}
                    >
                        <div className='bg-white mt-5'>
                            <Chart options={options} series={series} type='bar' height={400} />
                        </div>
                    </ScoreCard>
                </ModalCustom>
            )}
        </>
    )
}

export default TrendAveragePerformanceViews
