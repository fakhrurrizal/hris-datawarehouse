'use client'

import { ModalCustom } from '@/components/custom-modal'
import { ScoreCard } from '@/components/dashboard/score-card'
import EmptyDataTableCustom from '@/components/table/empty-data'
import { useDashboardAverageSalaryPerDepartment } from '@/utils/queries/use-report-dashboard'
import { CircularProgress } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Lazy load ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })


interface Props {
    startDate: string
    endDate: string
}
const AverageSalaryPerDepartmentViews = ({ startDate, endDate }: Props) => {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const toggle = () => setOpen(!open)
    const toggleModal = () => setOpenModal(!openModal)

    const { data: data_filter, isLoading } = useDashboardAverageSalaryPerDepartment({
        start_date: startDate,
        end_date: endDate,
    })

    const [series, setSeries] = useState([{ name: 'Jumlah', data: [] as number[] }])
    const [categories, setCategories] = useState<string[]>([])
    useEffect(() => {
        if (!data_filter || data_filter.length === 0) return

        const sorted = [...data_filter].sort((a: any, b: any) => b.total - a.total)

        const data = sorted.map((item: any) => item.total)
        const labels = sorted.map((item: any) => item.name)

        setCategories(labels)
        setSeries([{ name: 'Rata-rata Gaji', data }])
    }, [data_filter])


    const options: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: true },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 9, 
                barHeight: '60%',
            },
        },
        colors: ['#2ECC71'],
        xaxis: {
            categories,
            title: {
                text: 'Gaji (USD)',
            },
            labels: {
                formatter: (val) => `$${val}`,
            },
        },
        tooltip: {
            y: {
                formatter: (val) => `$${val.toLocaleString()}`,
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: 'top',
        },
    }

    return (
        <>
            <ScoreCard title='Rata-rata Gaji per Departemen' type='chart' toggleZoom={toggleModal} toggleFilter={toggle}>
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
                        title='Rata-rata Gaji per Departemen'
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

export default AverageSalaryPerDepartmentViews
