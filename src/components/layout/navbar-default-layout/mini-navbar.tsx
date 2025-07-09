import Icon from '@/components/icon'
import { SzhsinMenu } from '@/components/szhsin'
import { NavbarItem } from '@/interfaces'
import {
    List,
    ListItem,
    ListItemButton,
    ListItemButtonProps,
    ListItemIcon,
    ListItemText,
    SxProps,
    Theme,
    Tooltip,
    Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { FunctionComponent, useRef, useState } from 'react'

interface GenerateListItemProps {
    items: NavbarItem[]
}

const listIconButtonStyle: SxProps<Theme> = ({ palette }) => ({
    paddingY: '4px',

    '& .MuiListItemIcon-root': {
        minWidth: '38px',
    },

    '&.Mui-selected': {
        '& .MuiListItemIcon-root': {
            color: palette.primary.main,
        },

        '& .MuiTypography-root': {
            color: palette.primary.main,
        },
    },
})

export const GenerateMiniListItem: FunctionComponent<GenerateListItemProps> = ({ items }) => {
    return (
        <List
            disablePadding
            component='div'
            sx={() => ({
                paddingTop: '4.75rem',
                transition: 'transform 0.3s ease-in-out',
                '&:enter': {
                    transform: 'translateX(-100%)',
                },
                '&:enter-active': {
                    transform: 'translateX(0)',
                },
            })}
        >
            {items?.map((item, index) => {
                return <NavbarButton {...item} key={index} />
            })}
        </List>
    )
}

const NavbarButton = ({ path, children = [], icon, name }: NavbarItem) => {
    const { push, path: currentPathname }: any = useRouter()

    const [open, setOpen] = useState<boolean>(false)

    const ref = useRef(null)

    const handleNavigate = () => push(path)

    const handleCloseMenu = () => setOpen(false)

    const onClick: ListItemButtonProps['onClick'] = () => {
        handleNavigate()
        handleCloseMenu()
    }

    const handleOpenMenu = () => setOpen(true)

    const isAlvailableChildren = children.length > 0

    const getIsSelected = (path: string) => currentPathname === path

    const someChildrenSelected = (children: NavbarItem[]) => children.some(data => data.path === currentPathname)

    return (
        <>
            <Tooltip
                placement='right'
                title={<Typography sx={{ color: 'white' }}>{name}</Typography>}
                enterNextDelay={500}
            >
                <ListItemButton
                    ref={ref}
                    sx={{ padding: '8px', textAlign: 'center', width: '2.5rem', height: '2.5rem', margin: 'auto' }}
                    onClick={isAlvailableChildren ? handleOpenMenu : onClick}
                    selected={getIsSelected(path) || someChildrenSelected(children || [])}
                >
                    <Icon fontSize='1.2rem' icon={icon} />
                </ListItemButton>
            </Tooltip>

            <SzhsinMenu
                transition
                direction='right'
                portal
                anchorRef={ref}
                offsetX={15}
                state={open ? 'open' : 'closed'}
                onClose={handleCloseMenu}
            >
                {children.map((item, index) => {
                    const { path, name, icon, children } = item
                    const handleNavigate = () => push(path)

                    const onClick: ListItemButtonProps['onClick'] = () => {
                        handleNavigate()
                        handleCloseMenu()
                    }

                    const listSubIconIconStyle: SxProps<Theme> = () => ({
                        opacity: 1,
                    })

                    return (
                        <ListItem component='div' disablePadding key={index}>
                            <Tooltip title={<Typography sx={{ color: 'white' }}>{name}</Typography>} placement='right'>
                                <ListItemButton
                                    sx={listIconButtonStyle}
                                    selected={getIsSelected(path) || someChildrenSelected(children || [])}
                                    onClick={onClick}
                                >
                                    <ListItemIcon sx={listSubIconIconStyle}>
                                        <Icon fontSize='1.2rem' icon={icon} />
                                    </ListItemIcon>

                                    <ListItemText
                                        primary={name}
                                        sx={listSubIconIconStyle}
                                        primaryTypographyProps={{ sx: { fontSize: 12.5 } }}
                                    />
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    )
                })}
            </SzhsinMenu>
        </>
    )
}
