import { useAuth } from '@/services'
import { pathnames } from '@/utils'
import BusinessIcon from '@mui/icons-material/Business'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import { appBarHeight } from '..'

const UserMenu = dynamic(() => import('@/components/user-menu').then(mod => mod.UserMenu), { ssr: false })

interface NavbarProps extends PropsWithChildren<any> {
    drawerWidth?: number
}

const Navbar: React.FC<NavbarProps> = () => {
    const { push } = useRouter()

    const logout = useAuth(state => state.logout)

    const handleLogout = async () => {
        logout()
        push(pathnames.login)
    }


    return (
        <>
            <Box
                sx={({ palette }) => ({
                    backgroundColor: palette.background.default,
                })}
            >
                <AppBar
                    position='fixed'
                    sx={{
                        backgroundColor: theme => theme.palette.background.default,
                        backgroundImage: 'none',
                        boxShadow: 'none',
                        zIndex: theme => theme.zIndex.drawer + 1,
                        borderBottom: '1px solid',
                        borderColor: theme => theme.palette.divider,
                    }}
                    className='!shadow-sm'
                >
                    <Toolbar
                        sx={() => ({
                            minHeight: appBarHeight + 'px !important',
                            paddingX: { xs: 2, sm: 3 },
                        })}
                        className='flex justify-between items-center'
                    >
                        {/* Left side - Mobile menu button (visible on small screens) */}
                        <Box className='flex items-center'>

                        </Box>

                        {/* Center - Title */}
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 1.5,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <BusinessIcon
                                    sx={{
                                        color: 'primary.main',
                                        fontSize: { xs: '1.2rem', sm: '1.4rem' },
                                    }}
                                />
                                <Typography
                                    variant='h6'
                                    component='div'
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                                        color: 'text.primary',
                                        textAlign: 'center',
                                        letterSpacing: '0.3px',
                                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                                    }}
                                >
                                    HRIS Data Warehouse
                                </Typography>
                            </Box>
                        </Box>


                        <Box className='flex items-center justify-end'>
                            <div className='hidden sm:flex items-center h-full'>
                                <UserMenu handleLogout={handleLogout} />
                            </div>

                            <div className='sm:hidden flex items-center h-full'>
                                <UserMenu handleLogout={handleLogout} />
                            </div>
                        </Box>
                    </Toolbar>

                </AppBar>
            </Box>
        </>
    )
}

export default Navbar
