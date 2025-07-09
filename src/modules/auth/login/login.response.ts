import { ResponseGetMe } from '@/modules/user'

export interface ResponseLogin {
    data?: {
        access_token: string
        expiration: string
        user: ResponseGetMe['data']
    }
}
