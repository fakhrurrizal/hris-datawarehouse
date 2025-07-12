export interface PaginationArgs<T = any> {
    pageIndex?: number
    searchValue?: string
    pageSize?: number
    sort?: Order
    order?: keyof T
    status?: any
    startDate?: string
    endDate?: string
    department_id?: number
}

export type Order = 'desc' | 'asc'
