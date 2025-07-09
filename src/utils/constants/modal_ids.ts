export const modalIds = {
    modal_add_product: 'modal-add-product',
}

export type modalIdsType = keyof typeof modalIds

export const getModalId: (key: modalIdsType) => string = key => {
    return modalIds[key]
}
