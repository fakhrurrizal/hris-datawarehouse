import IconifyIcon from '@/components/icon'
import { useAuth } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import dayjs from 'dayjs'
import { useState, useMemo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { SalesFilterSchema, schemaForm } from './score-card/schema'
import dynamic from 'next/dynamic'

const SalesOverviewViews = dynamic(() => import('./score-card'), { ssr: false })
const FilterSales = dynamic(() => import('./score-card/filter'), { ssr: false })
const TrendRecruitmenStatisticsChartViews = dynamic(() => import('./tren-recruitment'), { ssr: false })
const EmployeePerResourcePieChartViews = dynamic(() => import('./employee-per-resource'), { ssr: false })
const TrendAveragePerformanceViews = dynamic(() => import('./tren-average-performance'), { ssr: false })
const AveragePerformanceScorePerDepartment = dynamic(() => import('./avareage-performance-score-department'), { ssr: false })
const PieChartTerminationRatioView = dynamic(() => import('./pie-chart-termination-ratio-view'), { ssr: false })
const AverageSalaryPerDepartmentViews = dynamic(() => import('./average-salary-per-department'), { ssr: false })
const AverageSalaryPerPositionViews = dynamic(() => import('./average-salary-per-position'), { ssr: false })
const EmployeePerDepartmentViews = dynamic(() => import('./barchart-employee-per-department'), { ssr: false })
const EmployeePerGenderPieChartViews = dynamic(() => import('./pie-chart-employee-per-gender'), { ssr: false })
const TableFactEmployment = dynamic(() => import('./table_fact_employee'), { ssr: false })
const EmployeeMaritalStatusViews = dynamic(() => import('./pie-chart-employee-marital-status'), { ssr: false })
const EmployeePerAgePieChartViews = dynamic(() => import('./pie-chart-employee-age'), { ssr: false })

const DashboardUserViewsPage = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [department, setDepartment] = useState<string>('')

    const user = useAuth(state => state.value.user)

    const toggle = useCallback(() => setOpen(!open), [open])

    const form = useForm<schemaForm>({
        defaultValues: {
            start_date: startDate,
            end_date: endDate,
            range: { label: '', value: '' },
        },
        resolver: zodResolver(SalesFilterSchema),
    })

    const departmentId = useMemo(() => Number(department), [department])

    const formattedDateRange = useMemo(() => {
        const start = startDate ? dayjs(startDate).format('DD MMMM YYYY') : ''
        const end = endDate ? dayjs(endDate).format('DD MMMM YYYY') : ''

        return `${start} - ${end}`
    }, [startDate, endDate])

    const chartProps = useMemo(() => ({
        startDate,
        endDate,
        departmentId
    }), [startDate, endDate, departmentId])

    const memoizedCharts = useMemo(() => ({
        salesOverview: (
            <SalesOverviewViews {...chartProps} />
        ),
        employeePerDepartment: (
            <EmployeePerDepartmentViews {...chartProps} />
        ),
        employeePerGender: (
            <EmployeePerGenderPieChartViews {...chartProps} />
        ),
        trendRecruitment: (
            <TrendRecruitmenStatisticsChartViews {...chartProps} />
        ),
        employeePerResource: (
            <EmployeePerResourcePieChartViews {...chartProps} />
        ),
        trendAveragePerformance: (
            <TrendAveragePerformanceViews {...chartProps} />
        ),
        averageSalaryPerDepartment: (
            <AverageSalaryPerDepartmentViews {...chartProps} />
        ),
        averageSalaryPerPosition: (
            <AverageSalaryPerPositionViews {...chartProps} />
        ),
        averagePerformanceScore: (
            <AveragePerformanceScorePerDepartment {...chartProps} />
        ),
        terminationRatio: (
            <PieChartTerminationRatioView {...chartProps} />
        ),
        tableFactEmployment: (
            <TableFactEmployment {...chartProps} />
        ),
        employeeMaritalStatus: (
            <EmployeeMaritalStatusViews {...chartProps} />
        ),
        employeeAge: (
            <EmployeePerAgePieChartViews {...chartProps} />
        ),
    }), [chartProps])

    return (
        <>
            <main className='w-full overflow-hidden min-h-full bg-white drop-shadow-md rounded-lg pt-5 px-8 pb-10'>
                <section className='flex justify-between items-center'>
                    <h1 className='text-base font-semibold'>Hai {user?.fullname} Selamat datang!</h1>

                    <div className='flex gap-5'>
                        <div className='mt-[8px]'>
                            <span>{formattedDateRange}</span>
                        </div>
                        <Button className='!p-1 !min-w-3' onClick={toggle}>
                            <IconifyIcon icon='ion:filter-outline' />
                        </Button>
                    </div>
                </section>

                <div className='border-b-[1px] mt-2 border-slate-300' />
                <section className='mt-5'>
                    <div className='grid grid-cols-12 xl:grid-cols-10 gap-5 items-stretch'>
                        <div className='col-span-12'>
                            {memoizedCharts.salesOverview}
                        </div>

                        <div className='col-span-12 xl:col-span-6'>
                            {memoizedCharts.employeePerDepartment}
                        </div>
                        <div className='col-span-12 xl:col-span-6'>
                            {memoizedCharts.employeePerGender}
                        </div>

                        <div className='col-span-12 xl:col-span-6'>
                            {memoizedCharts.trendRecruitment}
                        </div>
                        <div className='col-span-12 xl:col-span-6'>
                            {memoizedCharts.employeePerResource}
                        </div>
                        <div className='col-span-12 xl:col-span-6'>
                            {memoizedCharts.employeeMaritalStatus}
                        </div>
                        <div className='col-span-12 xl:col-span-6'>
                            {memoizedCharts.employeeAge}
                        </div>


                        <div className='col-span-12'>
                            {memoizedCharts.trendAveragePerformance}
                        </div>

                        <div className='col-span-12 xl:col-span-6'>
                            {memoizedCharts.averageSalaryPerDepartment}
                        </div>
                        <div className='col-span-12 xl:col-span-6'>
                            {memoizedCharts.averageSalaryPerPosition}
                        </div>

                        <div className='col-span-12 xl:col-span-6'>
                            {memoizedCharts.averagePerformanceScore}
                        </div>

                        <div className='col-span-12 xl:col-span-6'>
                            {memoizedCharts.terminationRatio}
                        </div>

                        <div className='col-span-12'>
                            {memoizedCharts.tableFactEmployment}
                        </div>
                    </div>
                </section>
            </main>

            {open && (
                <FilterSales
                    open={open}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    form={form}
                    toggle={toggle}
                    setDepartment={setDepartment}
                />
            )}
        </>
    )
}

export default DashboardUserViewsPage