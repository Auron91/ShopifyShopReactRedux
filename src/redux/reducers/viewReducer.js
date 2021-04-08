const INITIAL_STATE = {
    view: 'grid layout',
    sort: 'New Arrivals'
}

const viewReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_VIEW':
            return { ...state, view: action.payload }
        case 'TOGGLE_SORT':
            return { ...state, sort: action.payload }
        default:
            return state;
    }
}

export default viewReducer