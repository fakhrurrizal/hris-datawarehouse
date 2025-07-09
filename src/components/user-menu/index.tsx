import { useAuth } from '@/services'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Badge, MenuItem, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import { MouseEvent, useState } from 'react'
import UserDropdown from './user-dropdown'

interface Props {
    handleLogout?: () => void
}

// const BadgeContentSpan = styled('span')(({ theme }) => ({
//     width: 8,
//     height: 8,
//     borderRadius: '50%',
//     backgroundColor: theme.palette.success.main,
//     boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
// }))

export const UserMenu = ({ handleLogout }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const user = useAuth(state => state.value.user)

    // const tokenWithoutBearer = tokenData?.split('Bearer ')[1]

    const open = Boolean(anchorEl)

    // const environment = process.env.NEXT_PUBLIC_API_ENVIRONMENT

    // const host = environment === 'development' ? process.env.NEXT_PUBLIC_APP_BO_DEV : process.env.NEXT_PUBLIC_APP_BO_PROD

    // const handleBackoffice = () => {
    //   window.open(`${host}/login-auth?token=${tokenWithoutBearer}`, '_blank')
    // }

    return (
        <>
            <Badge
                overlap='circular'
                onClick={handleClick}
                sx={{
                    ml: 2,
                    cursor: 'pointer',
                    background: 'none',
                    // marginTop: 1,
                }}
                // badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Avatar sx={({ palette }) => ({ background: palette.primary.main })}>
                    <Typography sx={{ color: 'white' }}>{user?.fullname?.slice(0, 1).toUpperCase()}</Typography>
                </Avatar>
            </Badge>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        paddingX: 1.5,
                        minWidth: '8rem',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 1px 5px rgba(0,0,0,0.25))',
                        mt: 2.2,

                        '& .MuiAvatar-root': {
                            width: 26,
                            height: 26,
                            ml: -0.5,
                            mr: 1,
                        },

                        borderRadius: '8px',
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <div className='!mt-[5px] !rounded-lg pb-[10px] flex items-center mx-[10px]'>
                    <UserDropdown
                        email={user?.email ? user?.email : ''}
                        fullname={user?.fullname ? user?.fullname : ''}
                    />
                </div>

                <Divider className='!mt-[5px]' />

                <MenuItem onClick={handleLogout} className='!mt-[5px] !rounded-lg !py-[10px]'>
                    <ListItemIcon>
                        <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}
