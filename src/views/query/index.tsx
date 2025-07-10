import { useAuth } from '@/services'


const QueryViewsPage = () => {

    const user = useAuth(state => state.value.user)

    return (
        <>
            <main className='w-full overflow-hidden min-h-full bg-white drop-shadow-md rounded-lg pt-5 px-8 pb-10'>
                <section className='flex justify-between items-center'>
                    <h1 className='text-base font-semibold'>Hai {user?.fullname} Selamat datang!</h1>

                    <div className='flex gap-5'>

                    </div>
                </section>

                <div className='border-b-[1px] mt-2 border-slate-300' />
                <section className="mt-5 grid grid-cols-12 gap-5">
                    {/* Total Karyawan Aktif */}
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Score Card Total Karyawan Aktif
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT COUNT(DISTINCT f.EmpID) AS total<br />
                                FROM fact_employment f<br />
                                JOIN dim_employee e USING(EmpID)<br />
                                JOIN dim_department d USING(DeptID)<br />
                                WHERE f.DateofTermination IS NULL
                            </div>
                        </div>
                    </div>

                    {/* Tingkat Turnover */}
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Score Card Tingkat Turnover
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap ">
                                WITH resigned AS (<br />
                                &nbsp;&nbsp;SELECT COUNT(*) AS total<br />
                                &nbsp;&nbsp;FROM fact_employment f<br />
                                &nbsp;&nbsp;JOIN dim_employee e USING(EmpID)<br />
                                &nbsp;&nbsp;JOIN dim_department d USING(DeptID)<br />
                                &nbsp;&nbsp;WHERE f.DateofTermination IS NOT NULL<br />
                                &nbsp;&nbsp;%s<br />
                                ),<br />
                                active AS (<br />
                                &nbsp;&nbsp;SELECT COUNT(*) AS total<br />
                                &nbsp;&nbsp;FROM fact_employment f<br />
                                &nbsp;&nbsp;JOIN dim_employee e USING(EmpID)<br />
                                &nbsp;&nbsp;JOIN dim_department d USING(DeptID)<br />
                                &nbsp;&nbsp;WHERE f.DateofTermination IS NULL<br />
                                &nbsp;&nbsp;%s<br />
                                )<br />
                                SELECT COALESCE(ROUND((CAST(resigned.total AS DECIMAL) / NULLIF(active.total, 0)) * 100, 2), 0.0) AS turnover_rate_percentage<br />
                                FROM resigned, active
                            </div>
                        </div>
                    </div>

                    {/* Rata-rata Skor Performance */}
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Rata-rata Skor Performance
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT COALESCE(ROUND(AVG(f.PerfScoreID), 2), 0.0) AS avg_score<br />
                                FROM fact_employment f<br />
                                JOIN dim_employee e USING(EmpID)<br />
                                JOIN dim_department d USING(DeptID)<br />
                                WHERE f.PerfScoreID IS NOT NULL<br />
                                AND f.DateofTermination IS NULL
                            </div>
                        </div>
                    </div>

                    {/* Rata-rata Absensi Terlambat */}
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Rata-rata Absensi Terlambat 30 Hari Terakhir
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT COALESCE(ROUND(AVG(f.DaysLateLast30), 2), 0.0) AS avg_days<br />
                                FROM fact_employment f<br />
                                JOIN dim_employee e USING(EmpID)<br />
                                JOIN dim_department d USING(DeptID)<br />
                                WHERE f.DaysLateLast30 IS NOT NULL<br />
                                AND f.DateofTermination IS NULL
                            </div>
                        </div>
                    </div>
                </section>


            </main>

        </>
    )
}

export default QueryViewsPage
