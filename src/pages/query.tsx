// pages/index.tsx
import React from 'react'
import { NextPageWithLayout } from '@/utils'
import { getNavbarLayout } from '@/components'
import QueryViewsPage from '@/views/query'

const QueryPage: NextPageWithLayout = () => {
    return (
        <>
            <QueryViewsPage />
        </>
    )
}

export default QueryPage
QueryPage.getLayout = getNavbarLayout
