import { ModalCustom } from '@/components/custom-modal'
import { ScoreCard } from '@/components/dashboard/score-card'
import EmptyDataTableCustom from '@/components/table/empty-data'
import { formatNumberWithSeparator } from '@/utils/helpers/format-number.helper'
import { useDashboardEmployeePerRecruitmenSource } from '@/utils/queries/use-report-dashboard'
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

interface PieDataItem {
    name: string
    total: number
    amount: number
    total_percentage: string
    amount_percentage: string
}

const EmployeePerResourcePieChartViews = ({ endDate, startDate, departmentId }: Props) => {
    const [open, setOpen] = useState<boolean>(false)

    const [openModal, setOpenModal] = useState<boolean>(false)

    const toggle = () => setOpen(!open)

    const toggleModal = () => setOpenModal(!openModal)

    const { data: dataPie, isLoading } = useDashboardEmployeePerRecruitmenSource({
        start_date: startDate,
        end_date: endDate,
        department_id: departmentId
    })

    const [series, setSeries] = useState<number[]>([])
    const [labels, setLabels] = useState<string[]>([])

    useEffect(() => {
        if (dataPie) {
            const newSeries = dataPie?.map((item: PieDataItem) => item.total)
            const newLabels = dataPie?.map((item: PieDataItem) => item.name)
            setSeries(newSeries)
            setLabels(newLabels)
        }
    }, [dataPie])

    const options: ApexOptions = {
        chart: {
            type: 'bar',
        },
        labels: labels,
        tooltip: {
            x: {
                format: 'dd MMM yyyy',
            },
            y: {
                formatter: value => `${formatNumberWithSeparator(value)} Orang`,
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
        legend: {
            position: 'bottom',
        },
    }

    return (
        <>
            <ScoreCard
                title='Karyawan per RecruitmentSource'
                type='chart'
                toggleZoom={toggleModal}
                toggleFilter={toggle}
            >
                <div className='bg-white mt-2  flex justify-center items-center'>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {dataPie?.length > 0 ? (
                                <div className='h-full w-full'>
                                    <Chart options={options} series={series} type='pie' />
                                </div>
                            ) : (
                                <EmptyDataTableCustom />
                            )}
                        </>
                    )}
                </div>
            </ScoreCard>
            {openModal && (
                <ModalCustom maxWidth='md' title='' toggle={toggleModal} hiddenClose open={openModal} hideButton>
                    <ScoreCard
                        zoom={openModal}
                        title='Karyawan per RecruitmentSource'
                        type='chart'
                        toggleZoom={toggleModal}
                        toggleFilter={toggle}
                    >
                        <div className='bg-white mt-5 grid items-center w-full h-full'>
                            <Chart options={options} series={series} type='pie' />
                        </div>
                    </ScoreCard>
                </ModalCustom>
            )}
        </>
    )
}

export default EmployeePerResourcePieChartViews
