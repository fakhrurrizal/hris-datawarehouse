import { AxiosError } from 'axios'
import { getApi } from '@/utils'
import { axiosInterceptor } from '@/config'
import { ResponseLogin } from './login.response'
import { LoginForm } from './login.schemas'
import { useMutation } from 'react-query'

const endpointLogin = getApi('login')

export const useLoginMutation = () =>
    useMutation<ResponseLogin, AxiosError<ResponseLogin>, LoginForm>({
        mutationFn: async data => {
            const res = await axiosInterceptor.post<ResponseLogin>(endpointLogin, data)

            return res.data
        },
        mutationKey: ['LOGIN'],
    })
