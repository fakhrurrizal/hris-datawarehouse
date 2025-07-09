'use client'

import { useAuth } from '@/services'
import { pathnames } from '@/utils'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter()
    const user = useAuth(state => state.value.user)

    useEffect(() => {
        if (!user) {
            router.push(pathnames.login)
        }
    }, [user, router])

    return <>{children}</>
}
