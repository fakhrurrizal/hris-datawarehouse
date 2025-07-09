export interface GeneralOptionsResponse {
    draw: number
    recordsTotal: number
    recordsFiltered: number
    error: string
    status: number
    message: string
    data: GeneralOption[]
    search: string
    next: boolean
    back: boolean
    limit: number
    offset: number
    total_page: number
    current_page: number
    sort: string
    order: string
    last_updated: string
}

export interface GeneralOption {
    label: string
    id: string | number
}

export type NavbarItem = {
    path: any
    name: string
    icon: string
    children?: NavbarItem[]
}
