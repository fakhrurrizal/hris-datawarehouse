import { useEffect, RefObject } from 'react'
import { createPopper, Instance } from '@popperjs/core'

export const usePopper = (triggerRef: RefObject<HTMLElement>, menuRef: RefObject<HTMLElement>, isOpen: boolean) => {
    useEffect(() => {
        let popperInstance: Instance | null = null

        if (isOpen && triggerRef.current && menuRef.current) {
            popperInstance = createPopper(triggerRef.current, menuRef.current, {
                placement: 'bottom-end',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [1, 10],
                        },
                    },
                    {
                        name: 'preventOverflow',
                        options: {
                            boundary: 'viewport',
                        },
                    },
                ],
            })
        }

        return () => {
            popperInstance?.destroy()
        }
    }, [isOpen, triggerRef, menuRef])
}
