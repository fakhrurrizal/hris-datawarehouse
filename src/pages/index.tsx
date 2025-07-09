// pages/index.tsx
import React from 'react'
import { NextPageWithLayout } from '@/utils'
import { getNavbarLayout } from '@/components'
import DashboardUserViewsPage from '@/views/dashboard'

const HomePage: NextPageWithLayout = () => {
    return (
        <>
            <DashboardUserViewsPage />
        </>
    )
}

export default HomePage
HomePage.getLayout = getNavbarLayout
