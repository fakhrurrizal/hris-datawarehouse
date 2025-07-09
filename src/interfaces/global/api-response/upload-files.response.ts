export interface ResponseUploadFile {
    data: {
        id: string
        created_at: string
        updated_at: string
        token: string
        user_id: number
        filename: string
        full_url: string
    }
    message: string
    status: number
}
