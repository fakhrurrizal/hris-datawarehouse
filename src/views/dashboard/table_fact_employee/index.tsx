import HeaderSectionTableCustom from "@/components/custom-table/header"
import PaginationSectionTableCustom from "@/components/custom-table/pagination"
import CustomStyledTable from "@/components/custom-table/table/custom-styled-table"
import CustomStyledTableContainer from "@/components/custom-table/table/custom-styled-table-container"
import { CustomStyledTableData, CustomStyledTableHead } from "@/components/custom-table/table/custom-styled-table-head"
import CustomStyledTableRow from "@/components/custom-table/table/custom-styled-table-row"
import TableHeaderCustomTable from "@/components/custom-table/table/header"
import { useDashboardEmployee } from "@/utils/queries/use-report-dashboard"
import { SelectChangeEvent } from "@mui/material"
import dayjs from "dayjs"
import { Fragment, useCallback, useState } from "react"


const HeaderItems = [
    {
        label: 'Nama Karyawan',
        alignCenter: false,
    },
    {
        label: 'Posisi',
        alignCenter: false,
    },
    {
        label: 'Departemen',
        alignCenter: false,
    },
    {
        label: 'Jenis Kelamin',
        alignCenter: false,
    },
    {
        label: 'Tanggal Masuk',
        alignCenter: false,
    },
    {
        label: 'Keterangan Warga Negara',
        alignCenter: false,
    },
    {
        label: 'Kode Negara',
        alignCenter: true,
    },

]

interface Props {
    startDate: string
    endDate: string
    departmentId:number
}

const TableFactEmployment = ({ endDate, startDate, departmentId }: Props) => {

    const [pageSize, setPageSize] = useState<number>(10)

    const [page, setPage] = useState<number>(1)

    const { data: { data: data_filter = [], recordsFiltered = 0, recordsTotal = 0 } = { data: [] }, isLoading } = useDashboardEmployee({
        startDate: startDate,
        endDate: endDate,
        pageSize: pageSize,
        pageIndex: page,
        department_id: departmentId
    })

    const handlePageChange = (event: any, newPage: number) => {
        setPage(newPage)
    }

    const handleLimitChange = useCallback((e: SelectChangeEvent) => {
        setPageSize(parseInt(e.target.value, 10))
    }, [])

    return (
        <div className='custom__styled__container'>
            <HeaderSectionTableCustom title={'List Karyawan Aktif'} recordsTotal={recordsTotal} />

            <CustomStyledTableContainer isLoading={isLoading} recordsFiltered={recordsFiltered}>
                <CustomStyledTable>
                    <TableHeaderCustomTable data={HeaderItems} />

                    <tbody className='text-xs'>
                        {!isLoading &&
                            Array.isArray(data_filter) &&
                            data_filter?.map(item => {
                                return (
                                    <Fragment key={item?.id}>
                                        <CustomStyledTableRow>
                                            <CustomStyledTableHead>{item?.employee_name}</CustomStyledTableHead>
                                            <CustomStyledTableData>{item?.position}</CustomStyledTableData>

                                            <CustomStyledTableData>{item?.department}</CustomStyledTableData>
                                            <CustomStyledTableData>{item?.gender === 'F' ? "Perempuan" : "Laki-laki"}</CustomStyledTableData>
                                            <CustomStyledTableData>{dayjs(item?.date_of_hire).format('DD MMMM YYYY')}</CustomStyledTableData>
                                            <CustomStyledTableData>{item?.citizen_desc}</CustomStyledTableData>
                                            <CustomStyledTableData className="text-center">{item?.state}</CustomStyledTableData>


                                        </CustomStyledTableRow>
                                    </Fragment>
                                )
                            })}
                    </tbody>
                    {/* table body */}
                </CustomStyledTable>
            </CustomStyledTableContainer>
            {/* table section */}

            {/* Paginasi */}
            <PaginationSectionTableCustom
                page={page}
                pageSize={pageSize}
                recordsFiltered={recordsFiltered}
                handleLimitChange={handleLimitChange}
                handlePageChange={handlePageChange}
            />
            {/* Paginasi */}
        </div>
    )
}

export default TableFactEmployment