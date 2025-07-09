import { Avatar, Typography } from '@mui/material'

const UserDropdown = ({ fullname, email }: { fullname: string; email: string }) => {
    return (
        <>
            <Avatar sx={({ palette }) => ({ background: palette.primary.main })} className='!w-[40px] !h-[40px]'>
                <Typography sx={{ color: 'white' }}>{fullname.slice(0, 1).toUpperCase()}</Typography>
            </Avatar>
            <div className='flex flex-col cursor-default '>
                <p className='font-bold text-sm'>{fullname}</p>
                <p>{email}</p>
            </div>
        </>
    )
}

export default UserDropdown
