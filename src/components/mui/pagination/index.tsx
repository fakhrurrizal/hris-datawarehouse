import React from 'react'
import { Pagination } from '@mui/material'

interface PaginationMuiProps {
    total: number
    page: number
    pageSize: number
    onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void
}

export const PaginationMui: React.FC<PaginationMuiProps> = ({ total, page, pageSize, onPageChange }) => {
    return (
        <>
            {total ? (
                <Pagination
                    count={Math.ceil(total / pageSize)}
                    page={page}
                    onChange={onPageChange}
                    shape='rounded'
                    color='primary'
                />
            ) : null}
        </>
    )
}

export const EntriesText: React.FC<{ currentPage: number; pageSize: number; totalEntries: number }> = ({
    currentPage,
    pageSize,
    totalEntries,
}) => {
    const startEntry = totalEntries ? (currentPage - 1) * pageSize + 1 : 0
    const endEntry = Math.min(currentPage * pageSize, totalEntries)

    return (
        <>
            {totalEntries ? (
                <p className='text-xs text-gray-600'>
                    Menampilkan {startEntry} sampai {endEntry} dari {totalEntries} data
                </p>
            ) : null}
        </>
    )
}
