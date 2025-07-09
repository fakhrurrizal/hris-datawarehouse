import { axiosInterceptor } from '@/config'
import { AxiosError, AxiosResponse } from 'axios'
import { getApi } from '../helpers'
import { RegisterPayload, UserProfileResponse } from '../types/api-response'
import { useMutation } from 'react-query'

export const useUserProfile = () =>
    useMutation<AxiosResponse<UserProfileResponse>, AxiosError<UserProfileResponse>, RegisterPayload>({
        mutationFn: async data => {
            const res = await axiosInterceptor.post(getApi('register'), data)

            return res.data
        },

        mutationKey: ['REGISTER'],
    })
