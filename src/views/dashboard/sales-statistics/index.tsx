import { CircularProgress } from '@mui/material'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useDashboardLineChart } from '@/utils/queries/use-report-dashboard'
import { ApexOptions } from 'apexcharts'
import { formatToIDR } from '@/utils/helpers/format-number.helper'
import { ScoreCard } from '@/components/dashboard/score-card'
import EmptyDataTableCustom from '@/components/table/empty-data'
import { ModalCustom } from '@/components/custom-modal'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
    startDate: string
    endDate: string
}

interface DataItem {
    x: string
    y: number
}

const TrendRecruitmenStatisticsChartViews = ({ endDate, startDate }: Props) => {
    const [open, setOpen] = useState<boolean>(false)

    const [openModal, setOpenModal] = useState<boolean>(false)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const toggle = () => setOpen(!open)

    const toggleModal = () => setOpenModal(!openModal)

    const { data: data_filter, isLoading } = useDashboardLineChart({
        start_date: startDate,
        end_date: endDate,
    })

    const [series, setSeries] = useState<{ name: string; data: [number, number][] }[]>([])

    useEffect(() => {
        const dataChart = data_filter?.map((item: DataItem) => [new Date(item.x).getTime(), item.y])
        setSeries([
            {
                name: 'Tren Recruitment',
                data: dataChart,
            },
        ])
    }, [data_filter])

    const options: ApexOptions = {
        chart: {
            type: 'area',
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'dd MMM yy',
            },
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy',
            },
            y: {
                formatter: value => formatToIDR(value),
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
            },
        },
    }

    return (
        <>
            <ScoreCard title='Tren Recruitment' type='chart' toggleZoom={toggleModal} toggleFilter={toggle}>
                <div className='bg-white mt-2  flex justify-center items-center'>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {data_filter?.length > 0 ? (
                                <div className='h-full w-full'>
                                    <Chart options={options} series={series} type='area' />
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
                        title='Tren Recruitment'
                        type='chart'
                        toggleZoom={toggleModal}
                        toggleFilter={toggle}
                    >
                        <div className='bg-white mt-5'>
                            <Chart options={options} series={series} type='area' />
                        </div>
                    </ScoreCard>
                </ModalCustom>
            )}
        </>
    )
}

export default TrendRecruitmenStatisticsChartViews
