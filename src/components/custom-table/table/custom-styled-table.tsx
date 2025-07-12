import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const CustomStyledTable = ({ children }: Props) => {
    return (
        <>
            <table className='w-full text-sm text-left rtl text-gray-500 rounded-md overflow-hidden min-w-[750px]'>
                {children}
            </table>
        </>
    )
}

export default CustomStyledTable
