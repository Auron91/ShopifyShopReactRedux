
export const toggleView = (view) => {
    return { type: 'TOGGLE_VIEW', payload: view }
}

export const toggleSort = (sort) => {
    return { type: 'TOGGLE_SORT', payload: sort }
}

export const toggleMobileNav = () => {
    return { type: 'TOGGLE_MOBILE_NAV' }
}
export const handlePusher = () => {
    return { type: 'HANDLE_PUSHER' }
}