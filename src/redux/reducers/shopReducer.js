import _ from 'lodash';

const sortProducts = (data, sortDirection) => {
    var result = []

    if (sortDirection === 'Most Popular') {
      result = data.sort(( a, b ) => {
        return b.sold - a.sold
      })
    } else if (sortDirection === 'New Arrivals') {
      result = data.sort(( a, b) => {
        return b.isNew - a.isNew
      })
    } else if (sortDirection === 'Price (Low-High)') {
      result = data.sort(( a, b) => {
        return a.price - b.price
      })
    } else if (sortDirection === 'Price (High-Low)') {
      result = data.sort(( a, b) => {
        return b.price - a.price
      })
    } else return data;
    return result;
  }

const shopReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS':
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case 'FETCH_PRODUCT':
            return { ...state, [action.payload.id]: action.payload };
        case 'TOGGLE_SORT':
            console.log(Object.values(state))
            let sorted = sortProducts(Object.values(state), action.payload)
            return { ...sorted }
        default:
            return state;
    }
}

export default shopReducer;
