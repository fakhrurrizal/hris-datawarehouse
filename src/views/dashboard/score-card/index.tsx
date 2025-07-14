import { ScoreCardItem } from '@/components/dashboard/score-card'
import { formatNumberWithSeparator } from '@/utils/helpers/format-number.helper'
import { useDashboardScoreCard } from '@/utils/queries/use-report-dashboard'

interface Props {
    startDate: string
    endDate: string
    departmentId: number

}
const SalesOverviewViews = ({ startDate, endDate, departmentId }: Props) => {
    const { data: data_filter, isLoading } = useDashboardScoreCard({
        start_date: startDate,
        end_date: endDate,
        department_id: departmentId
    })

    const classNameCard = 'col-span-1'
    const classNameDiv = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 items-stretch'

    return (
        <>
            <div className={classNameDiv}>
                <div className={classNameCard}>
                    <ScoreCardItem
                        title='Total Karyawan Aktif'
                        value={formatNumberWithSeparator(data_filter?.total_employee)}
                        icon='mdi:account-group'
                        iconColor='#38bdf8'
                        bgColor='#e0f2fe'
                        isLoading={isLoading}
                    />
                </div>
                <div className={classNameCard}>
                    <ScoreCardItem
                        title='Tingkat Turnover (%)'
                        value={`${data_filter?.turnover_percentage}%`}
                        icon='tabler:repeat-off'
                        iconColor='#facc15'
                        bgColor='#fef9c3'
                        isLoading={isLoading}
                    />
                </div>
                <div className={classNameCard}>
                    <ScoreCardItem
                        title='Rata-rata Skor Performance'
                        value={`${data_filter?.average_performance}%`}
                        icon='mdi:chart-line'
                        iconColor='#22c55e'
                        bgColor='#dcfce7'
                        isLoading={isLoading}
                    />
                </div>
                <div className={classNameCard}>
                    <ScoreCardItem
                        title='Rata-rata Absensi Terlambat 30 Hari Terakhir'
                        value={`${data_filter?.average_days_late_last30}%`}
                        icon='mdi:clock-alert-outline'
                        iconColor='#ef4444'
                        bgColor='#fee2e2'
                        isLoading={isLoading}
                    />
                </div>
                <div className={classNameCard}>
                    <ScoreCardItem
                        title='Biaya Total Pengeluaran Gaji'
                        value={`$ ${formatNumberWithSeparator(data_filter?.total_salary_expenditure || 0)}`}
                        icon='mdi:cash-multiple'
                        iconColor='#10b981'
                        bgColor='#d1fae5'
                        isLoading={isLoading}
                    />
                </div>

            </div>
        </>
    )
}

export default SalesOverviewViews
