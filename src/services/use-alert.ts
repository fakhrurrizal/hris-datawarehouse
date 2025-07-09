import { ReactNode } from 'react'
import { create } from 'zustand'
import { DialogProps, DialogTitleProps, DialogActionsProps } from '@mui/material'
import { ButtonProps as MuiButtonProps } from '@mui/material/Button'
import { CircularProgressProps } from '@mui/material/CircularProgress'

interface ButtonProps extends Partial<MuiButtonProps> {
    isLoading?: boolean
    loadingProps?: CircularProgressProps
}

interface AlertDialogState {
    title?: string
    content: ReactNode
    buttonOkProps: ButtonProps
    buttonCancelProps: ButtonProps
    open: boolean
    dialogProps?: Omit<DialogProps, 'open'>
    dialogTitleProps?: DialogTitleProps
    canClose?: boolean
    dialogActionProps?: DialogActionsProps
}

const initialState: AlertDialogState = {
    title: '',
    buttonOkProps: {},
    content: null,
    open: false,
    dialogProps: {},
    buttonCancelProps: {},
    dialogTitleProps: {},
    dialogActionProps: {},
    canClose: true,
}

interface AlertState {
    value: AlertDialogState
    setOpen: (data: Omit<AlertDialogState, 'open'>) => void
    setClose: () => void
    setForceClose: () => void
}

export const useAlert = create<AlertState>()(set => ({
    value: initialState,

    setOpen: data => {
        return set(() => {
            return { value: { ...data, open: true } }
        })
    },

    setClose: () => {
        return set(state => {
            const open = state.value.canClose ? false : true

            return { value: { ...state.value, open } }
        })
    },

    setForceClose: () => {
        return set(state => {
            return { value: { ...state.value, open: false } }
        })
    },
}))
