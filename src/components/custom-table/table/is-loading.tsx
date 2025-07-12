import { CircularProgress } from '@mui/material'

const IsLoadingCustomTable = () => {
    return (
        <>
            <div className='w-full h-[200px] flex flex-col gap-3 items-center justify-center'>
                <CircularProgress />
                <div>
                    <p>Loading...</p>
                </div>
            </div>
        </>
    )
}

export default IsLoadingCustomTable
