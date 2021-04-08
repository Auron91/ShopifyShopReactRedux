import { combineReducers } from 'redux';
import viewReducer from './viewReducer'
import shopReducer from './shopReducer';
import shopifyReducer from './shopifyReducer'

export default combineReducers({
    products: shopReducer,
    settings: viewReducer,
    shopifyState: shopifyReducer
})