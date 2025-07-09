import { goBackAndRefresh } from '@/utils'
import Image from 'next/image'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    }

    public static getDerivedStateFromError(): State {
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className='flex items-center'>
                    <div className='container mx-auto py-10 flex items-center justify-center flex-col'>
                        <div className='mt-10'>
                            <Image width={500} height={400} alt='trouble' src='/assets/illustration/trouble.svg' />
                        </div>
                        <h1 className='text-primary font-bold text-center text-[calc(1.25rem+2.7vw)] xl:text-[42px] mb-3'>
                            Internal Server Error
                        </h1>
                        <p className='mb-6 text-lg'>Terjadi Kesalahan</p>

                        <div className='flex gap-3'>
                            <button
                                className='btn btn-outline hover:bg-transparent hover:text-primary hover:bg-blue-50 hover:border-primary border-primary btn-sm text-primary h-auto py-2 text-base'
                                onClick={() => location.reload()}
                            >
                                Refresh
                            </button>

                            <button
                                className='btn btn-primary bg-primary border-primary btn-sm text-white h-auto py-2 text-base'
                                onClick={() => goBackAndRefresh()}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export { ErrorBoundary }
