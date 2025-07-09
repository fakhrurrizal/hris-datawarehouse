export const goBackAndRefresh = async (): Promise<void> => {
    await new Promise<void>(resolve => {
        const onPopState = () => {
            resolve()
            window.removeEventListener('popstate', onPopState)
        }

        window.addEventListener('popstate', onPopState)
        window.history.back()
    })

    location.reload()
}
