import { setTokenExpiredModal } from '@/components'
import getEncodedKey from '@/utils/helpers/getEncodedKey'
import axios from 'axios'
import { toast } from 'react-toastify'

export const axiosInterceptor = axios.create()

axiosInterceptor.interceptors.request.use(
    function (config) {
        const encodedKey = getEncodedKey()

        config.headers['X-API-KEY'] = encodedKey

        return config
    },

    function (error) {
        return Promise.reject(error)
    }
)

axiosInterceptor.interceptors.response.use(
    function (response) {
        // Only handle POST, PUT, DELETE methods
        if (
            response.config.method === 'post' ||
            response.config.method === 'put' ||
            response.config.method === 'delete'
        ) {
            const successPromise = Promise.resolve(response)

            toast.promise(successPromise, {
                pending: 'Processing...',
                success: {
                    render() {
                        const successMessage = response?.data?.message || 'Success!'

                        return successMessage
                    },
                },
                error: 'An error occurred!',
            })

            return successPromise
        }

        return response
    },
    function (error) {
        const errorPromise = Promise.reject(error)
        const statusCode = error?.response?.status

        // Only handle POST, PUT, DELETE methods
        if (error.config.method === 'post' || error.config.method === 'put' || error.config.method === 'delete') {
            toast.promise(errorPromise, {
                pending: 'Processing...',
                error: {
                    render() {
                        if (statusCode === 401) {
                            setTokenExpiredModal()

                            return 'Sesi telah berakhir'
                        }

                        const MessageError = error.response?.data.error
                        const firstMessageError: string = Array.isArray(error.response?.data?.details)
                            ? error.response?.data?.details?.[0]?.error
                            : ''

                        const secondMessageError: string = error.response?.data?.details
                        const thirdMessageError: string = error.response?.data?.message

                        if (MessageError === 'You have already signed in on another device.') {
                            return MessageError
                        } else if (firstMessageError) {
                            return firstMessageError
                        } else if (secondMessageError) {
                            return secondMessageError
                        } else if (thirdMessageError) {
                            return thirdMessageError
                        } else {
                            return MessageError || 'An error occurred'
                        }
                    },
                },
            })
        }

        return errorPromise
    }
)
