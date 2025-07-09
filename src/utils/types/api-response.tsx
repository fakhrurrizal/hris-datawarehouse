export interface UserProfileResponse {
    app_id: number
    message: string
    status: number
    user_id: number
}

export interface RegisterPayload {
    email: string
    fullname: string
    phone: string
    confirm_password: string
    password: string
    role_id: number
}

export interface ResponseScoreCardDashboard {
    total_employee: number
    turnover_percentage: number
    average_performance: number
    average_days_late_last30: number
}
