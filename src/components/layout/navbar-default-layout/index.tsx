import { useAuth } from '@/services'
import { pathnames } from '@/utils'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { PropsWithChildren, useState } from 'react'
import { appBarHeight } from '..'

const UserMenu = dynamic(() => import('@/components/user-menu').then(mod => mod.UserMenu), { ssr: false })

interface NavbarProps extends PropsWithChildren<any> {
    drawerWidth?: number
}

const Navbar: React.FC<NavbarProps> = () => {
    const { push } = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const logout = useAuth(state => state.logout)

    const handleLogout = async () => {
        logout()
        push(pathnames.login)
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
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
                            <IconButton
                                edge='start'
                                color='inherit'
                                aria-label='menu'
                                onClick={toggleMobileMenu}
                                className='sm:hidden'
                                sx={{ mr: 1 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        {/* Center - Title */}
                        <Box className='flex-1 flex justify-center items-center'>
                            <Typography
                                variant='h6'
                                component='div'
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                                    color: theme => theme.palette.text.primary,
                                    textAlign: 'center',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                HRIS DataWarehouse
                            </Typography>
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

                    {mobileMenuOpen && (
                        <Box
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                backgroundColor: theme => theme.palette.background.paper,
                                borderTop: '1px solid',
                                borderColor: theme => theme.palette.divider,
                                py: 1,
                            }}
                        >
                            {/* Add mobile navigation items here if needed */}
                            <Box sx={{ px: 2, py: 1 }}>
                                <Typography variant='body2' color='text.secondary'>
                                    Navigation items can be added here
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </AppBar>
            </Box>
        </>
    )
}

export default Navbar
