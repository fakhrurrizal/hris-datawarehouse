import { Checkbox } from '@mui/material'
import { Fragment } from 'react'

export type headerTypes = {
    label: string
    alignCenter?: boolean
    width?: string
    fontSize?: string
    hide?: boolean
    sortable?: boolean
    field?: string
}

interface Props {
    data: headerTypes[]
    py?: string
    onSort?: (field: string, direction: 'asc' | 'desc' | null) => void
    rowCount?: number
    numSelected?: number
    onSelectAllClick?: any
    containerClass?: string
}

const TableHeaderCustomTable = ({
    data,
    py,
    rowCount = 0,
    numSelected = 0,
    onSelectAllClick,
    containerClass,
}: Props) => {

    return (
        <thead
            className={`text-xs text-gray-700 capitalize bg-gray-100 border-b-[1px]  border-slate-300 ${containerClass}`}
        >
            <tr>
                {data?.map((item: headerTypes, index: number) => (
                    <Fragment key={item?.label}>
                        {item && item?.label !== 'checkbox' && !item.hide ? (
                            <th
                                className={`px-6 ${py !== undefined ? `py-[${py}]` : 'py-6'}`}
                                style={{
                                    textAlign: item?.alignCenter ? 'center' : 'left',
                                    fontSize: item.fontSize,
                                    width: item.width,
                                }}
                            >
                                <div
                                    className={`${item.sortable && 'cursor-pointer py-1 hover:px-2 hover:bg-slate-300 rounded-md'
                                        }`}
                                >
                                    {item?.label?.toUpperCase()}

                                </div>
                            </th>
                        ) : null}

                        {item?.label === 'checkbox' && (
                            <th key={index} className='text-center w-[10px]'>
                                <Checkbox
                                    onChange={onSelectAllClick}
                                    checked={rowCount > 0 && numSelected === rowCount}
                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                    disabled={rowCount === 0}
                                />
                            </th>
                        )}
                    </Fragment>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeaderCustomTable
