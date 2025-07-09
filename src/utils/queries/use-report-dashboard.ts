import { axiosInterceptor } from '@/config'
import queryString from 'query-string'
import { useQuery } from 'react-query'
import { getApi } from '../helpers'
import { ResponseScoreCardDashboard } from '../types/api-response'

export const useDashboardScoreCard = (args: any, enabled = true) => {
    const query: Record<string, string | number> = {
        ...args,
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/score-card',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get<ResponseScoreCardDashboard>(endpoint)

            return res.data
        },
        queryKey: ['LIST_DASHBOARD_SCORECARD', query],
        refetchOnWindowFocus: false,
        enabled,
    })
}

export const useDashboardLineChart = (args: any) => {
    const query: Record<string, string | number> = {
        ...args,
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/linechart-recruitment-trend',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_LINE_CHART', query, args],
    })
}

export const useDashboardEmployeePerRecruitmenSource = (args: any) => {
    const query: Record<string, string | number> = {
        ...args,
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/barchart-employee-per-recruitment-source',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_EMPLOYEE_PER_RECRUITMENT_SOURCE', query, args],
    })
}
