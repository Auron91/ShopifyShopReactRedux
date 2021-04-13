import { combineReducers } from 'redux';
import viewReducer from './viewReducer'
import shopifyReducer from './shopifyReducer'

export default combineReducers({
    settings: viewReducer,
    shopifyState: shopifyReducer
})