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
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Jumlah Karyawan per Departemen
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT d.Department AS name, COUNT(DISTINCT f.EmpID) AS total<br />
                                FROM fact_employment f<br />
                                JOIN dim_employee e USING(EmpID)<br />
                                JOIN dim_department d USING(DeptID)<br />
                                WHERE f.DateofTermination IS NULL<br />
                                AND f.DateofHire BETWEEN &#123;startDate&#125; AND &#123;endDate&#125;<br />
                                AND (filter lainnya sesuai inputan)<br />
                                GROUP BY f.DeptID, d.Department<br />
                                ORDER BY total DESC
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Jumlah Karyawan Berdasarkan Gender
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT e.Gender AS name, COUNT(DISTINCT f.EmpID) AS total<br />
                                FROM fact_employment f<br />
                                JOIN dim_employee e USING(EmpID)<br />
                                JOIN dim_department d USING(DeptID)<br />
                                WHERE f.DateofTermination IS NULL<br />
                                AND f.DateofHire BETWEEN &#123;startDate&#125; AND &#123;endDate&#125;<br />
                                AND (filter empStatusID, managerID, positionID, deptID, state)<br />
                                GROUP BY e.Gender<br />
                                ORDER BY total DESC
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Jumlah Rekrutmen Berdasarkan Periode
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT
                                {' '}<span className="text-yellow-300">DATE_FORMAT(f.DateofHire, '%Y-%m')</span> AS x,<br />
                                &nbsp;&nbsp;COUNT(DISTINCT f.EmpID) AS y,<br />
                                &nbsp;&nbsp;'Recruitment' AS label<br />
                                FROM fact_employment f<br />
                                JOIN dim_employee e USING(EmpID)<br />
                                JOIN dim_department d USING(DeptID)<br />
                                WHERE f.DateofHire IS NOT NULL<br />
                                &nbsp;&nbsp;AND f.Is_Terminated = 'No'<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.DeptID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.EmpStatusID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.ManagerID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.PositionID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = '' OR e.State = ? )<br />
                                GROUP BY DATE_FORMAT(f.DateofHire, '%Y-%m')<br />
                                ORDER BY x
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Jumlah Karyawan Berdasarkan Sumber Rekrutmen
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT f.RecruitmentSource AS name,<br />
                                &nbsp;&nbsp;COUNT(DISTINCT f.EmpID) AS total<br />
                                FROM fact_employment f<br />
                                JOIN dim_employee e USING(EmpID)<br />
                                JOIN dim_department d USING(DeptID)<br />
                                WHERE f.Is_Terminated = 0<br />
                                &nbsp;&nbsp;AND ( ? = '' OR f.DateofHire BETWEEN ? AND ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.EmpStatusID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.ManagerID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.PositionID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.DeptID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = '' OR e.State = ? )<br />
                                &nbsp;&nbsp;AND ( ? = '' OR e.Gender = ? )<br />
                                GROUP BY f.RecruitmentSource<br />
                                ORDER BY total DESC
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Tren Kinerja Karyawan per Waktu
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT YEAR(f.DateofHire) AS x, COUNT(*) AS y, p.PerformanceScore AS label<br />
                                FROM fact_employment f<br />
                                JOIN dim_employee e USING(EmpID)<br />
                                JOIN dim_department d USING(DeptID)<br />
                                JOIN dim_performance p ON f.PerfScoreID = p.PerfScoreID<br />
                                WHERE f.PerfScoreID IS NOT NULL AND f.Is_Terminated = 0<br />
                                &nbsp;&nbsp;AND ( ? = '' OR f.DateofHire BETWEEN ? AND ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.DeptID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.EmpStatusID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.ManagerID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.PositionID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = '' OR e.State = ? )<br />
                                GROUP BY YEAR(f.DateofHire), p.PerformanceScore<br />
                                ORDER BY x
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Rata-rata Gaji per Departemen
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT d.Department AS name, AVG(f.Salary) AS total<br />
                                FROM fact_employment f<br />
                                INNER JOIN dim_employee e ON f.EmpID = e.EmpID<br />
                                INNER JOIN dim_department d ON f.DeptID = d.DeptID<br />
                                WHERE f.Is_Terminated = 0<br />
                                AND f.Salary &gt; 0<br />
                                &nbsp;&nbsp;AND ( ? = '' OR f.DateofHire BETWEEN ? AND ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.DeptID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.EmpStatusID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.ManagerID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.PositionID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = '' OR e.State = ? )<br />
                                &nbsp;&nbsp;AND ( ? = '' OR e.Gender = ? )<br />
                                GROUP BY d.Department, f.DeptID<br />
                                ORDER BY total DESC
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Rata-rata Gaji dan Jumlah Karyawan per Posisi
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT<br />
                                &nbsp;&nbsp;p.Position AS name,<br />
                                &nbsp;&nbsp;ROUND(AVG(f.Salary), 2) AS total,<br />
                                &nbsp;&nbsp;COUNT(f.EmpID) AS count<br />
                                FROM fact_employment f<br />
                                INNER JOIN dim_employee e ON f.EmpID = e.EmpID<br />
                                INNER JOIN dim_position p ON f.PositionID = p.PositionID<br />
                                INNER JOIN dim_department d ON f.DeptID = d.DeptID<br />
                                WHERE f.Is_Terminated = 0<br />
                                AND f.Salary &gt; 0<br />
                                &nbsp;&nbsp;AND ( ? = '' OR f.DateofHire BETWEEN ? AND ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.DeptID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.EmpStatusID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.ManagerID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = 0 OR f.PositionID = ? )<br />
                                &nbsp;&nbsp;AND ( ? = '' OR e.State = ? )<br />
                                &nbsp;&nbsp;AND ( ? = '' OR e.Gender = ? )<br />
                                GROUP BY p.Position, f.PositionID<br />
                                ORDER BY total DESC
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query 10 Departemen dengan Jumlah Penghentian Tertinggi
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT <br />
                                &nbsp;&nbsp;d.Department AS name,<br />
                                &nbsp;&nbsp;COUNT(*) AS total<br />
                                FROM fact_employment f<br />
                                JOIN dim_department d ON f.DeptID = d.DeptID<br />
                                JOIN dim_employee e ON f.EmpID = e.EmpID<br />
                                WHERE f.Is_Terminated = "Yes"<br />
                                &nbsp;&nbsp;AND (? = '' OR f.DateofTermination BETWEEN ? AND ?)<br />
                                &nbsp;&nbsp;AND (? = 0 OR f.EmpStatusID = ?)<br />
                                &nbsp;&nbsp;AND (? = 0 OR f.ManagerID = ?)<br />
                                &nbsp;&nbsp;AND (? = 0 OR f.PositionID = ?)<br />
                                &nbsp;&nbsp;AND (? = '' OR e.State = ?)<br />
                                GROUP BY d.Department<br />
                                ORDER BY total DESC<br />
                                LIMIT 10
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Rasio Pemutusan Hubungan Kerja Berdasarkan Alasan
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT <br />
                                &nbsp;&nbsp;termination_label AS name,<br />
                                &nbsp;&nbsp;COUNT(*) AS total<br />
                                FROM (<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;SELECT<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CASE <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHEN LOWER(f.TermReason) LIKE '%career change%' OR<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOWER(f.TermReason) LIKE '%relocation%' OR<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOWER(f.TermReason) LIKE '%return to school%' OR<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOWER(f.TermReason) LIKE '%more money%' OR<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOWER(f.TermReason) LIKE '%unhappy%' OR<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOWER(f.TermReason) LIKE '%maternity%' OR<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOWER(f.TermReason) LIKE '%retiring%'<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;THEN 'Dihentikan Secara Sukarela'<br />
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHEN LOWER(f.TermReason) LIKE '%gross misconduct%' OR<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOWER(f.TermReason) LIKE '%no-call%' OR<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOWER(f.TermReason) LIKE '%performance%' OR<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOWER(f.TermReason) LIKE '%attendance%'<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;THEN 'Dihentikan karena suatu alasan'<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ELSE NULL<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;END AS termination_label<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;FROM fact_employment f<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;JOIN dim_employee e ON f.EmpID = e.EmpID<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;WHERE f.Is_Terminated = 'Yes'<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AND f.TermReason IS NOT NULL<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AND TRIM(f.TermReason) != ''<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AND f.DateofTermination BETWEEN ? AND ?<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AND (? = 0 OR f.DeptID = ?)<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AND (? = 0 OR f.EmpStatusID = ?)<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AND (? = 0 OR f.ManagerID = ?)<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AND (? = 0 OR f.PositionID = ?)<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AND (? = '' OR e.State = ?)<br />
                                ) sub<br />
                                WHERE termination_label IS NOT NULL<br />
                                GROUP BY termination_label<br />
                                ORDER BY total DESC
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 h-full">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Query Jumlah Karyawan
                            </h2>
                            <div className="bg-gray-900 text-green-200 text-sm font-mono rounded-lg p-4 overflow-auto whitespace-pre-wrap">
                                SELECT <br />
                                &nbsp;&nbsp;f.EmpID,<br />
                                &nbsp;&nbsp;e.Employee_Name AS employee_name,<br />
                                &nbsp;&nbsp;p.Position,<br />
                                &nbsp;&nbsp;d.Department,<br />
                                &nbsp;&nbsp;COALESCE(m.ManagerName, '-') AS ManagerName,<br />
                                &nbsp;&nbsp;DATE_FORMAT(f.DateofHire, '%Y-%m-%d') AS DateOfHire,<br />
                                &nbsp;&nbsp;DATE_FORMAT(f.DateofTermination, '%Y-%m-%d') AS DateOfTermination,<br />
                                &nbsp;&nbsp;f.TermReason,<br />
                                &nbsp;&nbsp;f.Salary,<br />
                                &nbsp;&nbsp;e.Gender,<br />
                                &nbsp;&nbsp;e.State,<br />
                                &nbsp;&nbsp;e.Zip,<br />
                                &nbsp;&nbsp;e.CitizenDesc,<br />
                                &nbsp;&nbsp;e.HispanicLatino,<br />
                                &nbsp;&nbsp;e.RaceDesc,<br />
                                &nbsp;&nbsp;f.Tenure_Days,<br />
                                &nbsp;&nbsp;f.DaysLateLast30,<br />
                                &nbsp;&nbsp;f.Absences,<br />
                                &nbsp;&nbsp;f.RecruitmentSource<br />
                                FROM fact_employment f<br />
                                JOIN dim_employee e ON f.EmpID = e.EmpID<br />
                                JOIN dim_department d ON f.DeptID = d.DeptID<br />
                                JOIN dim_position p ON f.PositionID = p.PositionID<br />
                                LEFT JOIN dim_manager m ON f.ManagerID = m.ManagerID<br />
                                WHERE f.Is_Terminated = 'No'<br />
                                &nbsp;&nbsp;AND e.Employee_Name ILIKE '%[search]%'<br />
                                &nbsp;&nbsp;AND f.DeptID = [departmentID]<br />
                                &nbsp;&nbsp;AND e.Gender = '[gender]'<br />
                                &nbsp;&nbsp;AND e.State = '[state]'<br />
                                &nbsp;&nbsp;AND f.DateofHire &gt;= '[start_date]'<br />
                                &nbsp;&nbsp;AND f.DateofHire &lt;= '[end_date]'<br />
                                &nbsp;&nbsp;AND f.PositionID = [position_id]<br />
                                &nbsp;&nbsp;AND f.EmpStatusID = [emp_status_id]<br />
                                &nbsp;&nbsp;AND f.ManagerID = [manager_id]<br />
                                ORDER BY [param.Sort] [param.Order]<br />
                                LIMIT [param.Limit] OFFSET [param.Offset]
                            </div>
                        </div>
                    </div>
                </section>


            </main>

        </>
    )
}

export default QueryViewsPage
