import shoes from '../../apis/shoes'

export const fetchProducts = () => async dispatch => {
    const response = await shoes.get('/shoes')

    dispatch({type: 'FETCH_PRODUCTS', payload: response.data})
}

export const fetchProduct = (id) => async dispatch => {
    const response = await shoes.get(`/shoes/${id}`)

    dispatch({type: 'FETCH_PRODUCT', payload: response.data})
}

export const toggleView = (view) => {
    return {type: 'TOGGLE_VIEW', payload: view}
}

export const toggleSort = (sort) => {
    return {type: 'TOGGLE_SORT', payload: sort}
}