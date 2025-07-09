import Icon from '@/components/icon'
import { NavbarItem } from '@/interfaces'
import { useApplicationSettings } from '@/services'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Box, List, SxProps, Theme, Tooltip, Typography, useTheme } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'

interface Props {
    items: NavbarItem[]
    appBarHeight: number
    handleLogout: () => void
}

const ExpandedDrawer = (props: Props) => {
    const {
        items = [],
        appBarHeight = 65,
        handleLogout = () => {
            return
        },
    } = props

    const [dropdown, setDropdown] = useState<string | null>(null)

    const router = useRouter()

    const theme = useTheme()

    const pushRoute = (pathname: string) => void router.push(pathname)

    const isSelectedItem = (pathname: string) => {
        const currentPath = router.pathname

        return currentPath === pathname || currentPath.startsWith(`${pathname}/`)
    }

    const screenModeValue = useApplicationSettings(state => state.value.screenMode)

    return (
        <Fragment>
            <Box
                sx={({ breakpoints }) => ({
                    overflow: 'auto',
                    paddingX: 2,
                    maxHeight: '82%',
                    [breakpoints.up('md')]: {
                        marginTop: appBarHeight + 'px',
                        paddingX: 1,
                    },
                })}
            >
                <List component='div'>
                    {items?.map(({ icon, path, name, children = [], key }: any, index: number) => {
                        const isHaveChildren = children.length > 0

                        const childrenIsSelected = children.some(({ path }: any) => isSelectedItem(path))

                        const handleToggle = (name: string, isHaveChildren: boolean, path: string) => {
                            setDropdown(prev => (prev === name ? null : name))
                            if (!isHaveChildren) {
                                pushRoute(path)
                            }
                        }

                        const isOpenDropdown = dropdown === name

                        const listSubIconButtonStyle: SxProps<Theme> = () => ({
                            paddingLeft: 4,
                            '&.Mui-selected': {
                                backgroundColor: theme.palette.action.selected,
                            },
                        })

                        const listSubIconIconStyle: SxProps<Theme> = () => ({
                            minWidth: 0,
                            mr: 2,
                            justifyContent: 'center',
                        })

                        return (
                            <Box key={index} className={`${key}`}>
                                <Tooltip
                                    title={<Typography style={{ color: 'white' }}>{name}</Typography>}
                                    placement='right'
                                    enterNextDelay={500}
                                >
                                    <ListItemButton
                                        onClick={() => handleToggle(name, isHaveChildren, path)}
                                        selected={isSelectedItem(path) || childrenIsSelected}
                                        sx={{
                                            justifyContent: 'initial',
                                            width: 'inherit',
                                            height: 'inherit',
                                            mt: '3px',
                                        }}
                                        className='!px-3 !py-1 !flex !items-center'
                                    >
                                        <ListItemIcon sx={{ minWidth: 0, mr: 2, justifyContent: 'center' }}>
                                            <Icon
                                                fontSize='1.2rem'
                                                icon={icon}
                                                color={
                                                    isSelectedItem(path) || childrenIsSelected
                                                        ? theme.palette.primary.main
                                                        : screenModeValue === 'DARK'
                                                          ? 'white'
                                                          : ''
                                                }
                                            />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={name}
                                            sx={{ display: 'initial' }}
                                            primaryTypographyProps={{ sx: { fontSize: 14 } }}
                                        />

                                        {isHaveChildren && (isOpenDropdown ? <ExpandLess /> : <ExpandMore />)}
                                    </ListItemButton>
                                </Tooltip>

                                {isHaveChildren && (
                                    <Collapse in={isOpenDropdown} timeout='auto' unmountOnExit>
                                        <List component='div' disablePadding>
                                            {children.map(({ path, icon, name: childrenTitle }: any, index: number) => {
                                                return (
                                                    <Tooltip
                                                        title={
                                                            <Typography sx={{ color: 'white' }}>
                                                                {childrenTitle}
                                                            </Typography>
                                                        }
                                                        placement='right'
                                                        enterNextDelay={500}
                                                        key={index}
                                                    >
                                                        <ListItemButton
                                                            sx={listSubIconButtonStyle}
                                                            onClick={() => {
                                                                pushRoute(path)
                                                            }}
                                                            selected={isSelectedItem(path)}
                                                            className='!py-1 !flex !items-center'
                                                        >
                                                            <ListItemIcon sx={listSubIconIconStyle}>
                                                                <Icon
                                                                    fontSize='1.2rem'
                                                                    icon={icon}
                                                                    color={
                                                                        isSelectedItem(path)
                                                                            ? theme.palette.primary.main
                                                                            : screenModeValue === 'DARK'
                                                                              ? 'white'
                                                                              : theme.palette.text.secondary
                                                                    }
                                                                />
                                                            </ListItemIcon>

                                                            <ListItemText
                                                                primary={childrenTitle}
                                                                sx={{ display: 'initial' }}
                                                                primaryTypographyProps={{
                                                                    sx: {
                                                                        fontSize: 13.5,
                                                                        color: isSelectedItem(path)
                                                                            ? theme.palette.primary.main
                                                                            : screenModeValue === 'DARK'
                                                                              ? 'white'
                                                                              : theme.palette.text.primary,
                                                                    },
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    </Tooltip>
                                                )
                                            })}
                                        </List>
                                    </Collapse>
                                )}
                            </Box>
                        )
                    })}

                    <Divider
                        sx={({ breakpoints }) => ({
                            marginY: 1,
                            [breakpoints.up('md')]: {
                                display: 'none',
                            },
                        })}
                    />

                    <ListItem
                        disablePadding
                        sx={({ breakpoints }) => ({
                            [breakpoints.up('md')]: {
                                display: 'none',
                            },
                        })}
                    >
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutOutlinedIcon />
                            </ListItemIcon>

                            <ListItemText>Logout</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Fragment>
    )
}

export default ExpandedDrawer
