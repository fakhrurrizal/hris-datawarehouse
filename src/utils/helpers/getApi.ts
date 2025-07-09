import { endpoints } from '@/utils'

export type ApiEndpoint = keyof typeof endpoints

export const getApi: (key: ApiEndpoint) => string = key => {
    const host = process.env.NEXT_PUBLIC_API
    const version = process.env.NEXT_PUBLIC_VERSION_API

    return `${host}/${version}/${endpoints[key]}`
}
