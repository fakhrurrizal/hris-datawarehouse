import IconifyIcon from '@/components/icon'
import { useAuth } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SalesOverviewViews from './sales-overview'
import FilterSales from './sales-overview/filter'
import { SalesFilterSchema, schemaForm } from './sales-overview/schema'
import TrendRecruitmenStatisticsChartViews from './sales-statistics'
import EmployeePerResourcePieChartViews from './top-selling-branch'

const DashboardUserViewsPage = () => {
    const [open, setOpen] = useState<boolean>(false)

    const toggle = () => setOpen(!open)

    const user = useAuth(state => state.value.user)

    const [startDate, setStartDate] = useState<string>('')

    const [endDate, setEndDate] = useState<string>('')

    const form = useForm<schemaForm>({
        defaultValues: {
            start_date: startDate,
            end_date: endDate,
            range: { label: '', value: '' },
        },
        resolver: zodResolver(SalesFilterSchema),
    })

    return (
        <>
            <main className='w-full overflow-hidden min-h-full bg-white drop-shadow-md rounded-lg pt-5 px-8 pb-10'>
                <section className='flex justify-between items-center'>
                    <h1 className='text-base font-semibold'>Hai {user?.fullname} Selamat datang!</h1>

                    <div className='flex gap-5'>
                        <div className='mt-[8px]'>
                            <span>
                                {startDate ? dayjs(startDate).format('DD MMMM YYYY') : ''} -{' '}
                                {endDate ? dayjs(endDate).format('DD MMMM YYYY') : ''}
                            </span>
                        </div>
                        <Button className='!p-1 !min-w-3' onClick={toggle}>
                            <IconifyIcon icon='ion:filter-outline' />
                        </Button>
                    </div>
                </section>

                <div className='border-b-[1px] mt-2 border-slate-300' />
                <section className='mt-5'>
                    <div className='grid grid-cols-12 xl:grid-cols-10 gap-5 items-stretch'>
                        <div className='col-span-12 '>
                            <SalesOverviewViews startDate={startDate} endDate={endDate} />
                        </div>
                        <div className='col-span-12 xl:col-span-6'>
                            <TrendRecruitmenStatisticsChartViews startDate={startDate} endDate={endDate} />
                        </div>
                        <div className='col-span-12 xl:col-span-6'>
                            <EmployeePerResourcePieChartViews startDate={startDate} endDate={endDate} />
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
                />
            )}
        </>
    )
}

export default DashboardUserViewsPage
