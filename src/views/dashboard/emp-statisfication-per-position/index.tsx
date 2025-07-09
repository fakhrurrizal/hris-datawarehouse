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

    const [series, setSeries] = useState([{ name: 'Satisfaction', data: [] as number[] }])
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        if (!data_filter || data_filter.length === 0) return

        const sorted = [...data_filter].sort((a: any, b: any) => b.total - a.total)

        const data = sorted.map((item: any) => parseFloat(item.total.toFixed(2)))
        const labels = sorted.map((item: any) => item.name)

        setSeries([{ name: 'Rata-rata Satisfaction', data }])
        setCategories(labels)
    }, [data_filter])

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: true },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '50%',
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val}`,
        },
        xaxis: {
            categories,
            title: {
                text: 'Rata-rata Satisfaction',
            },
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} / 5`,
            },
        },
        legend: {
            show: false,
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
                            <Chart options={options} series={series} type='bar' height={500} />
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
                            <Chart options={options} series={series} type='bar' height={600} />
                        </div>
                    </ScoreCard>
                </ModalCustom>
            )}
        </>
    )
}

export default EmpSatisfactionPerPosition
