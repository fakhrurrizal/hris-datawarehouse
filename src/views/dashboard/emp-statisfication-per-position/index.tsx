'use client'

import { ScoreCard } from '@/components/dashboard/score-card'
import { ModalCustom } from '@/components/custom-modal'
import EmptyDataTableCustom from '@/components/table/empty-data'
import { useDashboardEmpSatisfactionPerPosition } from '@/utils/queries/use-report-dashboard'
import { CircularProgress } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
    startDate: string
    endDate: string
}

const EmpSatisfactionPerPosition = ({ startDate, endDate }: Props) => {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const toggle = () => setOpen(!open)
    const toggleModal = () => setOpenModal(!openModal)

    const { data: data_filter, isLoading } = useDashboardEmpSatisfactionPerPosition({
        start_date: startDate,
        end_date: endDate,
    })

    const [series, setSeries] = useState<{ name: string; data: { x: string; y: number }[] }[]>([])

    useEffect(() => {
        if (!data_filter || data_filter.length === 0) return

        const grouped: { [key: string]: { x: string; y: number }[] } = {}

        data_filter.forEach((item: any) => {
            const position = item.x
            const period = item.y
            const value = item.value

            if (!grouped[position]) {
                grouped[position] = []
            }

            grouped[position].push({ x: period, y: parseFloat(value.toFixed(2)) })
        })

        const heatmapSeries = Object.keys(grouped).map(position => ({
            name: position,
            data: grouped[position],
        }))

        setSeries(heatmapSeries)
    }, [data_filter])


    const options: ApexOptions = {
        chart: {
            type: 'heatmap',
            toolbar: { show: true },
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 4,
                useFillColorAsStroke: true,
                colorScale: {
                    ranges: [
                        { from: 0, to: 2, name: 'Rendah', color: '#FF4560' },
                        { from: 2.1, to: 3.5, name: 'Sedang', color: '#FEB019' },
                        { from: 3.6, to: 5, name: 'Tinggi', color: '#00E396' },
                    ],
                },
            },
        },
        dataLabels: {
            enabled: true,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} / 5`,
            },
        },
        xaxis: {
            type: 'category',
            labels: {
                rotate: -45,
                style: {
                    fontSize: '12px',
                },
            },
        },
        legend: {
            position: 'bottom',
        },
    }

    return (
        <>
            <ScoreCard title='Kepuasan Karyawan per Posisi' type='chart' toggleZoom={toggleModal} toggleFilter={toggle}>
                <div className='bg-white mt-2 flex justify-center items-center'>
                    {isLoading ? (
                        <CircularProgress />
                    ) : data_filter && data_filter.length > 0 ? (
                        <div className='h-full w-full'>
                            <Chart options={options} series={series} type='heatmap' height={500} />
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
                        title='Kepuasan Karyawan per Posisi'
                        type='chart'
                        toggleZoom={toggleModal}
                        toggleFilter={toggle}
                    >
                        <div className='bg-white mt-5'>
                            <Chart options={options} series={series} type='heatmap' height={600} />
                        </div>
                    </ScoreCard>
                </ModalCustom>
            )}
        </>
    )
}

export default EmpSatisfactionPerPosition
