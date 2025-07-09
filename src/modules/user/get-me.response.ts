import { GlobalIDName } from '@/interfaces'

export interface ResponseGetMe {
    data: {
        id: number
        fullname: string
        email: string
        phone: string
        address: string
        village: string
        district: string
        city: string
        province: string
        country: string
        zip_code: string
        existing_package: GlobalIDName
        status: number
        role_id: number
        role: GlobalIDName
        company: GlobalIDName
        branch: {
            id: number
            name: string
            initial_balance: number
        }
        department: GlobalIDName
        plant: GlobalIDName
        application: GlobalIDName
        email_verified: boolean
        is_admin: boolean
        is_owner: boolean
        is_company_admin?: boolean
        is_expired: boolean
        setup_user_invite: boolean
        setup_sop: boolean
        setup_asset_allocation: boolean
        setup_initial_balance: boolean
        employee_id: string
        expiration: number
        is_affiliator?: boolean
        is_tutorial_finished?: boolean
    }

    message: string
    status: number
}
