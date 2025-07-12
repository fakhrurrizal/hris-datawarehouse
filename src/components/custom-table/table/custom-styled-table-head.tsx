import { CSSProperties, ReactNode } from 'react'

interface Props {
    children: ReactNode
    className?: string
    width?: string
    style?: CSSProperties;
}

export const CustomStyledTableHead = ({ children, className, width, style }: Props) => {
    return (
        <>
            <th
                scope='row'
                className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-xs ${className}`}
                style={{ width: width || '',...style }}
            >
                {children}
            </th>
        </>
    )
}

export const CustomStyledTableData = ({ children, className, width, style }: Props) => {
    return (
        <>
            <th className={`px-6 py-4 text-xs font-medium ${className}`} style={{ width: width || '',...style }}>
                {children}
            </th>
        </>
    )
}
