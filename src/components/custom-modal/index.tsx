import {
    Box,
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentProps,
    DialogProps,
    DialogTitle,
    Slide,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { PropsWithChildren, ReactNode, forwardRef } from 'react'
import { CustomCloseButton } from '../custom-close-button'
import Icon from '@/components/icon'
import { CircularProgress } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

interface ModalProps extends PropsWithChildren, Partial<DialogProps> {
    title: string
    buttonOkProps?: ButtonProps
    buttonCancelProps?: ButtonProps
    buttonDeleteProps?: ButtonProps
    dialogQuery?: string
    secondaryAction?: ReactNode
    dialogContentProps?: DialogContentProps
    open: boolean
    toggle: () => void
    hideButton?: boolean
    isLoading?: boolean
    handleDelete?: any
    hiddenClose?: boolean
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction='up' ref={ref} {...props} />
})

export const ModalCustom = (props: ModalProps) => {
    const {
        title,
        handleDelete,
        hideButton,
        isLoading = false,
        children,
        open,
        toggle,
        buttonDeleteProps,
        buttonOkProps,
        buttonCancelProps,
        secondaryAction = <div />,
        dialogContentProps = {},
        hiddenClose,
        ...dialogProps
    } = props

    const theme = useTheme()

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const onClose = () => {
        if (hiddenClose) {
            toggle()
        }
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth
            onClose={onClose}
            open={open}
            TransitionComponent={Transition}
            {...dialogProps}
            sx={{ maxHeight: '90rem', '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
            <DialogTitle fontWeight={600} fontSize={17} sx={{ position: 'relative', textTransform: 'capitalize' }}>
                {title}
            </DialogTitle>

            <DialogContent
                {...dialogContentProps}
                sx={{
                    paddingX: 3,
                    '&::-webkit-scrollbar': {
                        width: '3px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1',
                    },
                }}
            >
                {!hiddenClose && (
                    <CustomCloseButton onClick={toggle}>
                        <Icon icon='tabler:x' fontSize='1.25rem' />
                    </CustomCloseButton>
                )}
                <Box sx={{ marginTop: 1 }}>{children}</Box>
            </DialogContent>

            {!hideButton && (
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {secondaryAction}

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {handleDelete && (
                            <Button
                                autoFocus
                                color='error'
                                fullWidth
                                variant='outlined'
                                onClick={handleDelete}
                                {...buttonDeleteProps}
                            >
                                {buttonDeleteProps?.children || 'Hapus'}
                            </Button>
                        )}
                        <Button autoFocus fullWidth variant='outlined' onClick={toggle} {...buttonCancelProps}>
                            {buttonCancelProps?.children || 'Batal'}
                        </Button>
                        <Button onClick={toggle} autoFocus fullWidth variant='contained' {...buttonOkProps}>
                            {isLoading ? (
                                <CircularProgress size={24} sx={{ color: 'white' }} />
                            ) : (
                                buttonOkProps?.children || 'Kirim'
                            )}
                        </Button>
                    </Box>
                </DialogActions>
            )}
        </Dialog>
    )
}
