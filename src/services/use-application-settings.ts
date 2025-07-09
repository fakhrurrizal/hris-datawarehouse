import { localKey } from '@/utils'
import { create } from 'zustand'

export type ScreenMode = 'DARK' | 'LIGHT'

export type Language = 'id' | 'en-US'

export interface ApplicationSettings {
    screenMode: ScreenMode
    expandSidebar: boolean
    appLanguage: Language
}

export interface ApplicationSettingsState {
    value: ApplicationSettings

    changeScreenMode: (screenMode: ScreenMode) => void

    toggleExpandSidebar: () => void

    setExpandSidebar: (expandSidebar: boolean) => void

    changeLanguage: (lang: Language) => void
}

const defaultValue: ApplicationSettings = {
    screenMode: 'LIGHT',
    expandSidebar: true,
    appLanguage: 'en-US',
}

const getInitialState: () => ApplicationSettings = () => {
    let storedData

    try {
        storedData = localStorage.getItem(localKey.application_settings)
    } catch (error) {
        storedData = null
        console.log(error)
    }

    if (!storedData) {
        return defaultValue
    }

    if (!storedData) return defaultValue

    const parseStoredData: ApplicationSettings = JSON.parse(storedData)

    return parseStoredData
}

const initialState: ApplicationSettings = getInitialState()

export const useApplicationSettings = create<ApplicationSettingsState>()(set => ({
    value: initialState,

    changeScreenMode: screenMode =>
        set(state => {
            const nextState: ApplicationSettings = { ...state.value, screenMode }

            localStorage.setItem(localKey.application_settings, JSON.stringify(nextState))

            return { ...state, value: nextState }
        }),

    toggleExpandSidebar: () =>
        set(state => {
            const nextState: ApplicationSettings = {
                ...state.value,
                expandSidebar: !state.value.expandSidebar,
            }

            localStorage.setItem(localKey.application_settings, JSON.stringify(nextState))

            return { ...state, value: nextState }
        }),

    setExpandSidebar: expandSidebar =>
        set(state => {
            const nextState: ApplicationSettings = {
                ...state.value,
                expandSidebar,
            }

            localStorage.setItem(localKey.application_settings, JSON.stringify(nextState))

            return { ...state, value: nextState }
        }),

    changeLanguage: lang =>
        set(state => {
            const nextState: ApplicationSettings = {
                ...state.value,
                appLanguage: lang,
            }

            localStorage.setItem(localKey.application_settings, JSON.stringify(nextState))

            return { ...state, value: nextState }
        }),
}))
