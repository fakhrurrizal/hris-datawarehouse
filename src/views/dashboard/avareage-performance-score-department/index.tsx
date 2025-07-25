'use client'

import { ScoreCard } from '@/components/dashboard/score-card'
import { ModalCustom } from '@/components/custom-modal'
import EmptyDataTableCustom from '@/components/table/empty-data'
import { useDashboardAveragePerformanceScorePerDepartment } from '@/utils/queries/use-report-dashboard'
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

const AveragePerformanceScorePerDepartment = ({ startDate, endDate, departmentId }: Props) => {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const toggle = () => setOpen(!open)
    const toggleModal = () => setOpenModal(!openModal)

    const { data: data_filter, isLoading } = useDashboardAveragePerformanceScorePerDepartment({
        start_date: startDate,
        end_date: endDate,
        department_id: departmentId
    })

    const [series, setSeries] = useState([{ name: 'Jumlah', data: [] as number[] }])
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        if (!data_filter || data_filter.length === 0) return

        const sorted = [...data_filter].sort((a: any, b: any) => b.total - a.total)

        const data = sorted.map((item: any) => item.total)
        const labels = sorted.map((item: any) => item.name)

        setSeries([{ name: 'Jumlah Karyawan', data }])
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
                borderRadius: 15,
                borderRadiusApplication: 'end',
                barHeight: '60%',
            },
        },
        colors: ['#ffb119'],
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val}`,
        },
        xaxis: {
            categories,
            title: {
                text: 'Jumlah Karyawan',
            },
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} Karyawan`,
            },
        },
        legend: {
            show: false,
        },
    }

    return (
        <>
            <ScoreCard title='Top 10 Departemen dengan Jumlah Penghentian Tertinggi' type='chart' toggleZoom={toggleModal} toggleFilter={toggle}>
                <div className='bg-white mt-2 flex justify-center items-center'>
                    {isLoading ? (
                        <CircularProgress />
                    ) : data_filter && data_filter.length > 0 ? (
                        <div className='h-full w-full'>
                            <Chart options={options} series={series} type='bar' height={400} />
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
                        title=''
                        type='chart'
                        toggleZoom={toggleModal}
                        toggleFilter={toggle}
                    >
                        <div className='bg-white mt-5'>
                            <Chart options={options} series={series} type='bar' height={500} />
                        </div>
                    </ScoreCard>
                </ModalCustom>
            )}
        </>
    )
}

export default AveragePerformanceScorePerDepartment
