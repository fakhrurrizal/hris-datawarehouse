export interface PaginationArgs<T = any> {
    pageIndex?: number
    searchValue?: string
    pageSize?: number
    sort?: Order
    order?: keyof T
    status?: any
    startDate?: string
    endDate?: string
}

export type Order = 'desc' | 'asc'
