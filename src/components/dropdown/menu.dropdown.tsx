import { ReactNode, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DropdownMenuProps {
    trigger: ReactNode | ((isOpen: boolean) => ReactNode)
    children: ReactNode
    containerClassName?: string
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, children, containerClassName }) => {
    const [isOpen, setIsOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLDivElement>(null)

    const toggleMenu = () => {
        setIsOpen(prev => !prev)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const renderTrigger = () => {
        if (typeof trigger === 'function') {
            return trigger(isOpen)
        }

        return trigger
    }

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !triggerRef.current?.contains(event.target as Node)
            ) {
                handleClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <div className='relative inline-block'>
            <div ref={triggerRef} onClick={toggleMenu}>
                {renderTrigger()}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg z-[99] ${containerClassName}`}
                    >
                        <div className='py-1'>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
