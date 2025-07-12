'use client'

import { ModalCustom } from '@/components/custom-modal'
import { ScoreCard } from '@/components/dashboard/score-card'
import EmptyDataTableCustom from '@/components/table/empty-data'
import { useDashboardAverageSalaryPerPosition } from '@/utils/queries/use-report-dashboard'
import { CircularProgress } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
    startDate: string
    endDate: string
    departmentId: number
}



const AverageSalaryPerPositionViews = ({ startDate, endDate, departmentId }: Props) => {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const toggle = () => setOpen(!open)
    const toggleModal = () => setOpenModal(!openModal)

    const { data: data_filter, isLoading } = useDashboardAverageSalaryPerPosition({
        start_date: startDate,
        end_date: endDate,
        department_id: departmentId
    })

    const [series, setSeries] = useState([{ name: 'Gaji Rata-rata', data: [] as number[] }])
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        if (!data_filter || data_filter.length === 0) return

        const sorted = [...data_filter].sort((a: any, b: any) => b.total - a.total).slice(0, 10)

        const data = sorted.map((item: any) => item.total)
        const labels = sorted.map((item: any) => item.name)

        setSeries([{ name: 'Gaji Rata-rata', data }])
        setCategories(labels)
    }, [data_filter])

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: true },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '60%',
                borderRadius: 9,
            },
        },
        colors: ['#FCAE32'],

        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories,
            title: {
                text: 'Posisi',
            },
        },
        yaxis: {
            title: {
                text: 'Gaji (USD)',
            },
            labels: {
                formatter: (val) => `$${val.toLocaleString()}`,
            },
        },
        tooltip: {
            y: {
                formatter: (val) => `$${val.toLocaleString()}`,
            },
        },
        legend: {
            show: false,
        },
    }

    return (
        <>
            <ScoreCard title='Rata-rata Gaji per Posisi' type='chart' toggleZoom={toggleModal} toggleFilter={toggle}>
                <div className='bg-white mt-2 flex justify-center items-center'>
                    {isLoading ? (
                        <CircularProgress />
                    ) : series.length > 0 && series[0].data.length > 0 ? (
                        <div className='h-full w-full'>
                            <Chart options={options} series={series} type='bar' height={600} />
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
                        title='Rata-rata Gaji per Posisi'
                        type='chart'
                        toggleZoom={toggleModal}
                        toggleFilter={toggle}
                    >
                        <div className='bg-white mt-5'>
                            <Chart options={options} series={series} type='bar' height={700} />
                        </div>
                    </ScoreCard>
                </ModalCustom>
            )}
        </>
    )
}

export default AverageSalaryPerPositionViews
