const INITIAL_STATE = {
    view: 'grid layout',
    sort: 'New Arrivals',
    mobileNav: false
}

const viewReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_VIEW':
            return { ...state, view: action.payload }
        case 'TOGGLE_SORT':
            return { ...state, sort: action.payload }
        case 'TOGGLE_MOBILE_NAV':
            return {...state, mobileNav: !state.mobileNav}
        case 'HANDLE_PUSHER':
            return {...state, mobileNav: false}
        default:
            return state;
    }
}

export default viewReducer