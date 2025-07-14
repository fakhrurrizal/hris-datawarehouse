import { ModalCustom } from '@/components/custom-modal'
import { ScoreCard } from '@/components/dashboard/score-card'
import EmptyDataTableCustom from '@/components/table/empty-data'
import { useDashboardEmployeeMaritalStatus } from '@/utils/queries/use-report-dashboard'
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

const EmployeeMaritalStatusViews = ({ endDate, startDate, departmentId }: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const toggle = () => setOpen(!open)
    const toggleModal = () => setOpenModal(!openModal)

    const { data: dataBar, isLoading } = useDashboardEmployeeMaritalStatus({
        start_date: startDate,
        end_date: endDate,
        department_id: departmentId
    })

    const [series, setSeries] = useState<any[]>([])
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        if (dataBar) {
            const newSeries = [{
                name: 'Jumlah Karyawan',
                data: dataBar.map((item: PieDataItem) => item.total)
            }]
            const newCategories = dataBar.map((item: PieDataItem) => item.name)

            setSeries(newSeries)
            setCategories(newCategories)
        }
    }, [dataBar])

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
                borderRadiusApplication: 'end',
            },
        },
        colors: ['#2ECC71'],
        xaxis: {
            categories,
            title: {
                text: 'Status Perkawinan',
            },
            labels: {
                formatter: (val) => `${val}`,
                rotate: -45,
            },
        },
        yaxis: {
            title: {
                text: 'Jumlah',
            },
            labels: {
                formatter: (val) => `${val.toLocaleString()} `,
            },
        },
        tooltip: {
            y: {
                formatter: (val) => `${val.toLocaleString()} Orang`,
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
            <ScoreCard
                title='Komposisi Karyawan Menurut Status Perkawinan'
                type='chart'
                toggleZoom={toggleModal}
                toggleFilter={toggle}
            >
                <div className='bg-white mt-2 flex justify-center items-center'>
                    {isLoading ? (
                        <CircularProgress />
                    ) : series.length > 0 && series[0].data.length > 0 ? (
                        <div className='h-full w-full'>
                            <Chart options={options} series={series} type='bar' height={400} />
                        </div>
                    ) : (
                        <EmptyDataTableCustom />
                    )}

                </div>
            </ScoreCard>

            {openModal && (
                <ModalCustom maxWidth='md' title='' toggle={toggleModal} hiddenClose open={openModal} hideButton>
                    <ScoreCard
                        zoom={openModal}
                        title='Komposisi Karyawan Menurut Status Perkawinan'
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

export default EmployeeMaritalStatusViews
