import { ReactElement } from 'react'
import { PrivateRoute } from '../private-route'
import { DefaultLayout } from '../layout'

export const getNavbarLayout = (page: ReactElement) => {
    return (
        <PrivateRoute>
            <DefaultLayout>{page}</DefaultLayout>
        </PrivateRoute>
    )
}
