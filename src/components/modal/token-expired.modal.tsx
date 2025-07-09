import { useAlert } from '@/services/use-alert'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Image from 'next/image'
import { useAuth } from '@/services'
import { useRouter } from 'next/router'

const showAlert = useAlert.getState().setOpen

const TokenExpiredModal = () => {
    const logout = useAuth(state => state.logout)
    const closeAlert = useAlert(state => state.setForceClose)

    const route = useRouter()

    const returnURL: any = route.query.returnUrl

    const queryID: any = route.query.id

    return (
        <Grid container spacing={2} direction='column' sx={{ maxHeight: '450px' }}>
            <Grid item justifyContent='center' alignItems='center' display='flex'>
                <Image src='/assets/illustration/watch.svg' alt='watch' height={50} width={50} />
            </Grid>

            <Grid item justifyContent='center' alignItems='center' display='flex'>
                <Button
                    variant='contained'
                    sx={{ width: '8rem' }}
                    onClick={async () => {
                        await logout()

                        if (queryID) {
                            route.push(`/login?returnUrl=${returnURL}&id=${queryID}`)
                        } else {
                            route.push('/login')
                        }

                        closeAlert()

                        localStorage.clear()
                    }}
                >
                    Login
                </Button>
            </Grid>
        </Grid>
    )
}

export const setTokenExpiredModal = () => {
    showAlert({
        title: 'Sesi Telah Berakhir',
        content: <TokenExpiredModal />,
        buttonCancelProps: {},
        buttonOkProps: {},
        dialogProps: { maxWidth: 'xs' },
        canClose: false,
        dialogTitleProps: {
            textAlign: 'center',
        },
        dialogActionProps: { sx: { display: 'none' } },
    })
}
