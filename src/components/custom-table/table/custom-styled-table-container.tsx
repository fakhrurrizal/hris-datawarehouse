import { ReactNode } from 'react'
import EmptyDataTableCustom from './empty-data'
import IsLoadingCustomTable from './is-loading'

interface Props {
    children: ReactNode
    isLoading: boolean
    recordsFiltered: number
    className?: string
    px?: string
}

const CustomStyledTableContainer = ({ children, isLoading, recordsFiltered, className, px = '5' }: Props) => {
    return (
        <>
            <section className={`${className}`}>
                <div className={`relative overflow-x-auto px-${px} pb-2`}>
                    <div
                        className={`border-[1px] border-slate-300 rounded-md min-w-[fit-content] ${
                            recordsFiltered === 0 ? 'border-b-0' : ''
                        } `}
                    >
                        {children}
                    </div>

                    {isLoading && <IsLoadingCustomTable />}

                    {!isLoading && recordsFiltered === 0 && <EmptyDataTableCustom />}
                </div>
            </section>
        </>
    )
}

export default CustomStyledTableContainer
