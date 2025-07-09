import { DefaultLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import Link from 'next/link'
import { ReactElement } from 'react'

const ErrorPage: NextPageWithLayout = () => {
    return (
        <>
            <div className='py-24'>
                <div className='container mx-auto py-10 flex items-center justify-center flex-col'>
                    <i className='far fa-frown-open display-1 text-primary mb-4 text-[85px]'></i>
                    <h1 className='text-pr-3 font-bold text-center text-[calc(1.25rem+2.7vw)] xl:text-[42px] mb-3'>
                        Internal Server Error
                    </h1>
                    <p className='mb-6 text-lg'>Terjadi Kesalahan</p>
                    <Link href='/'>
                        <button className='btn btn-primary bg-primary border-primary btn-sm text-white h-auto py-2 text-base'>
                            Go Back To Home
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

ErrorPage.getLayout = function getLayout(page: ReactElement) {
    return <DefaultLayout>{page}</DefaultLayout>
}

export default ErrorPage
