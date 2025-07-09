import { useAlert } from '@/services/use-alert'
import { Button, IconButton } from '@mui/material'
import { Slide, DialogTitle, DialogContent, DialogActions, Dialog } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef } from 'react'
import { colors } from '@/utils'
import { Icon } from '@iconify/react'

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction='up' ref={ref} {...props} />
})

export function AlertDialog() {
    const alertState = useAlert(state => state.value)

    const handleClose = useAlert(state => state.setClose)

    const {
        dialogTitleProps = {},
        title = '',
        buttonCancelProps = {},
        buttonOkProps = {},
        content = null,
        canClose = true,
        open,
        dialogActionProps = {},
    } = alertState

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            onClose={handleClose}
            {...alertState.dialogProps}
            sx={{ zIndex: 9999999 }}
        >
            <DialogTitle sx={{ position: 'relative' }} {...dialogTitleProps}>
                {title}
                {canClose && (
                    <IconButton
                        sx={() => ({
                            position: 'absolute',
                            right: '4px',
                            top: '4px',
                            color: colors.gray[600],
                        })}
                        color='inherit'
                        onClick={handleClose}
                    >
                        <Icon icon='material-symbols:cancel' />
                    </IconButton>
                )}
            </DialogTitle>

            <DialogContent>{content}</DialogContent>

            <DialogActions {...dialogActionProps}>
                <Button onClick={handleClose} {...buttonCancelProps} />

                <Button {...buttonOkProps} />
            </DialogActions>
        </Dialog>
    )
}
