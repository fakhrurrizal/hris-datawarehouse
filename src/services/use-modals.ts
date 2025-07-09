import { FieldValues, Path, useWatch } from 'react-hook-form'
import { create } from 'zustand'

interface ModalState<Form extends FieldValues> {
    modals: { [key: string]: boolean }
    lastClosedModal: {
        modal_id: string
        formMode: 'add' | 'edit'
        selectedId: number | undefined
        formValues?: ReturnType<typeof useWatch<Form>>
    }[]
    openModal: (modalId: string) => void
    closeModal: (modalId: string) => void
    closeExclusiveModal: (modalId: string, isLookup?: boolean) => void
    toggleModal: (modalId: string) => void
    openExclusiveModal: (modalId: string) => void
    formMode: 'add' | 'edit'
    setFormMode: (value: 'add' | 'edit') => void
    selectedID: number | undefined
    setSelectedID: (value: number | undefined) => void
    formValues?: ReturnType<typeof useWatch<Form>>
    setFormValues: (value: any) => void
    requestedFieldFormName: Path<Form>
    setRequestedFieldFormName: (value: Path<Form>) => void
    selectedRowLookup: any
    setSelectedRowLookup: (value: any) => void
    totalRecords: number
    setTotalRecords: (value: number) => void
}

export const useModalStore = create<ModalState<FieldValues>>(set => ({
    modals: {}, // Stores the state of each modal by ID
    lastClosedModal: [],

    formMode: 'add',
    setFormMode: value =>
        set(() => ({
            formMode: value,
        })),

    selectedID: undefined,
    setSelectedID: value =>
        set(() => ({
            selectedID: value,
        })),

    formValues: undefined,
    setFormValues: value => {
        set(() => ({
            formValues: value,
        }))
    },

    requestedFieldFormName: '',
    setRequestedFieldFormName: value => {
        set(() => ({
            requestedFieldFormName: value,
        }))
    },

    selectedRowLookup: undefined,
    setSelectedRowLookup: value => {
        set(() => ({
            selectedRowLookup: value,
        }))
    },

    // Open a modal by its ID
    openModal: (modalId: string) =>
        set(state => {
            return {
                modals: { ...state.modals, [modalId]: true },
                lastClosedModal: [
                    {
                        formMode: state.formMode,
                        modal_id: modalId,
                        selectedId: state.selectedID,
                        formValues: state.formValues,
                    },
                ],
            }
        }),

    // Close a modal by its ID
    closeModal: (modalId: string) =>
        set(state => ({
            modals: { ...state.modals, [modalId]: false },
        })),

    // Toggle a modal's visibility by its ID
    toggleModal: (modalId: string) =>
        set(state => ({
            modals: { ...state.modals, [modalId]: !state.modals[modalId] },
        })),

    // Open an exclusive modal and pass formValues if provided
    openExclusiveModal: (modalId: string) =>
        set(state => {
            const lastClosedModal = state.lastClosedModal

            lastClosedModal[lastClosedModal.length - 1].formValues = state.formValues

            return {
                modals: { [modalId]: true },
                lastClosedModal: [
                    ...lastClosedModal,
                    {
                        formMode: state.formMode,
                        modal_id: modalId,
                        selectedId: state.selectedID,
                        requestedFieldFormName: state.requestedFieldFormName,
                    },
                ],
                formValues: undefined,
            }
        }),

    // Close an exclusive modal by ID and restore the last closed modal
    closeExclusiveModal: (modalId: string, isLookup?: boolean) =>
        set(state => {
            const lastClosedModal = [...state.lastClosedModal] // Copy the lastClosedModal array
            const idModalIndex = lastClosedModal.findIndex(data => data.modal_id === modalId)

            if (idModalIndex !== -1) {
                lastClosedModal.splice(idModalIndex, 1)
            }

            const targetLastClosedModal = lastClosedModal[idModalIndex - 1]

            if (targetLastClosedModal?.formValues && isLookup) {
                targetLastClosedModal.formValues[state.requestedFieldFormName] = {
                    ...state.selectedRowLookup.original,
                    label: state.selectedRowLookup.original.name,
                }
            }

            state.setSelectedRowLookup(undefined)

            if (!targetLastClosedModal?.modal_id) {
                return {
                    modals: { ...state.modals, [modalId]: false },
                    formValues: undefined,
                    formMode: 'add',
                    selectedID: undefined,
                    lastClosedModal: [],
                }
            } else if (targetLastClosedModal.modal_id !== modalId) {
                return {
                    modals: {
                        ...state.modals,
                        [modalId]: false,
                        [targetLastClosedModal.modal_id]: true,
                    },
                    formMode: targetLastClosedModal.formMode,
                    selectedID: targetLastClosedModal.selectedId,
                    formValues: targetLastClosedModal.formValues,
                    lastClosedModal: lastClosedModal,
                }
            } else {
                return {
                    modals: { ...state.modals, [modalId]: false },
                    formValues: undefined,
                    formMode: 'add',
                    selectedID: undefined,
                    lastClosedModal: [],
                }
            }
        }),

    totalRecords: 0,
    setTotalRecords: (value: number) =>
        set(() => ({
            totalRecords: value,
        })),
}))
