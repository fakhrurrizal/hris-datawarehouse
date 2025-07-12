import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    className?: string
    isSelected?: boolean
    onClick?: any
}

const CustomStyledTableRow = ({ children, className, isSelected, onClick }: Props) => {
    return (

        <tr
            className={`${isSelected ? 'bg-blue-100 border-gray-300' : 'hover:bg-gray-50 bg-white'
                }  border-b last-of-type:border-b-0  ${className}`}
            onClick={onClick}
        >
            {children}
        </tr>

    )
}

export default CustomStyledTableRow
