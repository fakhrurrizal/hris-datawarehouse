import { axiosInterceptor } from '@/config'
import queryString from 'query-string'
import { useQuery } from 'react-query'
import { getApi } from '../helpers'
import { ResponseScoreCardDashboard } from '../types/api-response'
import { PaginationArgs } from '@/interfaces'

export const useDashboardScoreCard = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }
    if (department_id) {
        query['department_id'] = department_id
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
    })
}

export const useDashboardLineChart = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }
    if (department_id) {
        query['department_id'] = department_id
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

export const useDashboardEmployeePerRecruitmenSource = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }
    if (department_id) {
        query['department_id'] = department_id
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

export const useDashboardLineTrendAveragePerformance = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }
    if (department_id) {
        query['department_id'] = department_id
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/linechart-performance-trend',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_LINE_CHART_performance_score', query, args],
    })
}

export const useDashboardAveragePerformanceScorePerDepartment = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }
    if (department_id) {
        query['department_id'] = department_id
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/top-10-termination-departments',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_AVERAGE_PERFORMANCE_SCORE_PER_DEPARTMENT', query, args],
    })
}

export const useDashboardEmpSatisfactionPerPosition = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }
    if (department_id) {
        query['department_id'] = department_id
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/heatmap-average-emp-satisfaction-per-position',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_EMP_SATISFACTION_PER_POSITION', query, args],
    })
}

export const useDashboardPieChartEmployeeTerminationRatio = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }
    if (department_id) {
        query['department_id'] = department_id
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/piechart-employee-termination-ratio',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_PIE_CHART_EMPLOYEE_TERMINATION_RATIO', query, args],
    })
}

export const useDashboardAverageSalaryPerPosition = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }
    if (department_id) {
        query['department_id'] = department_id
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/barchart-average-salary-per-position',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_AVERAGE_SALARY_PER_POSITION', query, args],
    })
}

export const useDashboardAverageSalaryPerDepartment = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }
    if (department_id) {
        query['department_id'] = department_id
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/barchart-average-salary-per-department',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_AVERAGE_SALARY_PER_DEPARTMENT', query, args],
    })
}

export const useDashboarEmployeePerDepartment = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }
    if (department_id) {
        query['department_id'] = department_id
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/barchart-employee-per-department',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_EMPLOYEE_PER_DEPARTMENT', query, args],
    })
}

export const useDashboarEmployeePerPosition = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }
    if (department_id) {
        query['department_id'] = department_id
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/barchart-employee-per-position',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_EMPLOYEE_PER_POSITION', query, args],
    })
}

export const useSalaryComparison = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }
    if (department_id) {
        query['department_id'] = department_id
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/highest-lowest-salary',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_SALARY_COMPARISON', query, args],
    })
}

export const useDashboardEmployeePerGender = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }

    if (department_id) {
        query['department_id'] = department_id
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/barchart-employee-per-gender',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_EMPLOYEE_PER_GENDER', query, args],
    })
}

export const useDashboardEmployee = (args: PaginationArgs<any>) => {
    const { pageSize, pageIndex, searchValue, status, sort, department_id } = args

    const query: Record<string, string | number> = {
        limit: Number(pageSize),
        page: Number(pageIndex),
    }

    if (department_id) {
        query['department_id'] = department_id
    }

    if (searchValue) {
        query['search'] = searchValue
    }

    if (status) {
        query['status'] = status
    }

    if (sort) {
        query['sort'] = sort
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dim') + '/fact-employment',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get<any>(endpoint)

            return res.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_EMPLOYEE', query, args],
    })
}

export const useDashboardEmployeeMaritalStatus = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }

    if (department_id) {
        query['department_id'] = department_id
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/piechart-employee-marital-ratio',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_EMPLOYEE_MARITAL_STATUS', query, args],
    })
}

export const useDashboardEmployeeAge = (args: any, department_id?: number) => {
    const query: Record<string, string | number> = {
        ...args,
    }

    if (department_id) {
        query['department_id'] = department_id
    }

    const endpoint = queryString.stringifyUrl({
        url: getApi('dashboard') + '/piechart-employee-age-ratio',
        query,
    })

    return useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get(endpoint)

            return res?.data
        },
        refetchOnWindowFocus: false,
        queryKey: ['LIST_DASHBOARD_EMPLOYEE_AGE', query, args],
    })
}
